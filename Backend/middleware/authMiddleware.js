import jwt from "jsonwebtoken"
import {User} from "../models/userModel.js"

export const authMiddleware = async(req , res, next)=>{
    try{
        

        const token = req.cookies.token

        if(!token){
            return res.status(400).json({
                success: false,
                message:"Unauthorized token"
            })
        }

        
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(decoded.id).select("-password")

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        req.user = user

        next()
    }
    catch(error){

        return res.status(500).json({
             success: false,
             message: "Invalid or expired token"
        })
    }
}