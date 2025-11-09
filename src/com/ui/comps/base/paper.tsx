import { Box, BoxProps } from "@/com/ui/comps/base/box";
import { boxShadow } from "@/com/ui/theme/scheme";

export function Paper(boxProps: Readonly<BoxProps>) {
  const props: BoxProps = {
    borderRadius: 1,
    backgroundColor: "container",
    boxShadow: boxShadow.light,
    ...boxProps,
  };

  return <Box {...props} />;
}
