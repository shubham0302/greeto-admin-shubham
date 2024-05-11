import { Box } from "@mui/material";
import React from "react";

type Props = {
  title?: string;
  hideProfileVisibility?: boolean;
  cb?: () => void;
};

const AccountSetting: React.FC<Props> = (props) => {
  const { title = "Account Settings" } = props;

  return <Box>{title}</Box>;
};

export default AccountSetting;
