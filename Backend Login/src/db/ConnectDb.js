import mongoose from "mongoose";
import 'dotenv/config'

const ConnectDb = async()=>{
    try {
        mongoose.connect(process.env.DATABASE_URL)
        console.log("database connected successfully")
    } catch (error) {
        process.exit(1)
    }
}
export default ConnectDb