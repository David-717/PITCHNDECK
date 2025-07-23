import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { getUserFromRequest } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const users = db.collection("users")

    // Get user details from database
    const userData = await users.findOne(
      { _id: new ObjectId(user.userId) },
      { projection: { password: 0 } }, // Exclude password
    )

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userData._id.toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        company: userData.company,
        phone: userData.phone,
        portfolioValue: userData.portfolioValue,
        totalReturns: userData.totalReturns,
        createdAt: userData.createdAt,
        lastLogin: userData.lastLogin,
      },
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
