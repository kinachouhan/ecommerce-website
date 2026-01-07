import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

// FETCH CART
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:3200/api/v1/cart", {
                credentials: "include",
            });
            const data = await res.json();
            if (!data.success) throw new Error("Failed to load cart");
            return data.responseData.items;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// ADD TO CART
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, size, quantity = 1 }, { rejectWithValue, dispatch }) => {
        try {
            const res = await fetch("http://localhost:3200/api/v1/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId, size, quantity }),
            });

            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);

          

            return data.cart.items; 
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// REMOVE FROM CART
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ productId, size }, { rejectWithValue, dispatch }) => {
        try {
            const res = await fetch("http://localhost:3200/api/v1/cart/remove", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId, size }),
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);

            dispatch(fetchCart());

            return data.responseData.items;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// CLEAR CART
export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:3200/api/v1/cart/clear", {
                method: "DELETE",
                credentials: "include",
            });
            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);

            dispatch(fetchCart());
            return [];
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCart: (state) => {
            state.items = [];
        },
        setCart: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
            });
    },
});

export const { resetCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
