import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; // Extract the product ID from the URL path

    if (!id) {
        return NextResponse.json({
            success: false,
            message: "Product ID is required"
        }, { status: 400 });
    }

    try {
        const product = await ProductModel.findByIdAndDelete(id);
        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Product deleted successfully"
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 });
    }
}
