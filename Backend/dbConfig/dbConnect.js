
import mongoose from "mongoose"

export const dbConnect = async()=>{
     const instance = await mongoose.connect(process.env.MONGODB_URL)
     console.log(`mongodb is connected ${instance.connection.host}`)
}