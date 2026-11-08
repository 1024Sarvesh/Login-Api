import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import ConnectDb from './src/db/ConnectDb.js'
import Signup from './src/Controllers/signup.js'
import Login from './src/Controllers/login.js'
import { checkToken } from './src/middleware/CheckToken.js'
import { CreateExpense, DeleteExpense, GetAllExpenses, GetExpenseById, GetUserExpenses, UpdateExpense } from './src/Controllers/expense.js'
import { AllUser } from './src/Controllers/AllUsers.js'

const app = express()

app.use(express.json())
app.use(cors())

ConnectDb()

app.post("/auth/signup", Signup)
app.post("/auth/login", Login)
app.get("/auth/allusers",AllUser)
app.post("/expense/create", checkToken, CreateExpense)
app.get("/expense/all", checkToken, GetAllExpenses)
app.get("/expense/:id", checkToken, GetExpenseById)
app.put("/expense/update/:id", checkToken, UpdateExpense)
app.get("/expense/users/:id",checkToken,GetUserExpenses)
app.delete("/expense/delete/:id", checkToken, DeleteExpense)


const HostName = "127.0.0.1";
const PORT = process.env.PORT


app.listen(PORT, HostName, () => {
    console.log(`Server started on ${HostName}:${PORT} successfully`)
})