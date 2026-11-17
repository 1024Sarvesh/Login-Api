import mongoose from "mongoose";
import { User } from "../model/userSchema.js"

export const GetUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            _id: id,
        })
        return res.status(200).json({
            success: true,
            user: user
        })
    } catch (error) {
        console.log(error)
    }
}

export const DeleteUserById = async (req,res) => {

    try {
        const { id } = req.params;
        const user = await User.findOneAndDelete({
                    _id: id,
                });

                if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });}

            return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user
        });
        
    } catch (error) {
        
    }

}



