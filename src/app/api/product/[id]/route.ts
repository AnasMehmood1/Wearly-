import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig/dbConfig";
import ProductModel from "@/models/product.model";
import mongoose from "mongoose";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID format" },
        { status: 400 }
      );
    }
    
    const product = await ProductModel.findById(params.id);
    
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
      { 
        success: false, 
        message: "Failed to fetch product",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}



