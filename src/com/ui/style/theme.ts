import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";
import { color } from "@/com/ui/style/scheme";

export const defaultFont = Poppins({ weight: "400", subsets: ["latin"] });

export const theme = createTheme({
  typography: {
    fontFamily: defaultFont.style.fontFamily,
    fontSize: 12.25,
  },

  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: color.primary,
        },
        secondary: {
          main: color.secondary,
        },
        background: {
          paper: color.surface,
        },
      },
    },
    // dark: {
    //   palette: {
    //     background: {
    //       default: "#fafafa",
    //     },
    //   },
    // },
  },
});
