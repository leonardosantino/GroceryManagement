import { Properties } from "csstype";

import { ColorTheme } from "@/com/ui/theme/scheme";
import { get4xPx } from "@/com/ui/comps/base/box/fn";

type Props = {
  marginX?: number;
  marginY?: number;
};
export function Divider({ marginX, marginY }: Readonly<Props>) {
  const style: Properties = {};

  if (marginX) {
    style.marginLeft = get4xPx(marginX);
    style.marginRight = get4xPx(marginX);
  }
  if (marginY) {
    style.marginTop = get4xPx(marginY);
    style.marginBottom = get4xPx(marginY);
  }

  return (
    <div
      style={{
        height: 1,
        backgroundColor: ColorTheme.outline,
        ...style,
      }}
    />
  );
}
