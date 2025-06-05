import { Box as MUIBox, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function Box({ children, sx }: Props) {
  return (
    <MUIBox
      sx={{
        borderStyle: "solid",
        borderColor: "outline",
        borderWidth: 1,
        borderRadius: 1,
        backgroundColor: "surface",
        ...sx,
      }}
    >
      {children}
    </MUIBox>
  );
}
