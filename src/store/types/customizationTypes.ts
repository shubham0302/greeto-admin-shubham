import { CustomizationConfig } from "../../common";
import { StoreFetchingOrActionStatus } from "./commonStateTypes";

export type CustomizationState = {
  status: StoreFetchingOrActionStatus;
  errorMessage: string;
  customizations: CustomizationConfig[];
};
