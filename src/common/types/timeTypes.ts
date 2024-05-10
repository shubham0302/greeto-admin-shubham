export type Duration = {
  value: number;
  unit: DurationUnit;
};

export type DurationUnit =
  | "hour"
  | "minute"
  | "sec"
  | "week"
  | "month"
  | "year"
  | "second";
