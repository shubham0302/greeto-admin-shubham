import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { VariantNotification, useAlert, useToggle } from "../../../common";
import SFButton from "../../../common/components/Button";
import SFInput from "../../../common/components/SFInput";
import { productApiService } from "../../../infrastructure";

type Props = {
  notification: VariantNotification;
  onChangeNotification: (
    notification: VariantNotification,
    index: number
  ) => void;
  index: number;
};

const NotificationTile: React.FC<Props> = (props) => {
  const { index, notification: pNotification, onChangeNotification } = props;

  const [notification, setNotification] = useState(pNotification);

  useEffect(() => {
    setNotification(pNotification);
  }, [pNotification]);

  const onChangeResolve = useCallback((_: any, checked: boolean) => {
    setNotification((prev) => ({ ...prev, isResolvedByAdmin: checked }));
  }, []);

  const {
    isOpen: isSaveProgress,
    open: startProgress,
    close: stopProgress,
  } = useToggle();
  const { success: showSuccess, error: showError } = useAlert();

  const onSave = useCallback(async () => {
    startProgress();
    const apiResponse = await productApiService.saveVariantNotification(
      notification._id,
      notification,
      notification.variantId
    );
    const { data, success } = apiResponse;
    if (success) {
      onChangeNotification(data, index);
      showSuccess("Reply saved successfully!");
    } else {
      showError("Error saving reply!");
    }
    stopProgress();
  }, [
    index,
    notification,
    onChangeNotification,
    showError,
    showSuccess,
    startProgress,
    stopProgress,
  ]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{ width: "100%", display: "flex", gap: 4, alignItems: "center" }}
      >
        <Typography variant="labelXxl">{notification.subject}</Typography>

        <Typography variant="labelXxl" sx={{ ml: "auto" }}>
          {moment(notification.timeStamp).format("DD-MM-yyyy hh:mm a")}
        </Typography>
      </Box>
      <SFInput
        label={"Manufacturer's Reply"}
        placeholder="Enter your reply"
        multiline
        maxRows={8}
        minRows={4}
        value={notification.reply}
        disabled
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          label={"Resolve By Manufacturer"}
          control={<Switch />}
          checked={notification.isResolvedByManufacturer}
          disabled
        />
        <FormControlLabel
          label={"Resolve"}
          control={<Switch />}
          checked={notification.isResolvedByAdmin}
          onChange={onChangeResolve}
        />

        <SFButton onClick={onSave} disabled={isSaveProgress}>
          Save
        </SFButton>
      </Box>
    </Box>
  );
};

export default NotificationTile;
