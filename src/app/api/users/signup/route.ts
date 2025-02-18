import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import { connectDB } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";



export async function POST(request: NextRequest) {

    await connectDB();

     try {
         const {username, email, password} = await request.json();
         
         const hashedPassword = await bcrypt.hash(password, 10);

         const newUser = await UserModel.create({ 
            username,
            email,
            password: hashedPassword,
         }) 
         await newUser.save();  

         return NextResponse.json({
            success: true,
            message: "User signup successfully",
            user: newUser,
         }, { status: 201 });
        

         

        
     } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error in signup",
            error: error,
        }, { status: 500 });
        
     }
   
}



