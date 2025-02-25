import jwt from "jsonwebtoken";
import {NextRequest} from "next/server";
const secret = "this is my secret key";
export const getDataFromToken = (request: NextRequest) => { 

   try {
     const token = request.headers.get("token") || "";
    
     if(!token){
         console.log("No token found");
     }
    //  console.log(token);
 
   const decodedToken:any = jwt.verify(token, secret);
     
     return decodedToken.id;
   } catch (error:any) {
    console.log(error.message); 
   }
     

}
