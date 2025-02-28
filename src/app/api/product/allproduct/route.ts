import {  NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import { connectDB } from "@/lib/dbConfig/dbConfig";

export async function GET() {
    try {
        await connectDB(); // Ensure DB is connected inside the function

        const products = await ProductModel.find();

        if (products.length === 0) {
            return NextResponse.json(
                { success: false, message: "No products found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, products },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching products:" ,error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
