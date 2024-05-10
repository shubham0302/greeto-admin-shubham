import {
  Category,
  PlayCircleOutlineOutlined,
  Public,
  School,
} from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { DashboardType } from "../../features/home/types";

export type DashboardCardDataTypes = {
  title: string | number;
  label: keyof DashboardType;
  description: string | number;
  cardColor: "primary" | "secondary" | "error" | "warning" | "success" | "gray";
  icon: OverridableComponent<SvgIconTypeMap>;
};

export const dashboardData: DashboardCardDataTypes[] = [
  {
    icon: PlayCircleOutlineOutlined,
    title: 957,
    description: "Total Courses",
    cardColor: "primary",
    label: "courses",
  },
  {
    icon: School,
    title: 41,
    description: "Paid Students",
    cardColor: "error",
    label: "students",
  },
  {
    icon: Category,
    title: 12,
    description: "Categories",
    cardColor: "success",
    label: "categories",
  },
  {
    icon: Public,
    title: 28,
    description: "Centres",
    cardColor: "warning",
    label: "centers",
  },
];
