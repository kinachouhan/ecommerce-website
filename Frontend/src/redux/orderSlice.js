import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: null,
    orders: []
}


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderData: (state, action) => {
            state.userData = action.payload
        },
        clearOrderData: (state) => {
            state.userData = null
        },
         placeOrder: (state, action) => {
            state.orders.push(action.payload)
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload
            const order = state.orders.find(o => o.id === orderId)
            if (order) {
                order.status = status
            }
        }
    }
})


export const {setOrderData , clearOrderData , placeOrder , updateOrderStatus} = orderSlice.actions

export default orderSlice.reducer