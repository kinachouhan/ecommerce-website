import express from "express"
import {signUp} from "../controolers/userController.js"
import {login , logout , getMe , profile} from "../controolers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/signup" , signUp)
router.post("/login" , login)
router.delete("/logout" , logout)
router.get("/me", getMe)
router.put("/profile" ,authMiddleware , profile)


export default router