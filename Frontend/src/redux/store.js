import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import authReducer from "./authSlice";
import buyNowReducer from "./buyNow.js"
import reviewReducer from "./reviewSlice.js"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

/* CART PERSIST */
const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer
);

/* ORDER PERSIST */
const orderPersistConfig = {
  key: "order",
  storage,
};

const persistedOrderReducer = persistReducer(
  orderPersistConfig,
  orderReducer
);

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: persistedCartReducer,
    order: persistedOrderReducer, 
    auth: authReducer,
   buyNow: buyNowReducer,
   review: reviewReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
