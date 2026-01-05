import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    items: []
}



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i._id === item._id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({
                    ...item,
                    quantity: 1
                })
            }
        },

        decreaseQty: (state, action) => {
            const item = state.items.find(i => i._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload)
        },

        clearCart: (state, action) => {
            state.items = []
        }
    }
}
)

export const { addToCart, removeFromCart, clearCart, decreaseQty } = cartSlice.actions
export default cartSlice.reducer