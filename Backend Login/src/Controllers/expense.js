import mongoose from "mongoose";
import { Expense } from "../model/expenseSchema.js"

export const CreateExpense = async (req, res) => {

    try {
        const { title, description, amount, date } = req.body

        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        if (typeof title !== "string" || typeof amount !== "number" || !title.trim() || !amount) {
            return res.status(400).json({
                success: false,
                message: "title and amount are required",
            });
        }

        console.log(req.body);
        const expense = await new Expense({
            title,
            description,
            amount,
            date,
            user: req.user.id,
        }).save();

        res.status(201).json({
            success: true,
            message: "Expense added",
            expense,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }


}


export const GetAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({
            user: req.user.id
        })

        return res.status(200).json({
            success: true,
            count: expenses.length,
            expenses,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
export const GetExpenseById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid expense ID",
            });
        }

        const expense = await Expense.findOne({
            _id: id,
            user: req.user.id
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        return res.status(200).json({
            success: true,
            expense,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



export const UpdateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, amount, date } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid expense ID",
            });
        }

        if (title !== undefined &&(typeof title !== "string" || !title.trim())) {
            return res.status(400).json({
                success: false,
                message: "Invalid title",
            });
        }

        if (amount !== undefined && (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0)) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount",
            });
        }

        const updateExpense = {};

        if (title !== undefined){
            updateExpense.title = title;
        } 
        if (description !== undefined) {
            updateExpense.description = description;
        }
        if (amount !== undefined) {
            updateExpense.amount = amount;
        }
        if (date !== undefined) {
            updateExpense.date = date;
        }

        const expense = await Expense.findOneAndUpdate(
            {
                _id: id,
                user: req.user.id,
            },
            { $set: updateExpense },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            expense,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};





export const DeleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid expense ID",
            });
        }

        const expense = await Expense.findOneAndDelete({
            _id: id,
            user: req.user.id,
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
            expense
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
