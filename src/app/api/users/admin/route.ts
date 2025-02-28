// src/app/api/admin/signup/route.ts
import {  NextResponse } from "next/server";
import AdminModel from "@/models/admin.model";
import { connectDB } from "@/lib/dbConfig/dbConfig";
import bcrypt from "bcryptjs";

export async function POST() {
  await connectDB();
  
  try {
    // Hardcoded admin details for demonstration
    const adminExists = await AdminModel.findOne({ email: "anasmehmoodvip@gmail.com" });
    if (adminExists) {
      return NextResponse.json({ success: false, message: "Admin already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash("anas!@#%", 10);

    const admin = await AdminModel.create({
      username: "AnasMehmood",
      email: "anasmehmoodvip@gmail.com",
      password: hashedPassword,
      // If you have a role field in AdminModel, set it here as well.
      role: "admin"
    });
    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      admin: admin,
    }, { status: 201 });
  } catch (error) {
    console.error("Admin creation error:", error);
    return NextResponse.json({
      success: false,
      message: "Error in admin signup",
      error: error,
    }, { status: 500 });
  }
}
