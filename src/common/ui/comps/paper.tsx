import { Paper as MUIPaper, SxProps, Theme } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  variant?: OverridableStringUnion<"elevation" | "outlined">;
};

export function Paper({ children, variant = "outlined", sx }: Props) {
  return (
    <MUIPaper variant={variant} sx={sx}>
      {children}
    </MUIPaper>
  );
}
