import jwt from "jsonwebtoken";
import {NextRequest} from "next/server";
const secret = "this is my secret key";

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
}

export const getDataFromToken = (request: NextRequest) => { 

   try {
     const token = request.headers.get("token") || "";
    
     if(!token){
         console.log("No token found");
     }
    //  console.log(token);
 
   const decodedToken = jwt.verify(token, secret) as DecodedToken;
     
     return decodedToken.id;
   } catch (error) {
     if (error instanceof Error) {
       console.log(error.message);
     }
   }
     

}
