import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import ConnectDb from './src/db/ConnectDb.js'

const app = express()

app.use(express.json())
app.use(cors())

ConnectDb()


const HostName = "127.0.0.1";
const PORT = process.env.PORT


app.listen(HostName,PORT,()=>{
    console.log(`Server started on ${HostName}:${PORT} successfully`)
})