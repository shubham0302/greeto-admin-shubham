import Icon, { IconProps } from "@mui/material/Icon";
import { FC } from "react";

export type SFIconName =
  | "dashboard"
  | "plus"
  | "stack"
  | "report"
  | "person"
  | "people"
  | "category"
  | "certificate"
  | "message"
  | "setting"
  | "search";

type SFIconProps = IconProps & {
  name: SFIconName;
};

const SFIcon: FC<SFIconProps> = (props) => {
  const { name, ...rest } = props;
  return <Icon {...rest}>{name}</Icon>;
};

export default SFIcon;
