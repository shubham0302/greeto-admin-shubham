import React, { FC, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "../../common/router/routeConstants";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import AppLogo from "../../common/components/AppLogo";
import { isEmpty } from "lodash";
import { User, useAlert, useToggle } from "../../common";
import { passwordService } from "../../infrastructure/PasswordService";

const ChangePasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const {
    isOpen: isFetchingUserList,
    open: startFetchingUsers,
    close: stopFetchingUsers,
  } = useToggle();
  const { isOpen: isCheckEmail, open: startCheckEmail } = useToggle();
  const {
    isOpen: emailSentInProgress,
    open: startProgress,
    close: stopProgress,
  } = useToggle();
  const { errors, isValid } = useMemo(() => {
    const errors: {
      email?: string;
    } = {
      email: null,
    };
    if (isEmpty(email)) {
      errors.email = "Cannot be empty!";
    }
    return {
      errors,
      isValid: Object.values(errors).filter((e) => e).length === 0,
    };
  }, [email]);

  const { error: showError } = useAlert();

  const fetchUsers = useCallback(async () => {
    startCheckEmail();
    if (isValid) {
      startFetchingUsers();
      setUsers([]);
      const data = await passwordService.checkAccountRequest(email);
      const { success, data: users, error: userError } = data;
      if (success && users.length) {
        setUsers(users);
      } else {
        showError(userError?.message || "User not found!");
      }
      stopFetchingUsers();
    }
  }, [
    email,
    isValid,
    showError,
    startCheckEmail,
    startFetchingUsers,
    stopFetchingUsers,
  ]);

  const nav = useNavigate();

  const sendEmail = useCallback(
    async (id: string) => {
      startProgress();
      const data = await passwordService.sendEmail(id);
      const { success, error: userError } = data;
      if (success) {
        nav(routeConstants.emailSent, { replace: true });
      } else {
        showError(userError?.message || "Could not sent email!");
      }
      stopProgress();
    },
    [nav, showError, startProgress, stopProgress]
  );

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const getErrorComponent = useCallback(
    (key: "email") => {
      const err = errors[key];
      if (isCheckEmail && err) {
        return (
          <Typography variant="bodyTn" color={"error.main"}>
            {err}
          </Typography>
        );
      }
      return <></>;
    },
    [errors, isCheckEmail]
  );

  const emailError = useMemo(
    () => getErrorComponent("email"),
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
          width: "100%",
          flexDirection: "row-reverse",
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
              Check your account here
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Typography mb={1}>Email</Typography>
              <TextField
                fullWidth
                placeholder="Enter your email address"
                value={email}
                onChange={onChangeEmail}
              />
              {emailError}
            </Box>
            <Button
              variant="contained"
              onClick={fetchUsers}
              disabled={isFetchingUserList}
              disableElevation
              endIcon={<ArrowRightAltOutlined />}
              size="medium"
              sx={{ width: "30%", textTransform: "capitalize" }}
            >
              Submit
            </Button>
            {isFetchingUserList && (
              <CircularProgress title="Fetching Account details" />
            )}
            {!isFetchingUserList && (
              <>
                {Boolean(users.length) && (
                  <>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Divider sx={{ flex: 1 }} />
                      <Typography variant="labelLr" color={"gray.main"}>
                        Your Accounts
                      </Typography>
                      <Divider sx={{ flex: 1 }} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: "100%",
                      }}
                    >
                      {users.map((user, idx) => (
                        <AccountCard
                          user={user}
                          isEmailSendInProgress={emailSentInProgress}
                          onSendEmail={sendEmail}
                          key={idx}
                        />
                      ))}
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

type Props = {
  user: User;
  onSendEmail: (id: string) => void;
  isEmailSendInProgress: boolean;
};

const AccountCard: FC<Props> = (props) => {
  const { user, isEmailSendInProgress, onSendEmail } = props;

  const onClick = useCallback(() => {
    onSendEmail(user._id);
  }, [onSendEmail, user._id]);

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <Typography>{user?.companyName?.charAt(0) || ""}</Typography>
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography variant="labelLr" sx={{ display: "block" }}>
          {user?.companyName}
        </Typography>
        {/* <Typography variant="bodySm">{user?.role}</Typography> */}
      </ListItemText>
      {/* <ListItemButton> */}
      <Button
        variant="outlined"
        onClick={onClick}
        disabled={isEmailSendInProgress}
      >
        Send Email
      </Button>
      {/* </ListItemButton> */}
    </ListItem>
  );
};

export default ChangePasswordRequest;
