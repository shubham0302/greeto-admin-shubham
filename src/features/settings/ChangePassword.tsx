import React, { useCallback, useMemo, useState } from "react";
// import { useAuth, useToggle } from "../../common/hooks";
import { isEmpty } from "lodash";
import ErrorMessage from "../../common/components/ErrorMessage";
import { useAlert, useAuth, useToggle } from "../../common";
import { passwordService } from "../../infrastructure/PasswordService";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import InputBox from "../../common/components/InputBox";
import { Save, Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword = () => {
  const { logoutSubmit } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const { isOpen: isCheckPassword, open: startCheckPassword } = useToggle();

  const { isOpen: showPassword, toggle: toggleShowPassword } = useToggle();
  const { isOpen: showCurrentPassword, toggle: toggleShowCurrentPassword } =
    useToggle();
  const { isOpen: showConfirmPassword, toggle: toggleShowConfirmPassword } =
    useToggle();
  const {
    isOpen: ressetPasswordInProgress,
    open: startProgress,
    close: stopProgress,
  } = useToggle();

  const { isOpen, open, close } = useToggle();

  const { errors, isValid } = useMemo(() => {
    const errors: {
      password?: string;
      confirmPassword?: string;
      currentPassword?: string;
    } = {
      password: null,
      confirmPassword: null,
      currentPassword: null,
    };
    if (isEmpty(currentPassword)) {
      errors.currentPassword = "Cannot be empty!";
    }
    if (isEmpty(password)) {
      errors.password = "Cannot be empty!";
    } else if (password.length < 6) {
      errors.password = "Password should be at least 6 letters";
    }
    if (isEmpty(confirmPassword)) {
      errors.confirmPassword = "Cannot be empty!";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Password should match";
    }
    return {
      errors,
      isValid: Object.values(errors).filter((e) => e).length === 0,
    };
  }, [confirmPassword, currentPassword, password]);

  const { error: showError } = useAlert();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else if (e.target.name === "currentPassword") {
      setCurrentPassword(e.target.value);
    }
  }, []);

  const getErrorComponent = useCallback(
    (key: "password" | "confirmPassword" | "currentPassword") => {
      const err = errors[key];
      if (isCheckPassword && err) {
        return <ErrorMessage>{err}</ErrorMessage>;
      }
      return <></>;
    },
    [errors, isCheckPassword]
  );

  const passwordError = useMemo(
    () => getErrorComponent("password"),
    [getErrorComponent]
  );
  const confirmPasswordError = useMemo(
    () => getErrorComponent("confirmPassword"),
    [getErrorComponent]
  );
  const currentPasswordError = useMemo(
    () => getErrorComponent("currentPassword"),
    [getErrorComponent]
  );

  const onConfirm = useCallback(async () => {
    startProgress();
    const apiResponse = await passwordService.changePassword(
      password,
      currentPassword
    );
    const { success, error } = apiResponse;
    if (success) {
      logoutSubmit(close);
    } else {
      showError(error?.message || "Error in changing password!");
    }
    stopProgress();
  }, [
    close,
    currentPassword,
    logoutSubmit,
    password,
    showError,
    startProgress,
    stopProgress,
  ]);

  const onOpenChange = useCallback(() => {
    startCheckPassword();
    if (isValid) {
      open();
    }
  }, [isValid, open, startCheckPassword]);

  return (
    <Box
      sx={{
        width: "100%",
        p: 4,
        bgcolor: "white",
      }}
    >
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>
          Are you sure you want to change your password?
        </DialogTitle>
        <Divider />
        <DialogContent>
          Make sure to remember new password. You will be logged out!
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={close} variant="outlined">
            Cancel
          </Button>
          <Button
            disabled={ressetPasswordInProgress}
            onClick={onConfirm}
            variant="contained"
            disableElevation
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4">Change Password</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          mt: 4,
        }}
      >
        <InputBox
          label={"Current Password"}
          placeholder="Current Password"
          value={currentPassword}
          name="currentPassword"
          onChange={onChange}
          type={!showCurrentPassword ? "password" : "text"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowCurrentPassword}>
                  {!showCurrentPassword && <Visibility />}
                  {showCurrentPassword && <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        >
          {currentPasswordError}
        </InputBox>
        <InputBox
          label={"Password"}
          placeholder="Password"
          value={password}
          name="password"
          onChange={onChange}
          type={!showPassword ? "password" : "text"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword}>
                  {!showPassword && <Visibility />}
                  {showPassword && <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        >
          {passwordError}
        </InputBox>
        <InputBox
          label={"Confirm Password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={onChange}
          type={!showConfirmPassword ? "password" : "text"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowConfirmPassword}>
                  {!showConfirmPassword && <Visibility />}
                  {showConfirmPassword && <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        >
          {confirmPasswordError}
        </InputBox>
        <Button
          variant="contained"
          disableElevation
          onClick={onOpenChange}
          startIcon={<Save />}
          size="medium"
          sx={{ width: "10%", textTransform: "capitalize", ml: "auto", mt: 4 }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassword;
