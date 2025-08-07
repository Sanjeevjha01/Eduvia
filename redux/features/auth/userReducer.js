import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {
    token: null,
    user: null,
    faculty: null,
    admin: null,
    currentUser: null,
    userType: null,
    isAuth: false,
    loading: false,
    message: null,
    error: null,
  },
  (builder) => {
    // handling user login
    builder.addCase("loginRequest", (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase("loginSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuth = true;
      state.token = action.payload.token;
      state.userType = action.payload.userType;

      // Store user data in appropriate field based on type
      const userData =
        action.payload.user || action.payload.faculty || action.payload.admin;
      if (userData) {
        state.currentUser = { ...userData, role: action.payload.userType };

        // Also store in specific field for backward compatibility
        if (action.payload.userType === "admin") {
          state.admin = { ...userData, role: "admin" };
        } else if (action.payload.userType === "faculty") {
          state.faculty = { ...userData, role: "faculty" };
        } else {
          state.user = { ...userData, role: "user" };
        }
      }
    });
    builder.addCase("loginFail", (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.error = action.payload;
      state.token = null;
      state.userType = null;
      state.currentUser = null;
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
      state.isAuth = true;

      const userData = action.payload;
      state.currentUser = userData;

      // Store in appropriate field based on role
      if (userData?.role === "admin") {
        state.admin = userData;
        state.userType = "admin";
      } else if (userData?.role === "faculty") {
        state.faculty = userData;
        state.userType = "faculty";
      } else {
        state.user = userData;
        state.userType = "user";
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
      state.currentUser = null;
      state.userType = null;
      state.token = null;
      state.message = action.payload;
    });
    builder.addCase("logoutFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
);
