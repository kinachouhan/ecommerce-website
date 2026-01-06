import { configureStore } from '@reduxjs/toolkit'
import productReducer from "./productSlice.js"
import cartReducer from "./cartSlice.js"
import orderReducer from "./orderSlice.js"
import authReducer from "./authSlice.js"
import {
     persistStore,
     persistReducer,
     FLUSH,
     REHYDRATE,
     PAUSE,
     PERSIST,
     PURGE,
     REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";



const persistConfig = {
     key: "root",
     storage,
     whitelist: ["cart"] // persist only the cart slice
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);


export const store = configureStore({
     reducer: {
          product: productReducer,
          cart: persistedCartReducer,   // ✅ persisted
          order: orderReducer,
          auth: authReducer,
     },
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
               serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
               },
          }),
})

export const persistor = persistStore(store);