import { Box as Bx, BoxProps } from "@mui/material";

export function Box(props: BoxProps) {
  return (
    <Bx
      {...props}
      sx={{
        display: "flex",
        ...props.sx,
      }}
    />
  );
}
