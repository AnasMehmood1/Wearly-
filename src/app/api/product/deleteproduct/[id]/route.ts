import {  NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import { connectDB } from "@/lib/dbConfig/dbConfig";

export async function DELETE(
   
    context: { params: { id: string } }
) {
    await connectDB(); // Ensure DB connection inside the function

    const { id } = context.params; // Extract the product ID from URL params

    if (!id) {
        return NextResponse.json(
            { success: false, message: "Product ID is required" },
            { status: 400 }
        );
    }

    try {
        const product = await ProductModel.findByIdAndDelete(id);
        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting product");
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error },
            { status: 500 }
        );
    }
}
