import { Button, ButtonProps } from "@mui/material";

type SFButtonProps = ButtonProps & {
  sfColor?: "ps" | "pg" | "sp" | "ss" | "sg" | "tp" | "ts" | "tg";
};

const SFButton: React.FC<SFButtonProps> = ({ sfColor, children, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        fontSize: 14,
        backgroundColor:
          sfColor === "ps"
            ? "secondary.main"
            : sfColor === "pg"
            ? "gray.main"
            : sfColor === "sp"
            ? "primary.100"
            : sfColor === "ss"
            ? "secondary.100"
            : sfColor === "sg"
            ? "gray.50"
            : sfColor === "tp"
            ? "transparent"
            : sfColor === "ts"
            ? "transparent"
            : sfColor === "tg"
            ? "transparent"
            : "primary.main",

        color:
          sfColor === "ps"
            ? "gray.white"
            : sfColor === "pg"
            ? "gray.white"
            : sfColor === "sp"
            ? "primary.main"
            : sfColor === "ss"
            ? "secondary.main"
            : sfColor === "sg"
            ? "gray.main"
            : sfColor === "tp"
            ? "primary.main"
            : sfColor === "ts"
            ? "secondary.main"
            : sfColor === "tg"
            ? "gray.main"
            : "gray.white",

        ":hover": {
          backgroundColor:
            sfColor === "ps"
              ? "secondary.600"
              : sfColor === "pg"
              ? "gray.800"
              : sfColor === "sp"
              ? "primary.200"
              : sfColor === "ss"
              ? "secondary.200"
              : sfColor === "sg"
              ? "gray.100"
              : sfColor === "tp"
              ? "primary.100"
              : sfColor === "ts"
              ? "secondary.100"
              : sfColor === "tg"
              ? "gray.100"
              : "primary.600",

          color:
            sfColor === "ps"
              ? "gray.white"
              : sfColor === "pg"
              ? "gray.white"
              : sfColor === "sp"
              ? "primary.600"
              : sfColor === "ss"
              ? "secondary.600"
              : sfColor === "sg"
              ? "gray.main"
              : sfColor === "tp"
              ? "primary.600"
              : sfColor === "ts"
              ? "secondary.600"
              : sfColor === "tg"
              ? "gray.main"
              : "gray.white",
        },
        ":disabled": {
          backgroundColor:
            sfColor === "ps"
              ? "secondary.200"
              : sfColor === "pg"
              ? "gray.200"
              : sfColor === "sp"
              ? "primary.100"
              : sfColor === "ss"
              ? "secondary.100"
              : sfColor === "sg"
              ? "gray.50"
              : sfColor === "tp"
              ? "transparent"
              : sfColor === "ts"
              ? "transparent"
              : sfColor === "tg"
              ? "transparent"
              : "primary.200",

          color:
            sfColor === "ps"
              ? "gray.white"
              : sfColor === "pg"
              ? "gray.white"
              : sfColor === "sp"
              ? "primary.300"
              : sfColor === "ss"
              ? "secondary.300"
              : sfColor === "sg"
              ? "gray.300"
              : sfColor === "tp"
              ? "primary.300"
              : sfColor === "ts"
              ? "secondary.300"
              : sfColor === "tg"
              ? "gray.300"
              : "gray.white",
        },

        borderRadius: 0,
        textTransform: "capitalize",
      }}
    >
      {children}
    </Button>
  );
};

export default SFButton;
