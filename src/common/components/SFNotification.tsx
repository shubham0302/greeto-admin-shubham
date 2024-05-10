import { Chat } from "@mui/icons-material";
import { Box, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";

type SFNotificationTypes = {
  Icon?: OverridableComponent<SvgIconTypeMap>;
  title: string;
  description: string;
};

const SFNotification: FC<SFNotificationTypes> = ({ Icon = Chat, ...props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        py: 1.8,
      }}
    >
      <Box
        component={"span"}
        sx={{
          height: 24,
          width: 24,
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.main",
          color: "gray.white",
          borderRadius: "100%",
        }}
      >
        <Icon style={{ width: 20, height: 20 }} />
      </Box>
      <Box>
        <Typography variant="bodyMd" color={"gray.800"}>
          {props.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="bodyMd"
            fontWeight={"400"}
            display={"block"}
            ml={"auto"}
            color={"gray.600"}
          >
            {props.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SFNotification;
