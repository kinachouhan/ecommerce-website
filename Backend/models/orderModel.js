
import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
      userId : {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true
      },
      items: [{
          productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
              required: true
          },
          productName: String,
          price: Number,
          quantity: Number,
          size: String,
          images: [String]
      }],
      total:{
         type: Number,
         required: true
      },
      paymentMethod: {
          type: String,
          enum: ["COD" , "Online"],
          required: true
      },
      paymentStatus:{
         type: String,
          enum: ["Pending", "Completed"],
         default: "pending"
      },
      status:{
          type: String,
          enum: ["Order Placed" ,"Pending", "Delivered", "Cancelled", "Packing", "Out for delivery", "Shipped"],
          default: "Order Placed"
      },
       userData: {
      firstName: String,
      lastName: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
      phone: String,
      email: String
    }
}, {timestamps: true})


export const Order = mongoose.model("Order", orderSchema)