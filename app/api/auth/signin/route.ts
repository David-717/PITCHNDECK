import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { comparePassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log("Signin attempt:", { email })

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Connect to DB
    const db = await getDatabase()
    const users = db.collection("users")

    // Find user
    const user = await users.findOne({ email: email.toLowerCase() })
    if (!user) {
      console.log("User not found:", email)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Account is deactivated. Please contact support." }, { status: 403 })
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Update user last login
    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          lastLogin: new Date(),
          updatedAt: new Date(),
          lastLoginIP: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
        },
      }
    )

    // Prepare JWT payload
    const userForToken = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role as "admin" | "client",
      createdAt: user.createdAt,
    }

    const token = generateToken(userForToken)

    // Response
    const response = NextResponse.json({
      success: true,
      message: "Signed in successfully",
      user: {
        id: userForToken.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        phone: user.phone,
        portfolioValue: user.portfolioValue,
        totalReturns: user.totalReturns,
        lastLogin: user.lastLogin,
      },
    })

    // Set secure HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Signin error:", error)

    // Fix: Only access `.message` if it's an Error instance
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    return NextResponse.json(
      {
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    )
  }
}
