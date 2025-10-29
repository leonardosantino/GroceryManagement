import { BoxStyle, Box, BoxProps } from "@/com/ui/comps/base/box";

export function Container(boxProps: Readonly<BoxProps>) {
  const props: BoxStyle = {
    height: "inherit",
    wrap: "nowrap",
    ...boxProps,
  };

  return <Box {...props} />;
}
