import { Box as Bx, BoxProps } from "@mui/material";

export function Row(props: BoxProps) {
  return (
    <Bx
      {...props}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        ...props.sx,
      }}
    />
  );
}
