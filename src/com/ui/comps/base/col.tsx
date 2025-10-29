import { BoxStyle, Box, BoxProps } from "@/com/ui/comps/base/box";

export function Col(props: Readonly<BoxProps>) {
  const style: BoxStyle = {
    direction: "column",
    ...props,
  };

  return <Box {...style} />;
}
