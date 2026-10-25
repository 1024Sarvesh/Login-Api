import mongoose from "mongoose";
import "dotenv/config"

const Connectdb = () => {
    try{
         mongoose.connect(process.env.MONGO_URI)
        console.log("database connected succesfully")
    }catch(err){
        console.log("Error is",err)
    }
}

export default Connectdb