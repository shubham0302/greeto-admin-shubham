import { Add, DeleteOutline } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { FinancialInfoModel } from "../../common";
import SFInput from "../../common/components/SFInput";

type Props = {
  financialInfo: FinancialInfoModel[];
  onChange: (financialInfo: FinancialInfoModel[]) => void;
};

const FinancialInfoSetting: React.FC<Props> = (props) => {
  const { onChange, financialInfo } = props;

  const onAddFinancialInfo = useCallback(() => {
    onChange([
      ...financialInfo,
      {
        key: "",
        value: "",
      },
    ]);
  }, [onChange, financialInfo]);

  const onChangeFinancialInfo = useCallback(
    (socialMedia: FinancialInfoModel, index: number) => {
      onChange(financialInfo.map((e, i) => (i === index ? socialMedia : e)));
    },
    [onChange, financialInfo]
  );
  const onDeleteFinancialInfo = useCallback(
    (index: number) => {
      onChange(financialInfo.filter((_, i) => i !== index));
    },
    [onChange, financialInfo]
  );

  const rows = useMemo(
    () =>
      financialInfo.map((socialMedia, index) => {
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeFinancialInfo(
            { ...socialMedia, [e.target.name]: e.target.value },
            index
          );
        const onDelete = () => onDeleteFinancialInfo(index);

        return (
          <Box
            sx={{ width: "100%", display: "flex", gap: 2, alignItems: "start" }}
          >
            <Box sx={{ flex: 1 }}>
              <SFInput
                disabled
                value={socialMedia.key}
                onChange={onChange}
                name="key"
                label={"Label"}
                placeholder="eg. Bank Account No."
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <SFInput
                disabled
                value={socialMedia.value}
                onChange={onChange}
                label={"Value"}
                name="value"
                placeholder="Enter value here."
              />
            </Box>
            <IconButton onClick={onDelete} disabled>
              <DeleteOutline />
            </IconButton>
          </Box>
        );
      }),
    [onChangeFinancialInfo, onDeleteFinancialInfo, financialInfo]
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        my: 2,
      }}
    >
      <Box
        sx={{ width: "100%", display: "flex", alignItems: "center", gap: 4 }}
      >
        <Typography variant="h4">Financial Info</Typography>
        <Button
          startIcon={<Add />}
          disabled
          variant="outlined"
          sx={{ ml: "auto", my: 2 }}
          onClick={onAddFinancialInfo}
        >
          Add
        </Button>
      </Box>
      {rows}
    </Box>
  );
};

export default FinancialInfoSetting;
