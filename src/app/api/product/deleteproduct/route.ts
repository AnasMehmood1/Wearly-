import { NextRequest, NextResponse } from "next/server";    
import ProductModel from "@/models/product.model";
import { connectDB } from "@/dbConfig/dbConfig";

 connectDB();


export async function DELETE(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const productId = searchParams.get("id");
    
    try {
        const product = await ProductModel.findByIdAndDelete(productId);
        if(!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found"
            }, {status: 404});
        }
        return NextResponse.json({
            success: true,
            message: "Product deleted successfully"
        }, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, {status: 500});
    }
}
