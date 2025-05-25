"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "inherit",
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
