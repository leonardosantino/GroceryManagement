import { Box, BoxProps } from "@/com/ui/comps/base/box";

export function Form(props: Readonly<BoxProps>) {
  return <Box component="form" {...props} />;
}
