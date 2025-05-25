import { Paper } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "elevation" | "outlined";
};

export function Surface({ children, variant = "outlined" }: Props) {
  return <Paper variant={variant}>{children}</Paper>;
}
