import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import ConnectDb from './src/db/ConnectDb.js'
import authRoutes from "./src/routes/authroutes.js";
import userRoutes from "./src/routes/userroutes.js";
import adminRoutes from "./src/routes/adminroutes.js";

const app = express()

app.use(express.json())
app.use(cors())

ConnectDb()


app.use("/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/admin", adminRoutes);


const HostName = "127.0.0.1";
const PORT = process.env.PORT


app.listen(PORT, HostName, () => {
  console.log(`Server started on ${HostName}:${PORT} successfully`)
})