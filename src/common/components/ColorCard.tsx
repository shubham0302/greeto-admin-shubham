import { Box, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface ColorCardProps {
  icon: OverridableComponent<SvgIconTypeMap>;
  title: string | number;
  description: string | number;
  cardColor: "primary" | "secondary" | "gray" | "success" | "warning" | "error";
  isActive?: boolean;
}

const ColorCard: React.FC<ColorCardProps> = ({
  cardColor = "primary",
  ...props
}) => {
  return (
    <Box
      className={`quiz-card ${
        props.isActive ? "quiz-card-active active-animation" : ""
      }`}
      sx={{
        p: 3,
        bgcolor: `${cardColor}.100`,
        cursor: "pointer",
        ":hover": {
          bgcolor: `${cardColor}.hover`,
        },
        display: "flex",
        alignItems: "center",
        gap: 3,

        ":after": {
          backgroundColor: `${cardColor}.main`,
        },
      }}
    >
      <Box
        sx={{
          bgcolor: "gray.white",
          width: 60,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          color={`${cardColor}.main`}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {<props.icon />}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" color={"gray.900"}>
          {props.title}
        </Typography>
        <Typography color={"gray.600"} variant="bodyMd" fontWeight={"500"}>
          {props.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ColorCard;
