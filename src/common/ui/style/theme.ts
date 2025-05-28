"use client";

import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";

export const defaultFont = Poppins({ weight: "400", subsets: ["latin"] });

export const theme = createTheme({
  typography: {
    fontFamily: defaultFont.style.fontFamily,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FAFAFA",
          height: "100vh",
        },
        img: {
          width: "100%",
          height: "auto",
          borderRadius: "4px",
        },
      },
    },
  },
});
