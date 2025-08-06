import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/auth/userReducer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

// api server
export const server = "https://server-4xjy.onrender.com/api/v1";
