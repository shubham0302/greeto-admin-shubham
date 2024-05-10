import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Manufacturer,
  // UserError,
  getEmailError,
  getPhoneError,
  noOp,
  useAlert,
  useFetchManuFacturerDetails,
  useToggle,
} from "../../common";
import ErrorMessage from "../../common/components/ErrorMessage";
import InputBox from "../../common/components/InputBox";
import MediaUploader from "../../common/components/MediaUploader";
import { manufacturerApiService } from "../../infrastructure/ManuFacturerApiService";
import SocialMediaSetting from "../settings/SocialMediaSetting";
import PersonsSetting from "../settings/PersonSetting";
import FinancialInfoSetting from "../settings/FinancialInfoSetting";

type Props = {
  id: string;
  title?: string;
  hideProfileVisibility?: boolean;
  cb?: () => void;
};

const ProfileManuFacturerPage: React.FC<Props> = (props) => {
  const { title = "Basic Info", hideProfileVisibility, cb, id } = props;
  const {
    data: dUser,
    isFetching,
    isError,
    errorMessage,
  } = useFetchManuFacturerDetails(id);
  const { error: showError, success: showSuccess } = useAlert();
  const [changeProfileRequest, setChangeProfileRequest] =
    useState<Partial<Manufacturer>>(dUser);

  useEffect(() => {
    if (dUser) {
      setChangeProfileRequest(dUser);
    }
  }, [dUser]);

  const { error, isValid } = useMemo(() => {
    const error: any = {
      address: null,
      email: null,
      phoneNumber: null,
      companyName: null,
      legalStructure: null,
      gstCertificate: null,
      gstNumber: null,
    };
    if (isEmpty(changeProfileRequest?.gstCertificate)) {
      error.gstCertificate = "Cannot be empty!";
    }
    if (isEmpty(changeProfileRequest?.gstNumber)) {
      error.gstNumber = "Cannot be empty!";
    }
    if (isEmpty(changeProfileRequest?.legalStructure)) {
      error.legalStructure = "Cannot be empty!";
    }
    if (isEmpty(changeProfileRequest?.legalStructure)) {
      error.legalStructure = "Cannot be empty!";
    }
    if (isEmpty(changeProfileRequest?.address)) {
      error.address = "Cannot be empty!";
    }
    if (isEmpty(changeProfileRequest?.companyName)) {
      error.companyName = "Cannot be empty!";
    }
    const emailError = getEmailError(changeProfileRequest?.email);
    if (emailError) {
      error.email = emailError;
    }
    const phoneError = getPhoneError(changeProfileRequest?.phoneNumber);
    if (phoneError) {
      error.phoneNumber = phoneError;
    }
    const isValid = Object.values(error).filter((e) => e).length <= 0;
    return {
      error,
      isValid,
    };
  }, [changeProfileRequest]);

  const { isOpen: isCheckProfile, open: checkProfile } = useToggle();
  const {
    isOpen: isProfileInProgress,
    open: startProgress,
    close: stopProgress,
  } = useToggle();

  const getErrorComponent = useCallback(
    (key: any) => {
      const err = error[key];
      if (isCheckProfile && err) {
        return <ErrorMessage>{err}</ErrorMessage>;
      }
      return <></>;
    },
    [error, isCheckProfile]
  );

  const companyNameError = useMemo(
    () => getErrorComponent("companyName"),
    [getErrorComponent]
  );
  const emailError = useMemo(
    () => getErrorComponent("email"),
    [getErrorComponent]
  );
  const phoneError = useMemo(
    () => getErrorComponent("phoneNumber"),
    [getErrorComponent]
  );
  const addressError = useMemo(
    () => getErrorComponent("address"),
    [getErrorComponent]
  );
  const gstNumberError = useMemo(
    () => getErrorComponent("gstNumber"),
    [getErrorComponent]
  );
  const gstCertificateError = useMemo(
    () => getErrorComponent("gstCertificate"),
    [getErrorComponent]
  );
  const leagalStructureError = useMemo(
    () => getErrorComponent("legalStructure"),
    [getErrorComponent]
  );

  const onSave = useCallback(async () => {
    checkProfile();
    if (isValid) {
      startProgress();
      const apiResponse = await manufacturerApiService.verifyManufacturer(
        changeProfileRequest.isVerified || false,
        changeProfileRequest._id
      );
      const { data, success, error } = apiResponse;
      if (success) {
        // changeUser(data);
        setChangeProfileRequest(data);
        if (cb) {
          cb();
        }
        showSuccess("Profile updated successfully");
      } else {
        showError(error?.message || "Error in change profile");
      }
      stopProgress();
    }
  }, [
    cb,
    changeProfileRequest,
    checkProfile,
    isValid,
    showError,
    showSuccess,
    startProgress,
    stopProgress,
  ]);

  return (
    <Box
      sx={{
        width: "100%",
        p: 4,
        bgcolor: "white",
        overflowY: "scroll",
      }}
    >
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <>
          {isError && (
            <Typography>Error fetching details: {errorMessage}</Typography>
          )}
          {!isError && (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h4">{title}</Typography>
                {/* {dUser?.isVerified && !hideProfileVisibility && (
                  <Chip
                    label={"Verified"}
                    component={"span"}
                    variant="outlined"
                    color="success"
                    size="small"
                  />
                )}
                {!dUser?.isVerified && !hideProfileVisibility && (
                  <Chip
                    label={"Not Verified"}
                    component={"span"}
                    variant="outlined"
                    color="warning"
                    size="small"
                  />
                )} */}

                <FormControlLabel
                  label={"Verify"}
                  sx={{
                    ml: "auto",
                  }}
                  control={<Switch />}
                  checked={changeProfileRequest?.isVerified}
                  onChange={(_, c) =>
                    setChangeProfileRequest((prev) => ({
                      ...prev,
                      isVerified: c,
                    }))
                  }
                />

                <Button
                  variant="contained"
                  disableElevation
                  disabled={isProfileInProgress}
                  onClick={onSave}
                  startIcon={<Save />}
                  size="medium"
                  sx={{
                    width: "10%",
                    textTransform: "capitalize",
                    // mt: 4,
                  }}
                >
                  Save
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                  mt: 4,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "start",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <InputBox
                      label={"Company Name"}
                      placeholder="Company Name"
                      value={changeProfileRequest?.companyName}
                      name="companyName"
                      disabled
                      //   onChange={onChange}
                    >
                      {companyNameError}
                    </InputBox>
                  </Box>
                </Box>
                <FormControl disabled>
                  <FormLabel id="legalStructure">Legal Structure</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="legalStructure"
                    // defaultValue="proprietorship"
                    name="legalStructure"
                    id="legalStructure"
                    value={changeProfileRequest?.legalStructure}

                    // onChange={onChangeRadioGrp}
                  >
                    <FormControlLabel
                      value="proprietorship"
                      control={<Radio />}
                      label="Proprietorship"
                      disabled
                    />
                    <FormControlLabel
                      disabled
                      value="llp"
                      control={<Radio />}
                      label="Partnership/LLP"
                    />
                    <FormControlLabel
                      disabled
                      value="pvtLtd"
                      control={<Radio />}
                      label="Pvt. Ltd."
                    />
                  </RadioGroup>
                  {leagalStructureError}
                </FormControl>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "start",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <InputBox
                      disabled
                      label={"Email"}
                      placeholder="emil@address.com"
                      value={changeProfileRequest?.email}
                      name="email"
                      type="email"
                      //   onChange={onChange}
                    >
                      {emailError}
                    </InputBox>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <InputBox
                      disabled
                      label={"Phone Number"}
                      placeholder="9999999999"
                      value={changeProfileRequest?.phoneNumber}
                      name="phoneNumber"
                      type="number"
                      //   onChange={onChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+91</InputAdornment>
                        ),
                      }}
                    >
                      {phoneError}
                    </InputBox>
                  </Box>
                </Box>
                {/* <Box sx={{ flex: 1 }}> */}
                <InputBox
                  disabled
                  label={"Address"}
                  placeholder="Enter your full address here"
                  value={changeProfileRequest?.address}
                  name="address"
                  //   onChange={onChange}
                  multiline
                  maxRows={4}
                  minRows={4}
                >
                  {addressError}
                </InputBox>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "start",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <InputBox
                      disabled
                      label={"GST Number"}
                      placeholder="Enter your GSTN Number"
                      value={changeProfileRequest?.gstNumber}
                      name="gstNumber"
                      //   onChange={onChange}
                    >
                      {gstNumberError}
                    </InputBox>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ mb: 1 }}>
                      Upload GST Certificate
                    </Typography>
                    <MediaUploader
                      onRemove={noOp}
                      onUpload={noOp}
                      src={changeProfileRequest?.gstCertificate}
                      type="file"
                      showType="button"
                      width="100%"
                    />
                    {gstCertificateError}
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Typography sx={{ mb: 1 }}>
                    Upload Incorporate Certificate
                  </Typography>
                  <MediaUploader
                    onRemove={noOp}
                    onUpload={noOp}
                    src={changeProfileRequest?.incorporationCertificate}
                    type="file"
                    showType="button"
                    width="100%"
                  />
                </Box>
                {/* </Box> */}
              </Box>
              <SocialMediaSetting
                onChange={noOp}
                socialMediaLinks={changeProfileRequest?.socialMedia || []}
              />
              <PersonsSetting
                onChange={noOp}
                persons={changeProfileRequest?.owner || []}
                title="Owners"
              />
              <PersonsSetting
                onChange={noOp}
                persons={changeProfileRequest?.contactPerson || []}
                title="Contact People"
              />
              <FinancialInfoSetting
                onChange={noOp}
                financialInfo={changeProfileRequest?.financialInfo || []}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ProfileManuFacturerPage;
