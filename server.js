import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import Connectdb from './src/Db/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from './src/models/UserSchema.js'

const app = express()


// -------------------Bosy Parser Section--------------------------

app.use(express.json())
app.use(cors())

// ---------------------Connect database Section-----------------------------

Connectdb()


// ------------------Singup Section--------------------------

app.post("/auth/signup", async (req, res) => {
  console.log(req.body);
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "name, email and password are required",
      });
    }

    if (name.trim().length < 2 || name.trim().length > 50) {
      return res.status(400).json({
        success: false,
        message: "name must be between 2 and 50 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      gender,
    });
    const savedUser = await user.save();

    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    console.error("Signup error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


// ----------------------------Login Section---------------------------------


app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const protectedEmail = email.trim().toLowerCase();

    if (!/^\S+@\S+\.\S+$/.test(protectedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters",
      });
    }

    const LoginUser = await User.findOne({
      email: protectedEmail,
    });

    if (!LoginUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (typeof LoginUser.password !== "string") {
      console.error("Stored password hash is missing");
      return res.status(500).json({
        success: false,
        message: "Account password is invalid",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      LoginUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is missing in .env");
    }

    const token = jwt.sign(
      {
        id: LoginUser._id.toString(),
        email: LoginUser.email,
        name: LoginUser.name,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: `Login successful. Welcome ${LoginUser.name}`,
      token,
    });

  } catch (error) {
    console.error("Login Error:", error);
  }
});



const PORT = process.env.PORT;
const HostName = "127.0.0.1"


app.listen(PORT, HostName, () => {
  console.log(`Server Started on ${HostName}:${PORT} Port Succesfully`)
})