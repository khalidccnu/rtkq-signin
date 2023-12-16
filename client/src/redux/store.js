import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./auth/authSlice.js";
import baseAPI from "./baseAPI.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authSlice"],
};

const rootReducer = combineReducers({
  authSlice,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
