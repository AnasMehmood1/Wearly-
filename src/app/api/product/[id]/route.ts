import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
  ) {
    // Await the params object:
    const { id } = await Promise.resolve(context.params);
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found",
            }, {status: 404});
        }
        return NextResponse.json({
            success: true,
            product,
        }, {status: 200});
        

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
        }, {status: 500});
        
    }
    

}
           

