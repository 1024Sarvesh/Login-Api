import { User } from "../model/userSchema.js";


export const AllUser = async(req,res)=>{
    try {
        const users = await User.find({
             user: req.user.id
        })

        return res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        console.log(error)
    }
}