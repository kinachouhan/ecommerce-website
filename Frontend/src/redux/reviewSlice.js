import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    reviews: [],
    userReview: null,
    count: 0,
    loading: false,
    error: null,
    canReview: false
}

export const checkCanReview = createAsyncThunk(
    "review/checkCanReview",
    async (productId) => {
        const res = await fetch(
            `http://localhost:3200/api/v1/reviews/can-review/${productId}`,
            { credentials: "include" }
        );
        const data = await res.json();
        return data.canReview;
    }
);

export const fetchProductReviews = createAsyncThunk(
    "review/fetchProductReviews",
    async (productId) => {
        const res = await fetch(
            `http://localhost:3200/api/v1/reviews/${productId}`
        );
        return await res.json();
    }
);

export const fetchUserReview = createAsyncThunk(
    "review/fetchUserReview",
    async (productId) => {
        const res = await fetch(
            `http://localhost:3200/api/v1/reviews/user/${productId}`,
            { credentials: "include" }
        );
        const data = await res.json();
        return data.responseData || null;
    }
);

export const submitReview = createAsyncThunk(
    "review/submitReview",
    async ({ productId, rating, comment }, { rejectWithValue }) => {
       try{ const res = await fetch(
            "http://localhost:3200/api/v1/reviews",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId, rating, comment })
            }
        );
        const data = await res.json();
        if (!data.success){
                return rejectWithValue(data.message);  
            }
        return data.responseData;
    }
    catch(error){
          return rejectWithValue(err.message);
    }
    }
);

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        clearReviews: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkCanReview.fulfilled, (state, action) => {
                state.canReview = action.payload;
            })
            .addCase(fetchProductReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.responseData;
                state.count = action.payload.count;
            })
            .addCase(fetchProductReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserReview.fulfilled, (state, action) => {
                state.userReview = action.payload;
            })
            .addCase(submitReview.fulfilled, (state, action) => {
                state.userReview = action.payload;

                const index = state.reviews.findIndex(
                    (r) => r._id === action.payload._id
                );

                if (index !== -1) {
                    state.reviews[index] = action.payload;
                } else {
                    state.reviews.unshift(action.payload);
                    state.count += 1;
                }
            });
    }
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
