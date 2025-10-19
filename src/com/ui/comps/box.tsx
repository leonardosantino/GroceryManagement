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
  style?: BoxStyle;
  children?: ReactNode;
  testId?: string;
};

export function Box(props: Readonly<BoxProps>) {
  const {
    flex,
    direction,
    wrap,
    justify,
    align,
    style,
    children,
    testId,
    ...others
  } = props;

  const viewStyle: BoxStyle = {
    display: "flex",
  };

  if (flex) viewStyle.flexGrow = flex;
  if (direction) viewStyle.flexDirection = direction;
  if (wrap) viewStyle.flexWrap = wrap;
  if (justify) viewStyle.justifyContent = justify;
  if (align) viewStyle.alignItems = align;

  return (
    <Bx
      data-testid={testId}
      sx={{
        ...viewStyle,
        ...others,
        ...style,
      }}
    >
      {children}
    </Bx>
  );
}
