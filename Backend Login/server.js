import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import ConnectDb from './src/db/ConnectDb.js'
import Signup from './src/Controllers/signup.js'
import Login from './src/Controllers/login.js'

const app = express()

app.use(express.json())
app.use(cors())

ConnectDb()

app.post("/auth/signup",Signup)
app.post("/auth/login",Login)


const HostName = "127.0.0.1";
const PORT = process.env.PORT


app.listen(PORT,HostName,()=>{
    console.log(`Server started on ${HostName}:${PORT} successfully`)
})