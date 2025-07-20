import { Box as Bx, BoxProps } from "@mui/material";
import { color } from "@/com/ui/style/scheme";

export function Deco(props: BoxProps) {
  return (
    <Bx
      {...props}
      sx={{
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 1,
        borderColor: color.outline,
        backgroundColor: color.surface,
        ...props.sx,
      }}
    />
  );
}
