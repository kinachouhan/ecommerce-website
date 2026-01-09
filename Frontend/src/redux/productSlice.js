import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
const API = import.meta.env.VITE_API_URL;


const initialState = {
    loading: false,
    products: [],
    searchInput: "",
    error: null
}


export const fetchProducts = createAsyncThunk(
    "product/fetchproducts",
    async () => {
        const res = await fetch(`${API}/api/v1/products/get`)
        const data = await res.json()
        console.log(data)
        if (data.success) {
            return data.responseData
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id) => {
        const res = await fetch(
            `${API}/api/v1/products/delete/${id}`,
            { method: "DELETE" }
        );
        const data = await res.json();

        if (!data.success) {
            throw new Error("Delete failed");
        }

        return id;
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
        clearSearchInput: (state) => {
            state.searchInput = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true,
                state.error = null
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false,
                state.products = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload || "something went wrong"
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(
                (p) => p._id !== action.payload
            )
        })
    }
})

export const { setSearchInput, clearSearchInput } = productSlice.actions
export default productSlice.reducer