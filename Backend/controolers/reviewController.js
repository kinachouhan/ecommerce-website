import { Order } from "../models/orderModel.js"
import { Review } from "../models/reviewModel.js"
import mongoose from "mongoose";

export const canUserReviewProduct = async (req, res) => {
    try {
        const userId = req.user._id
        const { productId } = req.params

        const order = await Order.findOne({
            userId,
            "items.productId": new mongoose.Types.ObjectId(productId),
            status: { $ne: "Cancelled" }
        })

        res.status(200).json({
            success: true,
            canReview: !!order
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to find orders"
        })
    }
}

export const submitReview = async (req, res) => {
    try {
        
        const { productId, rating, comment } = req.body


        let review = await Review.findOne({
            user: req.user._id,
            product: productId
        });

        if (review) {
            review.ratings = rating;   // ✅ SAVE RATING
            review.comment = comment;
            await review.save();
        } else {
            review = await Review.create({
                user: req.user._id,
                product: productId,
                ratings: rating,         // ✅ SAVE RATING
                comment
            });
        }

        res.status(200).json({
            success: true,
            responseData: review
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to submit review"
        })
    }
}


export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params

        const reviews = await Review.find({ product: productId }).populate("user", "name").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            responseData: reviews
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get orders"
        })
    }
}


export const getUserReview = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        const review = await Review.findOne({ user: userId, product: productId });

        res.status(200).json({
            success: true,
            responseData: review || null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to get user review"
        });
    }
};