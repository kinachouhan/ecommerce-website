import { configureStore } from '@reduxjs/toolkit'
import productReducer from "./productSlice.js"
import cartReducer from "./cartSlice.js"

 const store = configureStore({
  reducer: {
       product : productReducer,
       cart: cartReducer,
  },
})

export default store