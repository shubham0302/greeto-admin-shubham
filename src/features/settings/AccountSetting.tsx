import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FinancialInfoModel,
  PersonModel,
  SocialMediaLink,
  User,
  UserError,
  getEmailError,
  getPhoneError,
  useAlert,
  useAuth,
  useToggle,
} from "../../common";
import ErrorMessage from "../../common/components/ErrorMessage";
import InputBox from "../../common/components/InputBox";
import MediaUploader from "../../common/components/MediaUploader";
import { authService } from "../../infrastructure";
import FinancialInfoSetting from "./FinancialInfoSetting";
import PersonsSetting from "./PersonSetting";
import SocialMediaSetting from "./SocialMediaSetting";

type Props = {
  title?: string;
  hideProfileVisibility?: boolean;
  cb?: () => void;
};

const AccountSetting: React.FC<Props> = (props) => {
  const { title = "Account Settings", hideProfileVisibility, cb } = props;
  const { user: dUser, changeUser } = useAuth();
  const { error: showError, success: showSuccess } = useAlert();
  const [changeProfileRequest, setChangeProfileRequest] =
    useState<Partial<User>>(dUser);
  useEffect(() => {
    if (dUser) {
      setChangeProfileRequest(dUser);
    }
  }, [dUser]);

  const { error, isValid } = useMemo(() => {
    const error: UserError = {
      address: null,
      email: null,
      phoneNumber: null,
      companyName: null,
      legalStructure: null,
      gstCertificate: null,
      gstNumber: null,
    };
    if (isEmpty(changeProfileRequest.gstCertificate)) {
      error.gstCertificate = "Cannot be empty!";
    }
    if (isEmpty(changeProfileRequest.gstNumber)) {
      error.gstNumber = "Cannot be empty!";
    }
    if (isEmpty(changeProfileRequest.legalStructure)) {
      error.legalStructure = "Cannot be empty!";
    }
    if (isEmpty(changeProfileRequest.legalStructure)) {
      error.legalStructure = "Cannot be empty!";
    }
    if (isEmpty(changeProfileRequest.address)) {
      error.address = "Cannot be empty!";
    }
    if (isEmpty(changeProfileRequest?.companyName)) {
      error.companyName = "Cannot be empty!";
    }
    const emailError = getEmailError(changeProfileRequest.email);
    if (emailError) {
      error.email = emailError;
    }
    const phoneError = getPhoneError(changeProfileRequest.phoneNumber);
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
    (key: keyof UserError) => {
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
      const apiResponse = await authService.changeProfile(
        changeProfileRequest as User
      );
      const { data, success, error } = apiResponse;
      if (success) {
        changeUser(data);
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
    changeProfileRequest,
    changeUser,
    checkProfile,
    isValid,
    showError,
    showSuccess,
    startProgress,
    stopProgress,
  ]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangeProfileRequest((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onChangeRadioGrp = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, val: string) => {
      const { name } = e.target;
      setChangeProfileRequest((prev) => ({ ...prev, [name]: val }));
    },
    []
  );

  const onChangeSocialMdeia = useCallback(
    (socialMediaLinks: SocialMediaLink[]) => {
      setChangeProfileRequest((prev) => ({
        ...prev,
        socialMedia: socialMediaLinks,
      }));
    },
    []
  );
  const onChangeOwner = useCallback((owners: PersonModel[]) => {
    setChangeProfileRequest((prev) => ({
      ...prev,
      owner: owners,
    }));
  }, []);
  const onChangeContactPeople = useCallback((contacts: PersonModel[]) => {
    setChangeProfileRequest((prev) => ({
      ...prev,
      contactPerson: contacts,
    }));
  }, []);
  const onChangeFinancialInfo = useCallback(
    (financialInfo: FinancialInfoModel[]) => {
      setChangeProfileRequest((prev) => ({
        ...prev,
        financialInfo,
      }));
    },
    []
  );

  const onUploadGST = useCallback((url: string) => {
    setChangeProfileRequest((prev) => ({ ...prev, gstCertificate: url }));
  }, []);

  const onRemoveGST = useCallback(() => {
    setChangeProfileRequest((prev) => ({ ...prev, gstCertificate: "" }));
  }, []);

  const onUploadIncorporate = useCallback((url: string) => {
    setChangeProfileRequest((prev) => ({
      ...prev,
      incorporationCertificate: url,
    }));
  }, []);

  const onRemoveIncorporate = useCallback(() => {
    setChangeProfileRequest((prev) => ({
      ...prev,
      incorporationCertificate: "",
    }));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        p: 4,
        bgcolor: "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h4">{title}</Typography>
        {dUser?.isVerified && !hideProfileVisibility && (
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
        )}

        <Button
          variant="contained"
          disableElevation
          disabled={isProfileInProgress}
          onClick={onSave}
          startIcon={<Save />}
          size="medium"
          sx={{ width: "10%", textTransform: "capitalize", ml: "auto", mt: 4 }}
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
          sx={{ width: "100%", display: "flex", alignItems: "start", gap: 2 }}
        >
          <Box sx={{ flex: 1 }}>
            <InputBox
              label={"Company Name"}
              placeholder="Company Name"
              value={changeProfileRequest?.companyName}
              name="companyName"
              onChange={onChange}
            >
              {companyNameError}
            </InputBox>
          </Box>
        </Box>
        <FormControl>
          <FormLabel id="legalStructure">Legal Structure</FormLabel>
          <RadioGroup
            row
            aria-labelledby="legalStructure"
            // defaultValue="proprietorship"
            name="legalStructure"
            id="legalStructure"
            value={changeProfileRequest?.legalStructure}
            onChange={onChangeRadioGrp}
          >
            <FormControlLabel
              value="proprietorship"
              control={<Radio />}
              label="Proprietorship"
            />
            <FormControlLabel
              value="llp"
              control={<Radio />}
              label="Partnership/LLP"
            />
            <FormControlLabel
              value="pvtLtd"
              control={<Radio />}
              label="Pvt. Ltd."
            />
          </RadioGroup>
          {leagalStructureError}
        </FormControl>

        <Box
          sx={{ width: "100%", display: "flex", alignItems: "start", gap: 2 }}
        >
          <Box sx={{ flex: 1 }}>
            <InputBox
              label={"Email"}
              placeholder="emil@address.com"
              value={changeProfileRequest?.email}
              name="email"
              type="email"
              onChange={onChange}
            >
              {emailError}
            </InputBox>
          </Box>
          <Box sx={{ flex: 1 }}>
            <InputBox
              label={"Phone Number"}
              placeholder="9999999999"
              value={changeProfileRequest?.phoneNumber}
              name="phoneNumber"
              type="number"
              onChange={onChange}
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
          label={"Address"}
          placeholder="Enter your full address here"
          value={changeProfileRequest?.address}
          name="address"
          onChange={onChange}
          multiline
          maxRows={4}
          minRows={4}
        >
          {addressError}
        </InputBox>

        <Box
          sx={{ width: "100%", display: "flex", alignItems: "start", gap: 2 }}
        >
          <Box sx={{ flex: 1 }}>
            <InputBox
              label={"GST Number"}
              placeholder="Enter your GSTN Number"
              value={changeProfileRequest?.gstNumber}
              name="gstNumber"
              onChange={onChange}
            >
              {gstNumberError}
            </InputBox>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ mb: 1 }}>Upload GST Certificate</Typography>
            <MediaUploader
              onRemove={onRemoveGST}
              onUpload={onUploadGST}
              src={changeProfileRequest?.gstCertificate}
              type="file"
              showType="button"
              width="100%"
            />
            {gstCertificateError}
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ mb: 1 }}>Upload Incorporate Certificate</Typography>
          <MediaUploader
            onRemove={onRemoveIncorporate}
            onUpload={onUploadIncorporate}
            src={changeProfileRequest?.incorporationCertificate}
            type="file"
            showType="button"
            width="100%"
          />
        </Box>
        {/* </Box> */}
      </Box>
      <SocialMediaSetting
        onChange={onChangeSocialMdeia}
        socialMediaLinks={changeProfileRequest?.socialMedia || []}
      />
      <PersonsSetting
        onChange={onChangeOwner}
        persons={changeProfileRequest?.owner || []}
        title="Owners"
      />
      <PersonsSetting
        onChange={onChangeContactPeople}
        persons={changeProfileRequest?.contactPerson || []}
        title="Contact People"
      />
      <FinancialInfoSetting
        onChange={onChangeFinancialInfo}
        financialInfo={changeProfileRequest?.financialInfo || []}
      />
    </Box>
  );
};

export default AccountSetting;
