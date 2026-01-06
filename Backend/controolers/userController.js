import { User } from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const signUp = async (req, res) => {
    try {

        const { name, email, password, role } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (role === "admin" && !email.endWith("@admin.com")) {
            return res.status(400).json({
                success: false,
                message: "Admin email must end with @admin.com"
            })

        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role: role || "user"
        })

        return res.status(200).json({
            success: true,
            responseData: newUser
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Signup failed",
            error: error.message
        })

    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email and password is required"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const tokenData = {
            id: user._id,
            role: user.role
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN })



        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })


        return res.status(200).json({
            success: true,
            token,
            responseData: user
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        })
    }
}

export const logout = async (req, res) => {

    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: false
        })

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed"
        })
    }
}