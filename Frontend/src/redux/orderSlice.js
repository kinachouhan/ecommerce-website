import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
const API = import.meta.env.VITE_API_URL;

const initialState = {
    userData: null,
    orders: []
}




export const fetchOrders = createAsyncThunk(
    "order/fetchorders",
    async (_, thunkAPI) => {
        const res = await fetch(`${API}/api/v1/orders/my-orders`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        if (data.success) {
            return data.responseData
        }
        else{
              throw new Error(data.message)
        }
    }
)

export const fetchAllOrdersAdmin = createAsyncThunk(
    "order/fetchAllOrdersAdmin",
    async (_, thunkAPI) => {
        const res = await fetch(`${API}/api/v1/orders`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        return data.responseData;
    }
);

export const updateOrderStatusAsync = createAsyncThunk(
    "order/updateStatus",
    async ({ orderId, status }, thunkAPI) => {
        const res = await fetch(`${API}/api/v1/orders/${orderId}/status`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        });
        const data = await res.json();
        if (data.success) {
            return data.responseData;
        }
    }
);

export const placeOrderAsync = createAsyncThunk(
    "order/placeOrder",
    async (orderData) => {
        const res = await fetch(`${API}/api/v1/orders`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        return data.responseData;
    }
);


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
    },
    extraReducers: (builder) => {
        builder
            // Fetch Orders
            .addCase(fetchOrders.pending, (state) => { state.loading = true })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Update status
            .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
                const updatedOrder = action.payload; // already the order
                const index = state.orders.findIndex(o => o._id === updatedOrder._id);
                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                }
            })
            .addCase(placeOrderAsync.fulfilled, (state, action) => {
                state.orders.unshift(action.payload);
            })
            .addCase(fetchAllOrdersAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllOrdersAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchAllOrdersAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})


export const { setOrderData, clearOrderData, placeOrder, updateOrderStatus } = orderSlice.actions

export default orderSlice.reducer