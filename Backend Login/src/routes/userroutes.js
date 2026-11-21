import express from "express";

import checkToken from "../middleware/CheckToken.js";
import adminMiddleware from "../middleware/Admin.js";

import {CreateExpense,DeleteExpense,GetAllExpenses,GetExpenseById,UpdateExpense} from "../Controllers/expense.js";

const router = express.Router();

router.post("/expense/create", checkToken, adminMiddleware("user", "admin"), CreateExpense);

router.get("/expense/all", checkToken, adminMiddleware("user", "admin"), GetAllExpenses);

router.get("/expense/:id", checkToken, adminMiddleware("user", "admin"), GetExpenseById);

router.put("/expense/update/:id", checkToken, adminMiddleware("user", "admin"), UpdateExpense);

router.delete("/expense/delete/:id", checkToken, adminMiddleware("user", "admin"), DeleteExpense);

export default router;