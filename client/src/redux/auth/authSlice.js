import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      Cookies.remove("token");
      state.user = null;
    },
  },
});

export const { setUser, signOut } = authSlice.actions;
export default authSlice.reducer;
