import { Category } from "../../common";
import { StoreFetchingOrActionStatus } from "./commonStateTypes";

export type CategoryState = {
  categories: Category[];
  status: StoreFetchingOrActionStatus;
  errorMessage: string;
};
