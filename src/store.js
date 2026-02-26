import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice";
import userReducer from "./feature/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});