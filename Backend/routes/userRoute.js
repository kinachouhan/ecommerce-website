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
router.put("/orders/:orderId/status", (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    
    const order = orders.find(o => o.id === orderId); // or query in real DB
    if (!order) return res.status(404).send({ message: "Order not found" });

    order.status = status;
    // Save changes to DB if persistent
    res.send(order);
});


export default router