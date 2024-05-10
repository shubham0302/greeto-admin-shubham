import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CustomizationState, ErrorState } from "../types";
import { CustomizationConfig } from "../../common";

const initialState: CustomizationState = {
  errorMessage: "",
  status: "initial",
  customizations: [],
};
const reducer = createSlice({
  name: "customization",
  initialState,
  reducers: {
    setResetCustomization: (state) => {
      state.errorMessage = "";
      state.status = "initial";
      state.customizations = [];
    },
    setLoadingCustomizations: (state) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    setErrorCustomizations: (state, action: PayloadAction<ErrorState>) => {
      state.errorMessage = action.payload.message;
      state.status = "error";
    },
    setSuccessCustomizations: (
      state,
      action: PayloadAction<CustomizationConfig[]>
    ) => {
      state.errorMessage = "";
      state.status = "success";
      state.customizations = action.payload;
    },
    addCustomizations: (state, action: PayloadAction<CustomizationConfig>) => {
      const index = state.customizations.findIndex(
        (e) => e._id !== action.payload._id
      );
      if (index !== -1) {
        state.customizations = state.customizations.map((e) =>
          e._id === action.payload._id ? action.payload : e
        );
      } else {
        state.customizations = [...state.customizations, action.payload];
      }
    },
    removeCustomizations: (state, action: PayloadAction<string>) => {
      state.customizations = state.customizations.filter(
        (e) => e._id !== action.payload
      );
    },
  },
});

export const customizationReducer = reducer.reducer;
export const { actions: customizationActions } = reducer;
