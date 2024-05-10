import { User } from "../../common";
import { StoreFetchingOrActionStatus } from "./commonStateTypes";

export type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  status: StoreFetchingOrActionStatus;
  errorMessage: string;
};
