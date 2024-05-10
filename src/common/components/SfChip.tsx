import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useMemo } from "react";

export type SfChipProps = {
  name: string;
  color:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "primary"
    | "success"
    | "tertiary"
    | "gray";
};

const SfChip: FC<SfChipProps> = (props) => {
  const { name, color } = props;

  const { textColor, bgColor } = useMemo(() => {
    const textColor = `${color}.700`;
    const bgColor = `${color}.100`;
    return { textColor, bgColor };
  }, [color]);

  return (
    <Box
      component={"span"}
      sx={{
        color: textColor,
        bgcolor: bgColor,
        py: "4px",
        px: "6px",
        borderRadius: 0,
        width: "fit-content",
      }}
    >
      <Typography
        sx={{ textTransform: "uppercase" }}
        variant="bodySm"
        fontWeight={"600"}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default SfChip;
