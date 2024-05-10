import { Add, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { PersonModel } from "../../common";
import SFInput from "../../common/components/SFInput";

type Props = {
  persons: PersonModel[];
  onChange: (persons: PersonModel[]) => void;
  title: string;
};

const PersonsSetting: React.FC<Props> = (props) => {
  const { onChange, persons, title } = props;

  const onAddPersons = useCallback(() => {
    onChange([
      ...persons,
      { designation: "", email: "", name: "", phoneNumber: "" },
    ]);
  }, [onChange, persons]);

  const onChangePersons = useCallback(
    (socialMedia: PersonModel, index: number) => {
      onChange(persons.map((e, i) => (i === index ? socialMedia : e)));
    },
    [onChange, persons]
  );
  const onDeletePersons = useCallback(
    (index: number) => {
      onChange(persons.filter((_, i) => i !== index));
    },
    [onChange, persons]
  );

  const rows = useMemo(
    () =>
      persons.map((socialMedia, index) => {
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
          onChangePersons(
            { ...socialMedia, [e.target.name]: e.target.value },
            index
          );
        const onDelete = () => onDeletePersons(index);

        return (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
              border: "1px solid",
              borderColor: "gray.100",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: 2,
                alignItems: "start",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <SFInput
                  value={socialMedia.name}
                  onChange={onChange}
                  label={"Name"}
                  name="name"
                  placeholder="eg. John Doe"
                  disabled
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <SFInput
                  value={socialMedia.designation}
                  onChange={onChange}
                  label={"Designation"}
                  placeholder="eg. CEO"
                  name="designation"
                  disabled
                />
              </Box>
              <IconButton onClick={onDelete} disabled>
                <DeleteOutline />
              </IconButton>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: 2,
                alignItems: "start",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <SFInput
                  value={socialMedia.email}
                  onChange={onChange}
                  disabled
                  label={"Email"}
                  placeholder="eg. email@address.com"
                  name="email"
                  type="email"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <SFInput
                  value={socialMedia.phoneNumber}
                  onChange={onChange}
                  label={"Phone Number"}
                  placeholder="eg. 9999999999"
                  type="number"
                  disabled
                  name="phoneNumber"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>
        );
      }),
    [onChangePersons, onDeletePersons, persons]
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
        <Typography variant="h4">{title}</Typography>
        <Button
          startIcon={<Add />}
          variant="outlined"
          disabled
          sx={{ ml: "auto", my: 2 }}
          onClick={onAddPersons}
        >
          Add
        </Button>
      </Box>
      {rows}
    </Box>
  );
};

export default PersonsSetting;
