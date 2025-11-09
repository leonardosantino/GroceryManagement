import { Property } from "csstype";

import { ThemeColor } from "@/com/ui/theme/scheme";
import { ReactNode } from "react";

export type BoxStyle = {
  flex?: number;

  position?: Property.Position;
  direction?: Property.FlexDirection;

  justify?: Property.JustifyContent;
  align?: Property.AlignItems;
  wrap?: Property.FlexWrap;

  height?: number | string;
  minHeight?: number;
  width?: number | string;
  maxWidth?: number;

  padding?: number;
  margin?: number;
  marginX?: number;
  gap?: number;

  backgroundColor?: ThemeColor;

  borderColor?: ThemeColor;
  borderStyle?: Property.BorderStyle;
  borderRadius?: number;
  borderWidth?: number;

  boxShadow?: Property.BoxShadow;

  overflow?: Property.Overflow;
  scrollbarWidth?: Property.ScrollbarWidth;
};

export type BoxProps = BoxStyle & {
  children?: ReactNode;
  testId?: string;
};
