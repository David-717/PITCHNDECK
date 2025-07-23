import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "subject", "message", "inquiryType"]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    const db = await getDatabase()
    const contacts = db.collection("contacts")

    // Create contact document
    const contactData = {
      ...body,
      createdAt: new Date(),
      status: "new",
      priority: body.inquiryType === "investment-consultation" ? "high" : "normal",
    }

    const result = await contacts.insertOne(contactData)

    return NextResponse.json({
      success: true,
      contactId: result.insertedId,
      message: "Contact form submitted successfully",
    })
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const db = await getDatabase()
    const contacts = db.collection("contacts")

    // Return all contacts (admin only - add authentication in production)
    const allContacts = await contacts.find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json({ contacts: allContacts })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
