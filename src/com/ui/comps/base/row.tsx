import { BoxProps, Box, BoxStyle } from "@/com/ui/comps/base/box";

export function Row(props: Readonly<BoxProps>) {
  const style: BoxStyle = {
    wrap: "wrap",
    ...props,
  };

  return <Box {...style} />;
}
