import {  NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import { connectDB } from "@/lib/dbConfig/dbConfig";
import mongoose from "mongoose";

export async function GET(
  
  context: { params: { id: string } }
) {
  try {
    // Ensure the database is connected
    await connectDB();

    // Extract `id` from the context
    const { id } = context.params;

    // Validate if `id` is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Fetch product by ID
    const product = await ProductModel.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
