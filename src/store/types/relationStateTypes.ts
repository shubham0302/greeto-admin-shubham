import { Relation } from "../../common";
import { StoreFetchingOrActionStatus } from "./commonStateTypes";

export type RelationState = {
  relations: Relation[];
  status: StoreFetchingOrActionStatus;
  errorMessage: string;
};
