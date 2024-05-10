import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, ErrorState } from "../types";
import { User } from "../../common";

export const initialStateAuth: AuthState = {
  isLoggedIn: false,
  status: "initial",
  user: null,
  errorMessage: "",
};

const reducer = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {
    setFetchingUser: (state) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    setErrorUser: (state, action: PayloadAction<ErrorState>) => {
      const { message } = action.payload;
      state.errorMessage = message;
      state.status = "error";
      state.isLoggedIn = false;
      state.user = null;
    },
    setSuccessUser: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.errorMessage = "";
      state.user = action.payload;
      state.status = "success";
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const authReducer = reducer.reducer;
export const authActions = reducer.actions;
