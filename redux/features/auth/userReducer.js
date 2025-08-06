import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {
    token: null,
    user: null,
    faculty: null,
    admin: null,
    isAuth: false,
    loading: false,
    message: null,
    error: null,
  },
  (builder) => {
    // handling user login
    builder.addCase("loginRequest", (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase("loginSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuth = true;
      state.token = action.payload.token;
    });
    builder.addCase("loginFail", (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.error = action.payload;
    });
    // handling error message
    builder.addCase("clearError", (state) => {
      state.error = null;
    });
    // handling message
    builder.addCase("clearMessage", (state) => {
      state.message = null;
    });
    // handling user data access/get
    builder.addCase("getUserDataRequest", (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase("getUserDataSuccess", (state, action) => {
      state.loading = false;
      state.isAuth = action.payload;

      const userData = action.payload;
      if (userData?.role === "admin") {
        state.admin = userData;
      } else if (userData?.role === "faculty") {
        state.faculty = userData;
      } else {
        state.user = userData;
      }
    });
    builder.addCase("getUserDataFail", (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.error = action.payload;
    });
    // handling logout
    builder.addCase("logoutRequest", (state, action) => {
      state.loading = true;
    });
    builder.addCase("logoutSuccess", (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.user = null;
      state.faculty = null;
      state.admin = null;
      state.token = null;
      state.message = action.payload;
    });
    builder.addCase("logoutFail", (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.error = action.payload;
    });
  }
);
