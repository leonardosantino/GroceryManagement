import { Box as Bx, BoxProps } from "@mui/material";

export function Col(props: BoxProps) {
  return (
    <Bx
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        ...props.sx,
      }}
    />
  );
}
