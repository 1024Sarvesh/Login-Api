import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../model/userSchema.js';
import 'dotenv/config'

const Login = async (req, res) => {

    try {


        const { email, password } = req.body;


        if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password.trim()) {
            return res.status(401).json({
                success: false,
                message: "email and password are required"
            })
        }

        if (password.length < 8) {
            return res.status(401).json({
                success: false,
                message: "Please Enter a Password Atleast 8 Characters"
            })
        }
        const user = await User.findOne(
            {
                email
            }).select("+password");
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password." })
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.TOKEN_SECRET,
            {expiresIn : process.env.EXPIRESIN}
        )

        return res.status(200).json({
            success:true,
            message: "Login successful.",
            token,
            user: {
                name:user.name,
                id:user._id,
                email:user.email,
            
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

        console.log(error)
    }


}

export default Login