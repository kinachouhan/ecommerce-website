import {Order} from "../models/orderModel.js"

export const placeOrder = async(req, res)=>{
      try{
             const orderData = req.body

             if(!orderData){
                  return res.status(400).json({
                     success: false,
                     message: "All details are required"
                  })
             }
             const newOrder = new Order(orderData)

             await newOrder.save()

             res.status(200).json({
                  success: true,
                  responseData: newOrder
             })
      }
      catch(error){
              res.status(500).json({
                   success: false,
                   message: "Failed to place order"
              })
      }
}


export const updateOrderStatus = async(req , res)=>{
      try{
             const {orderId} = req.params
             const {status} = req.body
             
           const order = await Order.findById(orderId)
           if(!order){
               return res.status(400).json({
                  success: false,
                  message:"Order not found"
               })
           }

           order.status = status
           await order.save()

           res.status(200).json({
               success: true,
               responseData: order
           })

      }
      catch(error){
           res.status(500).json({ message: "Failed to update order" });
      }
}


export const getAllOrders = async(req, res)=>{
      try{
            const orders = await Order.find().sort({ createdAt: -1 }).populate("items.productId").populate("userId");

            res.status(200).json({
                 success: true,
                 responseData: orders
            })

      }
      catch(error){
         res.status(500).json({ message: "Failed to fetch orders", error: err.message });
      }
}


export const getUserOrders = async(req, res)=>{
      try{
          const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });

          res.status(200).json({
              success: true,
              responseData : orders
          })
     
      }
      catch(error){
         res.status(500).json({ message: "Failed to fetch orders" });
      }
}