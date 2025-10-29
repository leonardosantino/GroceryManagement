import { ReactNode } from "react";
import { Properties } from "csstype";

import { get4xPx } from "@/com/ui/comps/base/box/fn";

type Props = {
  width?: number;
  height?: number;
  children?: ReactNode;
};

export function BoxSize(boxSizeProps: Readonly<Props>) {
  const { width, height, ...props } = boxSizeProps;

  const style: Properties = {};

  if (height) style.height = get4xPx(height);
  if (width) style.width = get4xPx(width);

  return <div style={style} {...props} />;
}
