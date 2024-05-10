import React, { useCallback, useMemo } from "react";
import { SocialMediaLink } from "../../common";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Add, DeleteOutline } from "@mui/icons-material";
import SFInput from "../../common/components/SFInput";
import SFDropdownComp from "../../common/components/SFDropdown";

type Props = {
  socialMediaLinks: SocialMediaLink[];
  onChange: (socialMediaLinks: SocialMediaLink[]) => void;
};

const SocialMediaSetting: React.FC<Props> = (props) => {
  const { onChange, socialMediaLinks } = props;

  const onAddSocialMedia = useCallback(() => {
    onChange([...socialMediaLinks, { socialMedia: "instagram", url: "" }]);
  }, [onChange, socialMediaLinks]);

  const onChangeSocialMedia = useCallback(
    (socialMedia: SocialMediaLink, index: number) => {
      onChange(socialMediaLinks.map((e, i) => (i === index ? socialMedia : e)));
    },
    [onChange, socialMediaLinks]
  );
  const onDeleteSocialMedia = useCallback(
    (index: number) => {
      onChange(socialMediaLinks.filter((_, i) => i !== index));
    },
    [onChange, socialMediaLinks]
  );

  const rows = useMemo(
    () =>
      socialMediaLinks.map((socialMedia, index) => {
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeSocialMedia({ ...socialMedia, url: e.target.value }, index);
        const onChangeSelect = (e: SelectChangeEvent<string | string[]>) =>
          onChangeSocialMedia(
            {
              ...socialMedia,
              socialMedia: e.target.value as SocialMediaLink["socialMedia"],
            },
            index
          );
        const onDelete = () => onDeleteSocialMedia(index);

        return (
          <Box
            sx={{ width: "100%", display: "flex", gap: 2, alignItems: "start" }}
          >
            <Box sx={{ flex: 1 }}>
              <SFDropdownComp
                value={socialMedia.socialMedia}
                onChange={onChangeSelect}
                label={"Social Media Type"}
                disabled
                options={[
                  "instagram",
                  "facebook",
                  "twitter",
                  "linkedin",
                  "website",
                ].map((e) => (
                  <MenuItem value={e} key={e}>
                    {e}
                  </MenuItem>
                ))}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <SFInput
                disabled
                value={socialMedia.url}
                onChange={onChange}
                label={"Link"}
                placeholder="eg. www.google.com"
              />
            </Box>
            <IconButton onClick={onDelete}>
              <DeleteOutline />
            </IconButton>
          </Box>
        );
      }),
    [onChangeSocialMedia, onDeleteSocialMedia, socialMediaLinks]
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        my: 2,
      }}
    >
      <Box
        sx={{ width: "100%", display: "flex", alignItems: "center", gap: 4 }}
      >
        <Typography variant="h4">Social Media</Typography>
        <Button
          startIcon={<Add />}
          variant="outlined"
          sx={{ ml: "auto", my: 2 }}
          onClick={onAddSocialMedia}
        >
          Add
        </Button>
      </Box>
      {rows}
    </Box>
  );
};

export default SocialMediaSetting;
