import { NextRequest, NextResponse } from "next/server"
import UserModel from "@/models/user.model"
import AdminModel from "@/models/admin.model"
import { connectDB } from "@/lib/dbConfig/dbConfig"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = "this is a secret key"

export async function POST(request: NextRequest) {
  await connectDB()

  try {
    const { email, password } = await request.json()

    let user = await AdminModel.findOne({ email })
    if (!user) user = await UserModel.findOne({ email })
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      )
    }

    // Prepare token payload
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role || (user.collection && user.collection.name === "admins" ? "admin" : "user"),
    }

    // Generate token
    const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1h" })

    return NextResponse.json(
      {
        success: true,
        message: "User logged in successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: tokenData.role,
        },
        token, // Send token in response
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error logging in", error)
    return NextResponse.json(
      { success: false, message: "Error logging in" },
      { status: 500 }
    )
  }
}
