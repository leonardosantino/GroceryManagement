import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";
import { ColorTheme } from "@/com/ui/theme/scheme";

export const defaultFont = Poppins({ weight: "400", subsets: ["latin"] });

export const theme = createTheme({
  typography: {
    fontFamily: defaultFont.style.fontFamily,
    fontSize: 12,
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
      },
    },
  },
});
