import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const users = db.collection("users")

    // Verify user is admin
    const adminUser = await users.findOne({ email: user.email, role: "admin" })
    if (!adminUser) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Get all users with pagination
    const page = Number.parseInt(request.nextUrl.searchParams.get("page") || "1")
    const limit = Number.parseInt(request.nextUrl.searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    const totalUsers = await users.countDocuments()
    const allUsers = await users
      .find({}, { projection: { password: 0 } }) // Exclude passwords
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Get user statistics
    const stats = await users
      .aggregate([
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            activeUsers: { $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] } },
            adminUsers: { $sum: { $cond: [{ $eq: ["$role", "admin"] }, 1, 0] } },
            clientUsers: { $sum: { $cond: [{ $eq: ["$role", "client"] }, 1, 0] } },
          },
        },
      ])
      .toArray()

    // Get recent signups (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentSignups = await users.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    })

    return NextResponse.json({
      success: true,
      users: allUsers.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        phone: user.phone,
        isActive: user.isActive,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        portfolioValue: user.portfolioValue,
        totalReturns: user.totalReturns,
        signupIP: user.signupIP,
        lastLoginIP: user.lastLoginIP,
      })),
      pagination: {
        page,
        limit,
        total: totalUsers,
        pages: Math.ceil(totalUsers / limit),
      },
      statistics: stats[0] || {
        totalUsers: 0,
        activeUsers: 0,
        adminUsers: 0,
        clientUsers: 0,
      },
      recentSignups,
    })
  } catch (error) {
    console.error("Admin users fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Update user status (activate/deactivate)
export async function PATCH(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId, isActive } = await request.json()

    const db = await getDatabase()
    const users = db.collection("users")

    // Verify user is admin
    const adminUser = await users.findOne({ email: user.email, role: "admin" })
    if (!adminUser) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Update user status
    const result = await users.updateOne(
      { _id: { $oid: userId } },
      {
        $set: {
          isActive,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: `User ${isActive ? "activated" : "deactivated"} successfully`,
    })
  } catch (error) {
    console.error("Admin user update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
