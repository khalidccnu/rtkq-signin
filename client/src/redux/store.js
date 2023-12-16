import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice.js";
import baseAPI from "./baseAPI.js";

const store = configureStore({
  reducer: {
    authSlice,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export default store;
