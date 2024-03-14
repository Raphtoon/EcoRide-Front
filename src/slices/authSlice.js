// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  loading: false,
  errorLog: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.user = null;
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    unsetLoader: (state) => {
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, unsetLoader } =
  authSlice.actions;

export default authSlice.reducer;
