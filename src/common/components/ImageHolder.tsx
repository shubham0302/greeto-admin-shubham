import { Close, Image, VideoCameraBack } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { Accept, DropzoneOptions, useDropzone } from "react-dropzone";
import { useToggle } from "../hooks";
import { useAlert } from "../alerts";
import { imageApiService } from "../../infrastructure";

type Props = {
  src?: string;
  onRemove: () => void;
  width: string;
  height: string;
  icon?: React.ReactElement;
  needsRemove?: boolean;
  onUpload: (file: string) => void;
  hideIcon?: boolean;
  hideTitle?: boolean;
  hideDesc?: boolean;
  isVideo?: boolean;
};

const ImageHolder: React.FC<Props> = (props) => {
  const {
    src,
    onRemove,
    needsRemove = true,
    width = "",
    height = "",
    icon,
    isVideo,
  } = props;
  const theme = useTheme();
  return src ? (
    <Box
      className="imageLoaderDiv"
      sx={{
        width: width || "180px",
        height: height || "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 1.5,
        bgcolor: "primary.100",
        borderRadius: 1,
        position: "relative",
      }}
    >
      {isVideo && (
        <video
          style={{
            objectFit: "cover",
            objectPosition: "center",
            height: "auto",
            maxHeight: "100%",
            width: "100%",
          }}
          src={src}
          controls
        />
      )}
      {!isVideo && (
        <img
          style={{
            objectFit: "cover",
            objectPosition: "center",
            height: "auto",
            maxHeight: "100%",
            width: "100%",
          }}
          src={src}
          alt="img"
        />
      )}
      {needsRemove && (
        <IconButton
          onClick={onRemove}
          sx={{
            position: "absolute",
            top: "-20px",
            right: "-18px",
            color: alpha(theme.palette.gray.main, 0.6),
            ":hover": {
              color: alpha(theme.palette.gray[100], 1),
            },
          }}
        >
          {icon ? icon : <Close />}
        </IconButton>
      )}
    </Box>
  ) : (
    <ImageUploader {...props} />
  );
};

const ImageUploader: React.FC<Props> = (props) => {
  const {
    onUpload: pOnUpload,
    width,
    height,
    hideDesc = false,
    hideIcon = false,
    hideTitle = false,
    isVideo = false,
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
    if (isVideo) {
      return {
        "video/mp4": [".mp4"],
        "video/mpeg": [".mpeg"],
        "video/webm": [".webm"],
      };
    }
    return {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    };
  }, [isVideo]);

  const options = useMemo<DropzoneOptions>(() => {
    return {
      onDropAccepted: onUpload,
      accept,
    };
  }, [accept, onUpload]);

  const { getInputProps, getRootProps, isDragActive } = useDropzone(options);
  return (
    <Box
      component={"label"}
      htmlFor="upload-photo"
      sx={{
        width: width,
        height: height,
        bgcolor: "gray.50",
        "&:hover": {
          bgcolor: "gray.100",
        },
        borderRadius: 2,
        border: `none`,
        borderColor: "gray.main",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
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
            display: "flex",
            flexDirection: "column",
            gap: 8,
            justifyContent: "center",
            alignItems: "center",
            padding: 12,
            cursor: "pointer",
            width: "100%",
            height: "100%",
          }}
        >
          <input
            accept="image/png, image/gif, image/jpeg"
            {...getInputProps()}
          />
          {!hideIcon &&
            (isVideo ? (
              <VideoCameraBack
                sx={{
                  width: "56px",
                  height: "56px",
                  color: "gray.main",
                }}
              />
            ) : (
              <Image
                sx={{
                  width: "56px",
                  height: "56px",
                  color: "gray.main",
                }}
              />
            ))}
          {!hideTitle && (
            <Typography textAlign={"center"} variant="bodyLr">
              Click here to upload
            </Typography>
          )}
          {!hideDesc && (
            <Typography
              textAlign={"center"}
              color={"gray.main"}
              variant="bodySm"
            >
              JPG, JPEG, PNG are allowed
            </Typography>
          )}
        </div>
      )}
    </Box>
  );
};

export default ImageHolder;
