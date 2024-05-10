import {
  Call,
  EditOutlined,
  Email,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Manufacturer, useAlert, useToggle } from "../../common";
import SFButton from "../../common/components/Button";
import { routeConstants } from "../../common/router/routeConstants";
import { manufacturerApiService } from "../../infrastructure/ManuFacturerApiService";
import ManuFecturerProductsLength from "./MAnuFecturerProductsLength";

type Props = {
  manufacturer: Manufacturer;
  onChange: (manufacturer: Manufacturer) => void;
  // onDelete: (manufacturerId: string) => void;
  index: number;
};

const ManuFacturerRow: React.FC<Props> = (props) => {
  const { manufacturer, onChange, index } = props;
  const [isVerified, setIsVerified] = useState(manufacturer.isVerified);
  useEffect(() => {
    setIsVerified(manufacturer.isVerified);
  }, [manufacturer.isVerified]);

  const onToggle = useCallback((_: any, c: boolean) => {
    setIsVerified(c);
  }, []);

  const { isOpen, close, open } = useToggle();
  const {
    isOpen: isInProgress,
    close: stopProgress,
    open: startProgress,
  } = useToggle();
  const { error: showError, success: showSuccess } = useAlert();

  const onSave = useCallback(async () => {
    startProgress();
    const { data, success, error } =
      await manufacturerApiService.verifyManufacturer(
        isVerified,
        manufacturer._id
      );
    if (success) {
      showSuccess("Saved information successfully");
      onChange(data);
      close();
    } else {
      showError(error?.message || "Error verifying manufacturer");
    }
    stopProgress();
  }, [
    close,
    isVerified,
    manufacturer._id,
    onChange,
    showError,
    showSuccess,
    startProgress,
    stopProgress,
  ]);

  return (
    <TableRow>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Verify/Block Manufacturer</DialogTitle>
        <Divider />
        <DialogContent>
          <FormControlLabel
            control={<Switch />}
            label={"Verify"}
            checked={isVerified}
            onChange={onToggle}
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
          <SFButton onClick={onSave} disabled={isInProgress}>
            Save
          </SFButton>
        </DialogActions>
      </Dialog>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        {manufacturer.companyName} (
        {manufacturer.isVerified ? "Verified" : "Not Verified"})
      </TableCell>
      <TableCell>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Call /> +91-{manufacturer.phoneNumber}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Email /> {manufacturer.email}
          </Box>
        </Box>
      </TableCell>
      {/* <TableCell> */}
      <ManuFecturerProductsLength manufacturerId={manufacturer._id} />
      {/* </TableCell> */}
      <TableCell>
        <Link
          to={`${routeConstants.manufacturerDetails.replace(
            ":manufacturerId",
            manufacturer._id
          )}`}
        >
          <IconButton>
            <VisibilityOutlined />
          </IconButton>
        </Link>
        <IconButton onClick={open}>
          <EditOutlined />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ManuFacturerRow;
