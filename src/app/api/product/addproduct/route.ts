import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import { connectDB } from "@/lib/dbConfig/dbConfig";
import { uploadImage } from "@/helper/cloudinary";

export async function POST(request: NextRequest) {
    try {
        // Connect to database
        await connectDB();

        // Parse form data
        const formData = await request.formData();
        const name = formData.get("name")?.toString();
        const price = formData.get("price")?.toString();
        const description = formData.get("description")?.toString();
        const category = formData.get("category")?.toString();
        const stock = formData.get("stock")?.toString();
        const imageFile = formData.get("image") as File | null;

        // Validate required fields
        if (!name || !price || !description || !category || !stock || !imageFile) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        // Convert price and stock to numbers
        const priceNumber = parseFloat(price);
        const stockNumber = parseInt(stock, 10);

        if (isNaN(priceNumber) || isNaN(stockNumber)) {
            return NextResponse.json(
                { success: false, message: "Invalid price or stock value" },
                { status: 400 }
            );
        }

        // Convert file to base64
        const buffer = await imageFile.arrayBuffer();
        const base64Image = `data:${imageFile.type};base64,${Buffer.from(buffer).toString("base64")}`;

        // Upload image to Cloudinary
        let imageUrl;
        try {
            imageUrl = await uploadImage(base64Image);
        } catch (error) {
            return NextResponse.json(
                { success: false, message: "Image upload failed", error },
                { status: 500 }
            );
        }

        // Create and store product
        const product = await ProductModel.create({
            name,
            price: priceNumber,
            description,
            image: imageUrl,
            category,
            stock: stockNumber,
        });

        return NextResponse.json(
            { success: true, message: "Product added successfully", product },
            { status: 201 }
        );

    } catch (error: unknown) {
        console.error("Error adding product:");
        return NextResponse.json(
            { 
                success: false, 
                message: error instanceof Error ? error.message : "Unknown error occurred"
            },
            { status: 500 }
        );
    }
}
