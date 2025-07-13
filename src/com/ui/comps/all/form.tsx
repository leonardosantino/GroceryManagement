import { Box as Bx, BoxProps } from "@mui/material";

export function Form(props: BoxProps) {
  return (
    <Bx
      component={"form"}
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        ...props.sx,
      }}
    />
  );
}
