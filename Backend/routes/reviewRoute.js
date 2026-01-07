
import express from "express";
import { submitReview, getProductReviews, getUserReview , canUserReviewProduct } from "../controolers/reviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // your auth middleware

const router = express.Router();

router.get("/can-review/:productId", authMiddleware ,  canUserReviewProduct);

router.post("/", authMiddleware, submitReview);

router.get("/:productId", getProductReviews);

router.get("/user/:productId", authMiddleware, getUserReview);

export default router;