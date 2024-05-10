import { Error, NotificationsOutlined } from "@mui/icons-material";
import { Badge, CircularProgress, Drawer, IconButton } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchVariantNotificationList } from "../hooks";
import { VariantNotification, useToggle } from "../../../common";
import NotificationDrawer from "./NotificationDrawer";

type Props = {
  variantId: string;
};

const VariantNotificationTile: React.FC<Props> = (props) => {
  const { variantId } = props;
  const { data, isFetching, isError } =
    useFetchVariantNotificationList(variantId);

  const [notifications, setNotifications] = useState(data);
  const severity = useMemo(() => getSeverity(notifications), [notifications]);

  useEffect(() => {
    setNotifications(data);
  }, [data]);

  const onChange = useCallback((data: VariantNotification, ind: number) => {
    setNotifications((prev) => prev.map((e, i) => (i === ind ? data : e)));
  }, []);
  const onCreate = useCallback((data: VariantNotification) => {
    setNotifications((prev) => [...prev, data]);
  }, []);

  const { isOpen, open, close } = useToggle();

  if (isFetching) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Drawer open={isOpen} anchor="right" onClose={close}>
        {isOpen && (
          <NotificationDrawer
            onClose={close}
            onChangeNotification={onChange}
            notifications={notifications}
            onCreate={onCreate}
            variantId={variantId}
          />
        )}
      </Drawer>
      <IconButton onClick={open}>
        <Badge
          badgeContent={data.length}
          color={
            severity === "crucial"
              ? "error"
              : severity === "moderate"
              ? "warning"
              : severity === "low"
              ? "info"
              : "default"
          }
        >
          <NotificationsOutlined
            color={
              severity === "crucial"
                ? "error"
                : severity === "moderate"
                ? "warning"
                : severity === "low"
                ? "info"
                : "inherit"
            }
          />
        </Badge>
      </IconButton>
    </>
  );
};

type Severity = "crucial" | "moderate" | "low" | "zero";

const getSeverity = (notifications: VariantNotification[]): Severity => {
  const nNotification = notifications.filter(
    (e) => e.subject && !e.isResolvedByManufacturer && !e.isResolvedByAdmin
  );
  if (nNotification.length) {
    return "crucial";
  }
  const nmNotification = notifications.filter(
    (e) => e.subject && e.isResolvedByManufacturer && !e.isResolvedByAdmin
  );
  if (nmNotification.length) {
    return "moderate";
  }
  const npNotification = notifications.filter((e) => e.subject && !e.reply);
  if (npNotification.length) {
    return "low";
  }
  return "zero";
};

export default VariantNotificationTile;
