import mongoose from "mongoose";
import { User } from "../model/userSchema.js"

export const GetUserById = async (req,res)=>{
    try {
        const {id} = req.params;
        const user  = await User.findOne({
            _id:id,
        })
        return res.status(200).json({
            success:true,
            user:user
        })
    } catch (error) {
        console.log(error)
    }
}



