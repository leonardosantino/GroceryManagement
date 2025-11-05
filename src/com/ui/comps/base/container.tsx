import { BoxStyle, Box, BoxProps } from "@/com/ui/comps/base/box";

export function Container(boxProps: Readonly<BoxProps>) {
  const props: BoxStyle = {
    height: "inherit",
    wrap: "nowrap",
    backgroundColor: "surface",
    ...boxProps,
  };

  return <Box {...props} />;
}
