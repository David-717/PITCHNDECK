import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { hashPassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, company } = await request.json()

    console.log("Signup attempt:", { name, email, phone, company })

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Test database connection
    const db = await getDatabase()
    console.log("Database connected successfully")

    const users = db.collection("users")

    // Check if user already exists
    const existingUser = await users.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Determine role - first user becomes admin
    const userCount = await users.countDocuments()
    const role = userCount === 0 ? "admin" : "client"

    // Create user document
    const userData = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || "",
      company: company || "",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      lastLogin: null,
      portfolioValue: 0,
      totalReturns: 0,
      signupIP: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    const result = await users.insertOne(userData)
    console.log("User created successfully:", result.insertedId)

    // Generate JWT token
    const user = {
      id: result.insertedId.toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role as "client" | "admin",
      createdAt: userData.createdAt,
    }

    const token = generateToken(user)

    // Create response with token in cookie
    const response = NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Signup error:", error)
  const errorMessage = error instanceof Error ? error.message : "Unknown error"

return NextResponse.json(
  {
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
  },
  { status: 500 },
)
  }

}
