import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    desc:{
        type:String
    },
    amount:{
        type:Number,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
},{
    timestamps:true,
}
)

export const Expense = new mongoose.model("ExpenseSchema",ExpenseSchema)