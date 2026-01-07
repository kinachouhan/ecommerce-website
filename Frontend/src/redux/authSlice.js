import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        updateAddress: (state, action) => {
            if (state.user) {
                state.user.address = action.payload
            }
        }
    }
})


export const { setUser, logout, updateAddress } = authSlice.actions
export default authSlice.reducer