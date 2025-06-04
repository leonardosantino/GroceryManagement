import { Paper as MUIPaper, SxProps, Theme } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  variant?: OverridableStringUnion<"elevation" | "outlined">;
  elevation?: number;
};

export function Paper({ children, variant, elevation = 0, sx }: Props) {
  return (
    <MUIPaper variant={variant} elevation={elevation} sx={sx}>
      {children}
    </MUIPaper>
  );
}
