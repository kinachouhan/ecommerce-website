
import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { isAdmin } from "../middleware/isAdmin.js"

const router = express.Router()

router.get("/dashboard", authMiddleware, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Admin Dashboard",
        admin: req.user
    })
})

export default router