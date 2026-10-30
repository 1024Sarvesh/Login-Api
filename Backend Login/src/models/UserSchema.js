import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: 2,
        maxlength: 50,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
        select: true,
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: false,
    },
},
    {
        timestamps: true,
    },
)

export const User = new mongoose.model("UserSchema",UserSchema)