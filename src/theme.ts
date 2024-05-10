import { alpha, createTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { PaletteOptions } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    labelXxl: React.CSSProperties;
    labelXl: React.CSSProperties;
    labelLr: React.CSSProperties;
    labelMd: React.CSSProperties;
    labelSm: React.CSSProperties;
    bodyXxl: React.CSSProperties;
    bodyXxxl: React.CSSProperties;
    bodyXl: React.CSSProperties;
    bodyLr: React.CSSProperties;
    bodyMd: React.CSSProperties;
    bodySm: React.CSSProperties;
    bodyTn: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1?: React.CSSProperties;
    h2?: React.CSSProperties;
    h3?: React.CSSProperties;
    h4?: React.CSSProperties;
    labelXxl?: React.CSSProperties;
    labelXl?: React.CSSProperties;
    labelLr?: React.CSSProperties;
    labelMd?: React.CSSProperties;
    labelSm?: React.CSSProperties;
    bodyXxl?: React.CSSProperties;
    bodyXxxl?: React.CSSProperties;
    bodyXl?: React.CSSProperties;
    bodyLr?: React.CSSProperties;
    bodyMd?: React.CSSProperties;
    bodySm?: React.CSSProperties;
    bodyTn?: React.CSSProperties;
  }

  interface PaletteOptions {
    gray?: PaletteColorOptions;
  }

  interface Palette {
    gray?: PaletteColorOptions;
  }

  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }

  interface PaletteColorOptions {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    main?: string;
    white?: string;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    labelXxl: true;
    labelXl: true;
    labelLr: true;
    labelMd: true;
    labelSm: true;
    bodyXxl: true;
    bodyXxxl: true;
    bodyXl: true;
    bodyLr: true;
    bodyMd: true;
    bodySm: true;
    bodyTn: true;
  }
}

export const palette: PaletteOptions = {
  primary: {
    100: "#ffcbd2",
    200: "#ffa9b5",
    300: "#fe8697",
    400: "#fe6379",
    main: "#FE526A",
    600: "#cb4255",
    700: "#983140",
    800: "#66212a",
    900: "#331015",
  },
  secondary: {
    100: "#EBEBFF",
    200: "#CDCBFE",
    300: "#9A95FE",
    400: "#7872FD",
    main: "#564FFD",
    600: "#453FCA",
    700: "#342F98",
    800: "#222065",
    900: "#111033",
  },
  gray: {
    white: "#fff",
    50: "#F5F7FA",
    100: "#E9EAF0",
    200: "#CED1D9",
    300: "#B7BAC7",
    400: "#A1A5B3",
    main: "#8C94A3",
    600: "#6E7485",
    700: "#4E5566",
    800: "#363B47",
    900: "#1D2026",
  },
  success: {
    100: "#E1F7E3",
    200: "#C3E5C6",
    300: "#7BD785",
    400: "#4FCA5C",
    main: "#23BD33",
    600: "#1C9729",
    700: "#15711F",
    800: "#0E4C14",
    900: "#07260A",
  },
  warning: {
    100: "#FFF2E5",
    200: "#FED1A5",
    300: "#FEBB79",
    400: "#FDA44C",
    main: "#FD8E1F",
    600: "#CC7319",
    700: "#985613",
    800: "#65390C",
    900: "#331D06",
  },
  error: {
    50: "#FCF5F5",
    100: "#FFF0F0",
    200: "#F4C8C8",
    300: "#EE8F8F",
    400: "#E96969",
    main: "#E34444",
    600: "#B63636",
    700: "#882929",
    800: "#5B1B1B",
    900: "#2D0E0E",
  },
};

export const typography: TypographyOptions = {
  allVariants: {
    fontFamily: "Inter",
  },
  button: {
    fontWeight: 600,
    fontSize: 16,
  },
  h1: {
    fontWeight: 600,
    fontSize: 48,
  },
  h2: {
    fontWeight: 600,
    fontSize: 40,
  },
  h3: {
    fontWeight: 600,
    fontSize: 32,
  },
  h4: {
    fontWeight: 600,
    fontSize: 24,
  },
  labelLr: {
    fontWeight: 500,
    fontSize: 14,
  },
  labelMd: {
    fontWeight: 500,
    fontSize: 12,
  },
  labelSm: {
    fontWeight: 500,
    fontSize: 10,
  },
  labelXl: {
    fontWeight: 500,
    fontSize: 16,
  },
  labelXxl: {
    fontWeight: 500,
    fontSize: 18,
  },
  bodyLr: {
    fontWeight: 400,
    fontSize: 16,
  },
  bodyMd: {
    fontWeight: 400,
    fontSize: 14,
  },
  bodySm: {
    fontWeight: 400,
    fontSize: 12,
  },
  bodyXl: {
    fontWeight: 400,
    fontSize: 18,
  },
  bodyXxl: {
    fontWeight: 400,
    fontSize: 20,
  },
  bodyXxxl: {
    fontWeight: 400,
    fontSize: 24,
  },
  bodyTn: {
    fontWeight: 400,
    fontSize: 10,
  },
  fontWeightBold: 700,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontFamily: "Inter",
  body1: null,
  body2: null,
  caption: null,
  h5: null,
  h6: null,
  htmlFontSize: 16,
  fontSize: 16,
  overline: null,
  subtitle1: null,
  subtitle2: null,
};

export const theme = createTheme({
  typography,
  palette,
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        popper: {
          backgroundColor: "gray.100",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
        variant: "contained",
        disableElevation: true,
        sx: {
          textTransform: "capitalize",
          borderRadius: 0,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
        sx: {
          // border: "1px solid gray.100",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "gray.100",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiIcon: {
      defaultProps: {
        fontSize: "small",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: "#FD8E1F",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        standardInfo: {
          color: palette.gray["main"],
          boxShadow: `0 6px 16px ${alpha(palette.gray["600"], 0.15)}`,
          backgroundColor: palette.gray[50],
          border: "1px solid",
          borderColor: palette.gray[200],
          "& .MuiAlert-icon": {
            color: palette.gray["main"],
          },
        },
        standardSuccess: {
          color: palette.success[700],
          boxShadow: `0 6px 16px ${alpha(palette.success["600"], 0.25)}`,
          backgroundColor: palette.success[100],
          border: "1px solid",
          borderColor: palette.success[500],
          "& .MuiAlert-icon": {
            color: palette.success["700"],
          },
        },
        standardWarning: {
          color: palette.warning[700],
          boxShadow: `0 6px 16px ${alpha(palette.warning["700"], 0.2)}`,
          backgroundColor: palette.warning[100],
          border: "1px solid",
          borderColor: palette.warning[700],
          "& .MuiAlert-icon": {
            color: palette.warning["700"],
          },
        },
        standardError: {
          color: palette.error[700],
          boxShadow: `0 6px 16px ${alpha(palette.error[700], 0.15)}`,
          backgroundColor: palette.error[100],
          border: "1px solid",
          borderColor: palette.error[400],
          "& .MuiAlert-icon": {
            color: palette.error["700"],
          },
        },
      },
    },
  },
});
