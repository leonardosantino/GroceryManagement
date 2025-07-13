import { Box as Bx, BoxProps } from "@mui/material";

export function Box(props: BoxProps) {
  return (
    <Bx
      sx={{
        borderStyle: "solid",
        borderColor: "outline",
        borderWidth: 1,
        borderRadius: 1,
        backgroundColor: "surface",
        ...props.sx,
      }}
    />
  );
}
