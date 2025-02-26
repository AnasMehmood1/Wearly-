import mongoose from "mongoose";
 
export const connectDB = async () => {
  // console.log(process.env.MONGODB_URI);
    try {
       await mongoose.connect(process.env.MONGODB_URI!);
       const connection = mongoose.connection;
       connection.on("connected", () => {
        console.log("Connected to MongoDB");
      });
      connection.on("error", (error) => {
        console.error("Error connecting to MongoDB", error);
      });
     
        
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);    
    }
}
 