import React, { useCallback, useState } from "react";
import { VariantNotification, useAlert, useToggle } from "../../../common";
import { Box, MenuItem, SelectChangeEvent } from "@mui/material";
import SFDropdownComp from "../../../common/components/SFDropdown";
import SFInput from "../../../common/components/SFInput";
import SFButton from "../../../common/components/Button";
import { productApiService } from "../../../infrastructure";

const options: VariantNotification["type"][] = [
  "combination",
  "gallery",
  "photo",
  "price",
];

const init: Pick<VariantNotification, "subject" | "type"> = {
  subject: "",
  type: "price",
};

type Props = {
  onCreate: (notification: VariantNotification) => void;
  variantId: string;
};

const CreateNotification: React.FC<Props> = (props) => {
  const { onCreate, variantId } = props;
  const [body, setBody] =
    useState<Pick<VariantNotification, "subject" | "type">>(init);
  const onChangeSelect = useCallback(
    (e: SelectChangeEvent<string | string[]>) => {
      setBody((prev) => ({
        ...prev,
        type: e.target.value as VariantNotification["type"],
      }));
    },
    []
  );
  const onChangeSubject = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBody((prev) => ({ ...prev, subject: e.target.value }));
    },
    []
  );

  const {
    isOpen: isInProgress,
    open: startProgress,
    close: stopProgress,
  } = useToggle();

  const { error: showError, success: showSuccess } = useAlert();

  const onSave = useCallback(async () => {
    startProgress();

    const { data, success, error } =
      await productApiService.createVariantNotification(
        body as VariantNotification,
        variantId
      );
    if (success) {
      onCreate(data);
      setBody(init);
      showSuccess("Notification sent successfully");
    } else {
      showError(error?.message || "Error sending notification");
    }
    stopProgress();
  }, [
    body,
    onCreate,
    showError,
    showSuccess,
    startProgress,
    stopProgress,
    variantId,
  ]);

  return (
    <Box sx={{ width: "100%", display: "flex", gap: 4, alignItems: "end" }}>
      <SFDropdownComp
        options={options.map((e) => (
          <MenuItem value={e}>{e}</MenuItem>
        ))}
        value={body.type}
        onChange={onChangeSelect}
        label={"Type"}
        placeholder="Select Type"
      />
      <SFInput
        label={"Subject"}
        value={body.subject}
        onChange={onChangeSubject}
        placeholder="Enter Subject"
      />
      <SFButton
        disabled={!body.subject || !body.type || isInProgress}
        onClick={onSave}
      >
        Send
      </SFButton>
    </Box>
  );
};

export default CreateNotification;
