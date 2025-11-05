import { Box, BoxProps } from "@/com/ui/comps/base/box";
import { boxShadow } from "@/com/ui/schema/scheme";

export function Deco(boxProps: Readonly<BoxProps>) {
  const props: BoxProps = {
    borderRadius: 1,
    boxShadow: boxShadow.light,
    ...boxProps,
  };

  return <Box {...props} />;
}
