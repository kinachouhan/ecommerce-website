import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
         loginSuccess: (state , action)=>{
             state.isAuthenticated = true,
             state.user = action.payload
         },
         logoutUser: (state, action)=>{
             state.isAuthenticated = false,
             state.user = null
         },
         updateAddress: (state,action)=>{
             if(state.user){
                 state.user.address = action.payload
             }
         }
    }
})


export const {loginSuccess , logoutUser , updateAddress} = authSlice.actions
export default authSlice.reducer