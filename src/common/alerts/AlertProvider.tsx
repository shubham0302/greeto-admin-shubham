import { Check, Error, Info, Warning } from "@mui/icons-material";
import { Alert, Box, Snackbar, SnackbarOrigin } from "@mui/material";
import { FC, createContext, useCallback, useContext, useState } from "react";
import { useToggle } from "../hooks";

export type AlertContextOptions = {
  isError?: boolean;
  isSuccess?: boolean;
  errorMessage?: string;
  successMessage?: string;
  success: (msg: string, options?: AlertOptions) => void;
  error: (msg: string, options?: AlertOptions) => void;
  info: (msg: string, options?: AlertOptions) => void;
  warn: (msg: string, options?: AlertOptions) => void;
};

const anchorOrigin: SnackbarOrigin = {
  horizontal: "right",
  vertical: "bottom",
};

export type AlertOptions = {
  timeOut?: number;
};

const AlertContext = createContext<AlertContextOptions>(null);

export const AlertProvider: FC<any> = ({ children }) => {
  const {
    isOpen: isSuccess,
    open: setSuccessTrue,
    close: setSuccessFalse,
  } = useToggle();
  const {
    isOpen: isInfo,
    open: setInfoTrue,
    close: setInfoFalse,
  } = useToggle();
  const {
    isOpen: isWarn,
    open: setWarnTrue,
    close: setWarnFalse,
  } = useToggle();
  const {
    isOpen: isError,
    open: setErrorTrue,
    close: setErrorFalse,
  } = useToggle();

  const [sMsg, setSMsg] = useState("");
  const [eMsg, setEMsg] = useState("");
  const [iMsg, setIMsg] = useState("");
  const [wMsg, setWMsg] = useState("");

  const success: AlertContextOptions["success"] = useCallback(
    (msg) => {
      setSuccessTrue();
      setSMsg(msg);
    },
    [setSuccessTrue]
  );

  const error: AlertContextOptions["error"] = useCallback(
    (msg) => {
      setErrorTrue();
      setEMsg(msg);

      //   setTimeout(
      //     () => {
      //       setErrorFalse();
      //       setEMsg("");
      //     },
      //     isNil(timeOut) ? timeOut : 3000
      //   );
    },
    [setErrorTrue]
  );

  const info: AlertContextOptions["info"] = useCallback(
    (msg) => {
      setInfoTrue();
      setIMsg(msg);
    },
    [setInfoTrue]
  );

  const warn: AlertContextOptions["warn"] = useCallback(
    (msg) => {
      setWarnTrue();
      setWMsg(msg);
    },
    [setWarnTrue]
  );

  const onCloseWarn = useCallback(() => {
    setWarnFalse();
    setWMsg("");
  }, [setWarnFalse]);
  const onCloseInfo = useCallback(() => {
    setInfoFalse();
    setIMsg("");
  }, [setInfoFalse]);
  const onCloseError = useCallback(() => {
    setErrorFalse();
    setEMsg("");
  }, [setErrorFalse]);
  const onCloseSuccess = useCallback(() => {
    setSuccessFalse();
    setSMsg("");
  }, [setSuccessFalse]);

  return (
    <AlertContext.Provider
      value={{
        error,
        success,
        info,
        warn,
      }}
    >
      <Box>
        {/* INFO */}
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={isInfo}
          autoHideDuration={3000}
          onClose={onCloseInfo}
        >
          <Alert
            onClose={onCloseInfo}
            severity="info"
            variant="standard"
            icon={<Info />}
          >
            {iMsg}
          </Alert>
        </Snackbar>
        {/* SUCCESS */}
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={isSuccess}
          autoHideDuration={3000}
          onClose={onCloseSuccess}
        >
          <Alert
            onClose={onCloseSuccess}
            severity="success"
            variant="standard"
            icon={<Check />}
          >
            {sMsg}
          </Alert>
        </Snackbar>
        {/* WARNING */}
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={isWarn}
          autoHideDuration={3000}
          onClose={onCloseWarn}
        >
          <Alert
            onClose={onCloseWarn}
            severity="warning"
            variant="standard"
            icon={<Warning />}
          >
            {wMsg}
          </Alert>
        </Snackbar>
        {/* ERROR */}
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={isError}
          autoHideDuration={3000}
          onClose={onCloseError}
        >
          <Alert
            onClose={onCloseError}
            severity="error"
            variant="standard"
            icon={<Error />}
          >
            {eMsg}
          </Alert>
        </Snackbar>
        {/* </Slide> */}
      </Box>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const { error, info, success, warn } = useContext(AlertContext);

  return {
    error,
    info,
    success,
    warn,
  };
};
