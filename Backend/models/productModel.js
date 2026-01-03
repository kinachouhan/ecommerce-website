import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    subCategory:{
         type: String,
         required: true
    },
    price:{
        type: Number,
        required: true
    },
    sizes:{
            type: [String],
            required: true
    } ,
    bestseller: { 
        type: Boolean, 
        default: false
     },
    images:[
      {type: String}
    ]
}, {timestamps: true})

export const Product = mongoose.model("Product" , productSchema)