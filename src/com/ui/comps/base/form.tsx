import { Box, BoxProps } from "@/com/ui/comps/base/box";

export function Form(boxProps: Readonly<BoxProps>) {
  return (
    <form>
      <Box {...boxProps} />
    </form>
  );
}
