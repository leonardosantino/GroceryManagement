import { Box as Bx, BoxProps } from "@mui/material";

import { Sx } from "@/com/ui";

export function Deco(props: BoxProps) {
  return (
    <Bx
      {...props}
      sx={{
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 1,
        borderColor: Sx.color.outline,
        backgroundColor: Sx.color.surface,
        ...props.sx,
      }}
    />
  );
}
