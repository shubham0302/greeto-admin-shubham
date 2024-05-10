import { Box, Divider } from "@mui/material";
import { ReactNode } from "react";

interface SFCardProps {
  header: string | ReactNode;
  body: string | ReactNode;
}

const SFCard: React.FC<SFCardProps> = (props) => {
  return (
    <Box
      sx={{
        bgcolor: "gray.white",
      }}
    >
      <Box
        sx={{
          py: 2,
          px: 2.8,
        }}
      >
        {props.header}
      </Box>
      <Divider />
      <Box
        sx={{
          py: 2,
          px: 2.8,
        }}
      >
        {props.body}
      </Box>
    </Box>
  );
};

export default SFCard;
