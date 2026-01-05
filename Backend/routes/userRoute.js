import express from "express"
import {signUp} from "../controolers/userController.js"
import {login} from "../controolers/userController.js"

const router = express.Router()

router.post("/signup" , signUp)
router.post("/login" , login)


export default router