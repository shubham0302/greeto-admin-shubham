import { ExitToApp } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAuth, useToggle } from "..";
import { routeHandler } from "../router/routeHendler";
import SFButton from "./Button";
import AppLogo from "./AppLogo";

const Header = () => {
  const { pathname } = useLocation();
  const { user, logoutSubmit } = useAuth();
  const pageName = useMemo(() => {
    const match = routeHandler.getRouteByMatch(pathname);
    if (match) {
      return match?.options?.name;
    }
    return "Saksham Admin";
  }, [pathname]);

  const { isOpen, open, close } = useToggle();

  const onSave = useCallback(() => {
    logoutSubmit(close);
  }, [close, logoutSubmit]);
  return (
    <Box
      bgcolor={"white"}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        p: 2,
      }}
    >
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>Are you sure you want to Logout?</DialogTitle>
        <Divider />
        <DialogContent>
          Make sure to remember your credentials. Personalizations will be
          removed from the session.
        </DialogContent>
        <Divider />
        <DialogActions>
          <SFButton sfColor="sp" onClick={close} variant="outlined">
            Cancel
          </SFButton>
          <SFButton
            onClick={onSave}
            variant="contained"
            endIcon={<ExitToApp />}
          >
            Logout
          </SFButton>
        </DialogActions>
      </Dialog>
      <AppLogo />
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            width: "80%",
            mx: "auto",
            px: 4,
            pr: 0,
            borderLeft: "2px solid black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="labelXxl">{pageName}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>{user?.companyName}</Typography>
            <IconButton onClick={open}>
              <ExitToApp />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
