import { Close, Upload, UploadFile } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { uniq } from "lodash";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Accept, DropzoneOptions, useDropzone } from "react-dropzone";
import { MediaProps, useAlert, useToggle } from "..";
import { imageApiService } from "../../infrastructure";
import { useFetchMedia } from "../hooks/useFetchMedia";
import SFButton from "./Button";

const MediaUploader: FC<MediaProps> = (props) => {
  const {
    src,
    height = "180px",
    width = "180px",
    type,
    showType = "box",
    onRemove,
    noImageDescription,
    noImageIcon: Icon = UploadFile,
    noImageTitle,
    hideRemove = false,
    readOnly = false,
  } = props;

  const { isOpen, close, open } = useToggle();

  if (showType == "button") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width,
        }}
      >
        {isOpen && (
          <FilUploadDialog {...props} isOpen={isOpen} onClose={close} />
        )}
        <SFButton
          onClick={readOnly ? null : open}
          fullWidth
          startIcon={<UploadFile />}
          size="large"
        >
          {src
            ? `Update ${type === "text" ? `File` : type}`
            : `Add ${type === "text" ? `File` : type}`}
        </SFButton>
        {!!src && !hideRemove && (
          <Tooltip title={`Remove ${type === "text" ? `File` : type}`}>
            <IconButton onClick={onRemove}>
              <Close />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width,
        height,
        minHeight: height,
        position: "relative",
        bgcolor: "gray.100",
        "&:hover": {
          bgcolor: "gray.200",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isOpen && <FilUploadDialog {...props} isOpen={isOpen} onClose={close} />}

      {!!src && !hideRemove && (
        <Box
          sx={{
            position: "absolute",
            top: 2,
            right: 2,
            zIndex: 2,
            bgcolor: "gray.50",
            opacity: 0.5,
          }}
        >
          <IconButton onClick={onRemove}>
            <Close />
          </IconButton>
        </Box>
      )}
      {src && (
        <>
          {type === "image" ? (
            <img
              src={src}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : type === "video" ? (
            <video
              src={src}
              controls
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Typography
              width={"100%"}
              textAlign={"center"}
              sx={{
                whiteSpace: "pre-wrap",
                overflow: "hidden",
              }}
            >
              {src}
            </Typography>
          )}
        </>
      )}
      {!src && (
        <div
          onClick={readOnly ? null : open}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icon
            sx={{
              width: "56px",
              height: "56px",
              color: "gray.main",
            }}
          />
          {noImageTitle && (
            <Typography textAlign={"center"} variant="bodyLr">
              {noImageTitle}
            </Typography>
          )}
          {noImageDescription && (
            <Typography
              textAlign={"center"}
              color={"gray.main"}
              variant="bodySm"
            >
              {noImageDescription}
            </Typography>
          )}
        </div>
      )}
    </Box>
  );
};

type DialogProps = MediaProps & {
  isOpen: boolean;
  onClose: () => void;
};

const FilUploadDialog: FC<DialogProps> = (props) => {
  const { isOpen, onClose, ...restProps } = props;

  const { src: pSrc, onUpload, type = "file" } = restProps;

  const [src, setSrc] = useState<string>(pSrc);

  const { data, error, isError, isFetching } = useFetchMedia(type);

  const defSrcList = useMemo<string[]>(() => {
    if (pSrc) {
      return uniq([...data, pSrc]);
    } else {
      return uniq(data);
    }
  }, [data, pSrc]);

  const [srcList, setSrcList] = useState<string[]>(defSrcList);

  useEffect(() => {
    setSrcList(defSrcList);
  }, [defSrcList]);

  const {
    isOpen: isFromLibrary,
    open: setFromLibrary,
    close: setFromComputer,
  } = useToggle(true);

  const onSave = useCallback(() => {
    onUpload(src);
    onClose();
  }, [onClose, onUpload, src]);

  const onUploadFromComputer = useCallback(
    (src: string) => {
      setSrc(src);
      setSrcList((prev) => [src, ...prev]);
      setFromLibrary();
    },
    [setFromLibrary]
  );

  const galleryJsx = useMemo(() => {
    if (isFetching) {
      return <CircularProgress />;
    }
    if (isError) {
      return <Typography>{error}</Typography>;
    }
    if (type === "image") {
      return (
        <Grid container spacing={2}>
          {srcList.map((url, i) => (
            <Grid key={i} xs={3} item>
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: 1,
                  p: 1,
                  bgcolor: "gray.50",
                  borderWidth: 3,
                  borderStyle: "solid",
                  borderColor: src.includes(url) ? "primary.main" : "gray.50",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSrc(url);
                }}
              >
                <Box sx={{ width: "100%", height: "100%" }}>
                  <img
                    src={url}
                    alt={url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      );
    } else if (type === "video") {
      return (
        <Grid container spacing={2}>
          {srcList.map((url, i) => (
            <Grid key={i} xs={4} item>
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: 1,
                  bgcolor: "gray.50",
                  borderWidth: 3,
                  p: 1,
                  borderStyle: "solid",
                  borderColor: src.includes(url) ? "primary.main" : "gray.50",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setSrc(url);
                }}
              >
                <video
                  src={url}
                  controls
                  style={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      );
    }
    return (
      <Grid container spacing={2}>
        {srcList.map((url, i) => (
          <Grid key={i} xs={12} item>
            <Box
              sx={{
                width: "100%",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: src.includes(url) ? "primary.main" : "transparent",
                cursor: "pointer",
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
              onClick={() => {
                setSrc(url);
              }}
            >
              <Box
                sx={{
                  width: "100px",
                  height: "100px",
                  bgcolor: "gray.50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Upload />
              </Box>
              <Typography>{url}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }, [error, isError, isFetching, src, srcList, type]);

  const uploaderProps = useMemo<MediaProps>(() => {
    return {
      ...restProps,
      onUpload: onUploadFromComputer,
    };
  }, [onUploadFromComputer, restProps]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Upload File</DialogTitle>
      <Divider />
      <DialogContent>
        <Tabs
          value={isFromLibrary ? "library" : "computer"}
          onChange={(_, v) =>
            v === "computer" ? setFromComputer() : setFromLibrary()
          }
        >
          <Tab value={"library"} label={"Choose From Library"} />
          <Tab value={"computer"} label={"Upload From Computer"} />
        </Tabs>
        {isFromLibrary && <Box sx={{ width: "100%", p: 4 }}>{galleryJsx}</Box>}
        {!isFromLibrary && <FileUploader {...uploaderProps} />}
      </DialogContent>
      <Divider />
      <DialogActions>
        <SFButton sfColor="sp" onClick={onClose}>
          Cancel
        </SFButton>
        <SFButton onClick={onSave} disabled={!src}>
          Save
        </SFButton>
      </DialogActions>
    </Dialog>
  );
};

const FileUploader: FC<MediaProps> = (props) => {
  const {
    onUpload: pOnUpload,
    noImageDescription,
    noImageTitle,
    noImageIcon: Icon = UploadFile,
    type = "file",
  } = props;

  const {
    isOpen: isUploadProgress,
    open: startProgress,
    close: stopProgress,
  } = useToggle();

  const { error: showError, success: showSuccess } = useAlert();

  const onUpload = useCallback(
    async (files: File[]) => {
      try {
        startProgress();
        const file = files?.[0];
        if (file) {
          const apiResponse = await imageApiService.uploadImage(file);
          const { data, success, error } = apiResponse;
          if (success) {
            pOnUpload(data.url);
            showSuccess("Image uploaded successfully");
          } else {
            showError(error?.message || "Error in image uploading!");
          }
        }
      } catch (error) {
        showError("Error in image uploading!");
      } finally {
        stopProgress();
      }
    },
    [pOnUpload, showError, showSuccess, startProgress, stopProgress]
  );

  const accept = useMemo<Accept>(() => {
    if (type === "video") {
      return {
        "video/mp4": [".mp4"],
        "video/mpeg": [".mpeg"],
        "video/webm": [".webm"],
      };
    } else if (type === "image") {
      return {
        "image/jpg": [],
        "image/jpeg": [],
        "image/png": [],
      };
    } else if (type === "text") {
      return {
        "application/pdf": [],
        "text/plain": [],
        "application/msword": [],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [],
      };
    }
    return { "*": [] };
  }, [type]);

  const options = useMemo<DropzoneOptions>(() => {
    return {
      onDropAccepted: onUpload,
      accept,
    };
  }, [accept, onUpload]);

  const { getInputProps, getRootProps, isDragActive } = useDropzone(options);

  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
        height: "100%",
        bgcolor: "gray.100",
        "&:hover": {
          bgcolor: "gray.200",
        },
      }}
    >
      {isUploadProgress && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {!isUploadProgress && (
        <div
          {...getRootProps({ isDragActive })}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          <Icon
            sx={{
              width: "56px",
              height: "56px",
              color: "gray.main",
            }}
          />
          {noImageTitle && (
            <Typography textAlign={"center"} variant="bodyLr">
              {noImageTitle}
            </Typography>
          )}
          {noImageDescription && (
            <Typography
              textAlign={"center"}
              color={"gray.main"}
              variant="bodySm"
            >
              {noImageDescription}
            </Typography>
          )}
        </div>
      )}
    </Box>
  );
};

export default MediaUploader;
