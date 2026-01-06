
import express from "express"
import {authMiddleware} from "../middleware/authMiddleware.js"
import {placeOrder , getUserOrders , getAllOrders , updateOrderStatus} from "../controolers/orderController.js"

const router = express.Router()

router.post("/", placeOrder)
router.put("/:orderId/status", authMiddleware , updateOrderStatus)
router.get("/", authMiddleware, getAllOrders)
router.get("/my-orders/:userId", getUserOrders)


export default router