import { BoxStyle, Box, BoxProps } from "@/com/ui/comps/base/box";

export function ScrollCol(props: Readonly<BoxProps>) {
  const style: BoxStyle = {
    direction: "column",
    overflow: "scroll",
    scrollbarWidth: "none",
    ...props,
  };

  return <Box {...style} />;
}
