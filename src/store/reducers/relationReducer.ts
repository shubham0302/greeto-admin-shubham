import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorState, RelationState } from "../types";
import { Relation } from "../../common";

const initialState: RelationState = {
  errorMessage: "",
  status: "initial",
  relations: [],
};
const reducer = createSlice({
  name: "relation",
  initialState,
  reducers: {
    setResetRelation: (state) => {
      state.errorMessage = "";
      state.status = "initial";
      state.relations = [];
    },
    setLoadingRelations: (state) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    setSuccessRelations: (state, action: PayloadAction<Relation[]>) => {
      state.errorMessage = "";
      state.status = "success";
      state.relations = action.payload;
    },
    setErrorRelations: (state, action: PayloadAction<ErrorState>) => {
      state.errorMessage = action.payload.message;
      state.status = "error";
    },
  },
});

export const relationReducer = reducer.reducer;
export const { actions: relationActions } = reducer;
