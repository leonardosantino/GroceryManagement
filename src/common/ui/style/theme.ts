"use client";

import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    container: string;
    outline: string;
    surface: string;
  }
}

export const defaultFont = Poppins({ weight: "400", subsets: ["latin"] });

export const theme = createTheme({
  typography: {
    fontFamily: defaultFont.style.fontFamily,
  },

  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#3f51b5",
        },
        secondary: {
          main: "#9fa8da",
        },
        background: {
          paper: "#fafafa",
        },
        surface: "#ffffff",
        container: "#fafafa",
        outline: "#c0c0c0",
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
