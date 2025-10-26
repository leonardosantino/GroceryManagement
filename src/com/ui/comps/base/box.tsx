import { ReactNode } from "react";
import { Property } from "csstype";

import { Box as Bx, SxProps } from "@mui/material";

export type BoxStyle = SxProps;

export type BoxProps = {
  position?: Property.Position;
  flex?: number;
  direction?: Property.FlexDirection;
  wrap?: Property.FlexWrap;
  justify?: Property.JustifyContent;
  align?: Property.AlignItems;
  width?: number;
  height?: string | number;
  maxWidth?: number;
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  margin?: number;
  marginX?: number;
  gap?: number;
  // on sx
  style?: BoxStyle;
  // on props
  children?: ReactNode;
  component?: string;
  testId?: string;
};

export function Box(props: Readonly<BoxProps>) {
  const {
    flex,
    direction,
    wrap,
    justify,
    align,
    // on sx
    style,
    // on props
    children,
    component,
    testId,
    // on sx
    ...others
  } = props;

  const viewStyle: BoxStyle = {
    display: "flex",
  };

  if (flex) {
    viewStyle.flexGrow = flex;
    viewStyle.flexShrink = 1;
    viewStyle.flexBasis = 0;
  }
  if (direction) viewStyle.flexDirection = direction;
  if (wrap) viewStyle.flexWrap = wrap;
  if (justify) viewStyle.justifyContent = justify;
  if (align) viewStyle.alignItems = align;

  const other: Record<string, string | ReactNode> = {
    children,
  };

  if (testId) other["data-testid"] = testId;
  if (component) other.component = component;

  return (
    <Bx
      sx={{
        ...viewStyle,
        ...others,
        ...style,
      }}
      {...other}
    />
  );
}
