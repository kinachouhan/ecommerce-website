
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
     name:{
        type:String,
        required: true,
        trim: true
     },
     email:{
        type:String,
        required: true,
         unique: true,
     },
     password:{
        type:String,
        required: true
     },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    address:{
      firstName: String,
      lastName: String,
      email: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
      phone: String
    }

    
}, {timestamps: true})


export const User = mongoose.model("User" , userSchema)