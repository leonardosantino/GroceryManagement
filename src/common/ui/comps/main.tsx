import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function Main({ children, sx }: Props) {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        padding: 1,
        gap: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
