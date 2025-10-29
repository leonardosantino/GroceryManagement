import { BoxProps } from "@/com/ui/comps/base/box/type";
import { compProps, styleProperties } from "@/com/ui/comps/base/box/fn";

export type { BoxStyle, BoxProps } from "@/com/ui/comps/base/box/type";

export function Box(boxProps: Readonly<BoxProps>) {
  const style = styleProperties(boxProps);

  const props = compProps(boxProps);

  return (
    <div
      style={{
        ...style,
      }}
      {...props}
    />
  );
}
