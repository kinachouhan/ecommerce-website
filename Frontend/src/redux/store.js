import { configureStore } from '@reduxjs/toolkit'
import productReducer from "./productSlice.js"
import cartReducer from "./cartSlice.js"
import orderReducer from "./orderSlice.js"

 const store = configureStore({
  reducer: {
       product : productReducer,
       cart: cartReducer,
       order: orderReducer
  },
})

export default store