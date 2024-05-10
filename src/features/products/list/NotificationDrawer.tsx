import { Close, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import { VariantNotification, useToggle } from "../../../common";
import CreateNotification from "./CreateNotification";
import NotificationTile from "./NotificationTile";

type Props = {
  notifications: VariantNotification[];
  onChangeNotification: (
    notification: VariantNotification,
    index: number
  ) => void;
  onCreate: (notification: VariantNotification) => void;
  variantId: string;
  onClose: () => void;
};

const NotificationDrawer: React.FC<Props> = (props) => {
  const { notifications, onChangeNotification, onClose, onCreate, variantId } =
    props;
  const { isOpen, toggle } = useToggle();
  return (
    <Box
      sx={{
        minWidth: "500px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          p: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="labelXxl">Notifications</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          flex: 1,
          p: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Create Noification</Typography>
            <IconButton onClick={toggle} sx={{ ml: "auto" }}>
              {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Box>
          {isOpen && (
            <CreateNotification onCreate={onCreate} variantId={variantId} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            gap: 4,
          }}
        >
          {notifications.map((np, i) => (
            <NotificationTile
              notification={np}
              index={i}
              onChangeNotification={onChangeNotification}
              key={i}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationDrawer;
