import { User } from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const signUp = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const role = email.endsWith("@admin.com") ? "admin" : "user"
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role
        })


        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.SECRET_KEY,
            { expiresIn: process.env.EXPIRES_IN }
        );




        return res
            .cookie("token", token, {

                httpOnly: true,
                secure: true,          // ✅ REQUIRED on HTTPS
                sameSite: "none",      // ✅ REQUIRED for cross-origin
                maxAge: 7 * 24 * 60 * 60 * 1000,

            })
            .status(200).json({
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



        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: process.env.EXPIRES_IN }
        );




        res.cookie("token", token, {
            httpOnly: true,
            secure: true,          // ✅ REQUIRED on HTTPS
            sameSite: "none",      // ✅ REQUIRED for cross-origin
            maxAge: 7 * 24 * 60 * 60 * 1000,
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
            sameSite: "lax",
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

export const getMe = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        return res.status(200).json({
            success: true,
            responseData: user
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Invalid token" });
    }
};



export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // 🔥 logged-in user
        const { address } = req.body;

        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Address is required",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,                    // ✅ ONLY THIS USER
            { address },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            responseData: {
                address: updatedUser.address,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};