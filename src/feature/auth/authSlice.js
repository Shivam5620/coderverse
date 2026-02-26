import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromStorage || null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.error = null;
      localStorage.setItem("token", action.payload);
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;