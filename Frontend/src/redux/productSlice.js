import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
     loading: false,
    products: [],
    error: null
}


export const fetchProducts = createAsyncThunk(
     "product/fetchproducts",
     async()=>{
         const res = await fetch("http://localhost:3200/api/v1/products/get")
         const data = await res.json()
         console.log(data)
         if(data.success){
             return data.responseData
         }
     }
)



const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
          builder.addCase(fetchProducts.pending , (state , action)=>{
               state.loading= true,
               state.error= null
          })
          builder.addCase(fetchProducts.fulfilled, (state,action)=>{
               state.loading = false,
               state.products = action.payload
          })
          builder.addCase(fetchProducts.rejected, (state, action)=>{
              state.loading = false,
              state.error = action.payload || "something went wrong"
          })
    }
})


export default productSlice.reducer