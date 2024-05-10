import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  categoryReducer,
  customizationReducer,
  relationReducer,
} from "./reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customizations: customizationReducer,
    category: categoryReducer,
    relation: relationReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
