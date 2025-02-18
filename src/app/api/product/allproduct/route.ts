import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/models/product.model";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();
export async function GET(request: NextRequest) { 
    
    try {
        const products = await ProductModel.find();
        if(!products) {
            return NextResponse.json({message: "No products found"}, {status: 404});    
        }
        return NextResponse.json({products}, {status: 200});        
    } catch (error) {
        
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});    
        
    }
    
}