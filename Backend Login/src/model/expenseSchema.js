import mongoose from "mongoose";

const {Schema} = mongoose

const ExpenseSchema = new Schema(
    {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now(),
    },

    description: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
},
{
    timestamps: true,
  }
)


export const Expense = mongoose.model("Expense", ExpenseSchema);