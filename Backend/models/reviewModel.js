
import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
       product: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Product",
           required: true
       },
       user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
       },
       ratings: {
          type: Number,
          min: 1,
          max: 5,
          required: true
       },
       comment: {
           type: String,
           required: true,
           trim: true
       }
}, {timestamps: true})

reviewSchema.index({product: 1 , user: 1}, {unique: true})

export const Review = mongoose.model("Review", reviewSchema)