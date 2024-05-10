import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryState, ErrorState } from "../types";
import { Category } from "../../common";

const initialState: CategoryState = {
  errorMessage: "",
  status: "initial",
  categories: [],
};
const reducer = createSlice({
  name: "category",
  initialState,
  reducers: {
    setResetCategory: (state) => {
      state.errorMessage = "";
      state.status = "initial";
      state.categories = [];
    },
    setLoadingCategories: (state) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    setSuccessCategories: (state, action: PayloadAction<Category[]>) => {
      state.errorMessage = "";
      state.status = "success";
      state.categories = action.payload;
    },
    setErrorCategories: (state, action: PayloadAction<ErrorState>) => {
      state.errorMessage = action.payload.message;
      state.status = "error";
    },
  },
});

export const categoryReducer = reducer.reducer;
export const { actions: categoryActions } = reducer;
