import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import { connectDB } from "@/lib/dbConfig/dbConfig";
import { uploadImage } from "@/helper/cloudinary";

export async function POST(request: NextRequest) {
    await connectDB();

    try {
        const formData = await request.formData(); // Get FormData
        const name = formData.get("name") as string;
        const price = formData.get("price") as string;
        const description = formData.get("description") as string;
        const imageFile = formData.get("image") as File;
        const category = formData.get("category") as string;
        const stock = formData.get("stock") as string;
        if (!imageFile) throw new Error("Image is required");

        // Convert file to base64
        const buffer = await imageFile.arrayBuffer();
        const base64Image = `data:${imageFile.type};base64,${Buffer.from(buffer).toString("base64")}`;

        // Upload image to Cloudinary
        const imageUrl = await uploadImage(base64Image);

        const product = await ProductModel.create({
            name,
            price,
            description,
            image: imageUrl, // Store Cloudinary URL
            category,
            stock
        });

        return NextResponse.json({
            success: true,
            message: "Product added successfully",
            product,
        }, { status: 201 });

    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({
            success: false,
            message: error.message || "Product not added",
        }, { status: 400 });
    }
}
