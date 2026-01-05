
import dotenv from "dotenv"
dotenv.config()
import cloudinary from "./clodinaryConfig/cloudinary.js";
import express from "express"
import {dbConnect} from './dbConfig/dbConnect.js'
import productRoute from "./routes/productRoute.js"
import cors from "cors"
import userRoute from "./routes/userRoute.js"

const app=express()
const PORT = process.env.PORT
dbConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use(cors({
    origin: "http://localhost:5173",
  credentials: true,
}))


app.use("/api/v1/products" , productRoute)
app.use("/api/v1/users" , userRoute)

app.listen(PORT, ()=>{
     console.log(`server is listening on ${PORT} port`)
})