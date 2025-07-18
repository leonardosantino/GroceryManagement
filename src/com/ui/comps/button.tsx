import { Button as Btn, ButtonProps } from "@mui/material";

export function Button(props: ButtonProps) {
  return <Btn size={"small"} {...props} />;
}
