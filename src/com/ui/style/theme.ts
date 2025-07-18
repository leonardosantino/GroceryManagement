import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";

import { Sx } from "@/com/ui";

export const defaultFont = Poppins({ weight: "400", subsets: ["latin"] });

export const theme = createTheme({
  typography: {
    fontFamily: defaultFont.style.fontFamily,
  },

  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: Sx.color.primary,
        },
        secondary: {
          main: Sx.color.secondary,
        },
        background: {
          paper: Sx.color.surface,
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
