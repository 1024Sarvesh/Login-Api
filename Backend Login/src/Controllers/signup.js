import { User } from "../model/userSchema.js";
import bcrypt from 'bcrypt'

const Signup = async (req, res) => {

    try {
        const { name, email, password, gender } = req.body;


        if (typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password) {
            res.status(401).json({
                success: false,
                msg: "name,email and password are required"
            })
            return

        }

        if (name.trim().length < 2 || name.trim().length > 50) {
            return res.status(400).json({
                success: false,
                message: "name must be between 2 and 50 characters",
            });
        }

        const HashedPass = await bcrypt.hash(password, 10)

        if (password.length < 8) {
            res.status(401).json({
                success: false,
                msg: "Password must contain at least 8 characters"
            })
            return
        }

        const normalEmail = email.trim().toLowerCase();

        if (!/^\S+@\S+\.\S+$/.test(normalEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email",
            });
        }
        const existingUser = await User.findOne
            ({
                email: normalEmail
            });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)) {
            res.status(401).json({
                success: false,
                msg: "Invalid Email"
            })
        }

        const NewUser = new User({
            name: name.trim(),
            email: normalEmail,
            password: HashedPass,
            gender,
        })

        const saveUser = await NewUser.save()

        res.status(201).json({
            msg: "User registered successfully",
            user: {
                id: NewUser._id,
                name: NewUser.name,
                email: NewUser.email,
                createdAt: NewUser.createdAt,
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    }

}

export default Signup