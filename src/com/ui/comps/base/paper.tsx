import { Box, BoxStyle, BoxProps } from "@/com/ui/comps/base/box";
import { boxShadow } from "@/com/ui/schema/scheme";

export function Paper(boxProps: Readonly<BoxProps>) {
  const props: BoxStyle = {
    borderRadius: 1,
    backgroundColor: "container",
    boxShadow: boxShadow.light,
    ...boxProps,
  };

  return <Box {...props} />;
}
