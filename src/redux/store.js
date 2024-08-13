import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./admin/slices/authSlice";
import apiSlice from "../api/apiSlice";

// imports................................................................................................................................

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        authSlice: authSlice
    },
    middleware: (getDefaultMiddleware) => {
        const allMiddleware = [
            apiSlice.middleware,
        ];
        return getDefaultMiddleware({ serializableCheck: false }).concat(...allMiddleware)
    }
})

export default store 