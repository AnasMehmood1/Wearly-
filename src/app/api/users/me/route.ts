import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import UserModel from "@/models/user.model";
import AdminModel from "@/models/admin.model";
export async function GET(request: NextRequest){
     
    try {
        const userId = await getDataFromToken(request);
        const user = await AdminModel.findOne({_id:userId});
        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }       
        return NextResponse.json({
            success: true,
            message: "User found",
            user: user,
        }, { status: 200 });    
    
    } catch (error:any) {
        console.log(error.message);
        return NextResponse.json({
            success: false,
                message: "User not found",
        }, { status: 404 });
        
    }
    
}
