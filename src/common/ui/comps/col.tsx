import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function Col({ children, sx }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
