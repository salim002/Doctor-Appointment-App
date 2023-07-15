import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const URI = process.env.MONGO_URI;

const connectToMongo = async ()=>{
    try{
        const res = await mongoose.connect(URI);
        if(res){
            console.log(`Database connected sussessfully`.bgGreen.white);
        }
    } catch(error){
        console.log(`${error}`.bgRed.white);
    }
}

export default connectToMongo;