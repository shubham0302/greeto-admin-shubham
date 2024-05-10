import React, { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routeConstants } from "../../common/router/routeConstants";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
// import { useToggle } from "../../common/hooks";
import {
  ArrowRightAltOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import AppLogo from "../../common/components/AppLogo";
import { isEmpty } from "lodash";
import { useAlert, useToggle } from "../../common";
import { passwordService } from "../../infrastructure/PasswordService";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isOpen: isCheckPassword, open: startCheckPassword } = useToggle();
  const [getParams] = useSearchParams();
  const { hashToken } = useMemo(() => {
    const hashToken = getParams.get("hashToken");
    return {
      hashToken,
    };
  }, [getParams]);

  const {
    isOpen: ressetPasswordInProgress,
    open: startProgress,
    close: stopProgress,
  } = useToggle();

  const { isOpen: showPassword, toggle: toggleShowPassword } = useToggle();
  const { isOpen: showConfirmPassword, toggle: toggleShowConfirmPassword } =
    useToggle();

  const { errors, isValid } = useMemo(() => {
    const errors: {
      password?: string;
      confirmPassword?: string;
    } = {
      password: null,
      confirmPassword: null,
    };
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
  }, [confirmPassword, password]);

  const { error: showError } = useAlert();

  const nav = useNavigate();
  const fetchUsers = useCallback(async () => {
    startCheckPassword();
    if (isValid) {
      startProgress();
      const data = await passwordService.resetPassword(hashToken, password);
      const { success, data: users, error: userError } = data;
      if (success && users.length) {
        nav(routeConstants.changedPassword);
      } else {
        showError(userError?.message || "User not found!");
      }
      stopProgress();
    }
  }, [
    hashToken,
    isValid,
    nav,
    password,
    showError,
    startCheckPassword,
    startProgress,
    stopProgress,
  ]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  }, []);

  const getErrorComponent = useCallback(
    (key: "password" | "confirmPassword") => {
      const err = errors[key];
      if (isCheckPassword && err) {
        return (
          <Typography variant="bodyTn" color={"error.main"}>
            {err}
          </Typography>
        );
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

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          py: 2,
          borderBottomWidth: "1px",
          borderBottomColor: "gray.100",
          borderBottomStyle: "solid",
        }}
      >
        <Box
          sx={{
            width: "80%",
            display: "flex",
            mx: "auto",
          }}
        >
          <AppLogo />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row-reverse",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "55%",
            height: "100%",
            bgcolor: "gray.100",
          }}
        >
          <img
            src="/LoginPage.jpg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {hashToken && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "70%",
                gap: 2,
                alignItems: "flex-end",
              }}
            >
              <Typography
                variant="h3"
                textAlign={"center"}
                sx={{ width: "100%", mb: 4 }}
              >
                Reset your password here
              </Typography>
              <Box sx={{ width: "100%" }}>
                <Typography mb={1}>Password</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter password"
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
                />
                {passwordError}
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography mb={1}>Confirm Password</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter confirm password"
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
                />
                {confirmPasswordError}
              </Box>
              <Button
                variant="contained"
                onClick={fetchUsers}
                disabled={ressetPasswordInProgress}
                disableElevation
                endIcon={<ArrowRightAltOutlined />}
                size="medium"
                sx={{ width: "30%", textTransform: "capitalize" }}
              >
                Submit
              </Button>
            </Box>
          )}
          {!hashToken && (
            <Typography variant="h3" textAlign={"center"}>
              Oops! Authentication is required for this link!
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default PasswordReset;
