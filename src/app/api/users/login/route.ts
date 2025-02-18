import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import AdminModel from "@/models/admin.model"; // Make sure this is defined
import { connectDB } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { email, password } = await request.json();

    // Try to find the user in the AdminModel first.
    let user = await AdminModel.findOne({ email });
    
    // If not found in AdminModel, try to find in UserModel.
    if (!user) {
      user = await UserModel.findOne({ email });
    }
    
    // If user is still not found, return error.
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Compare the provided password with the stored hashed password.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // Prepare token data. If the user is from the AdminModel, mark them as admin.
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      // Option 1: If you added a role field in both schemas, you can simply use:
      // role: user.role,
      // Option 2: Otherwise, assume that if the user came from AdminModel, they are admin.
      role: user.role || (user.collection && user.collection.name === "admins" ? "admin" : "user"),
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1h" });

    const response = NextResponse.json(
      {
        success: true,
        message: "User logged in successfully",
        user: user,
        token: token,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.error("Error logging in", error);
    return NextResponse.json(
      { success: false, message: "Error logging in" },
      { status: 500 }
    );
  }
}
