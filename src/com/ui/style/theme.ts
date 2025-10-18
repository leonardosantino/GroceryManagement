import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";
import { ColorTheme } from "@/com/ui/style/scheme";

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
          main: ColorTheme.primary,
        },
        secondary: {
          main: ColorTheme.secondary,
        },
        background: {
          paper: ColorTheme.container,
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
