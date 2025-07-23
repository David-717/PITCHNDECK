import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "phone",
      "investmentAmount",
      "investmentType",
      "riskTolerance",
      "investmentGoals",
      "timeHorizon",
    ]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    const db = await getDatabase()
    const users = db.collection("users")

    // Check if user already exists
    const existingUser = await users.findOne({ email: body.email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create user document
    const userData = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending_review",
      portfolioValue: 0,
      totalReturns: 0,
    }

    const result = await users.insertOne(userData)

    return NextResponse.json({
      success: true,
      userId: result.insertedId,
      message: "User registration successful",
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    const db = await getDatabase()
    const users = db.collection("users")

    if (email) {
      const user = await users.findOne({ email })
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      return NextResponse.json({ user })
    }

    // Return all users (admin only - add authentication in production)
    const allUsers = await users.find({}).toArray()
    return NextResponse.json({ users: allUsers })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
