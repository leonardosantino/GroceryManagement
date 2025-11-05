export type ThemeColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "container"
  | "outline"
  | "surface";

export const ColorTheme = {
  primary: "#3f51b5",
  secondary: "#5b5d72",
  tertiary: "#77536d",

  info: "#1565C0",
  success: "#2E7D32",
  warning: "#EF6C00",
  error: "#C62828",

  container: "#ffffff",
  outline: "#e1e1e6",

  surface: "#fafafa",
};

export type ThemeTextColor =
  | "secondary"
  | "tertiary"
  | "white"
  | "info"
  | "success"
  | "warning"
  | "error";
export type ThemeTextSize = "xSmall" | "small" | "large" | "xLarge";
export type ThemeTextWeight = "light" | "bold";

export const TextTheme = {
  secondary: "#7d7d7d",
  tertiary: "#969696",
  white: "#FFFFFF",

  info: "#1565C0",
  success: "#2E7D32",
  warning: "#EF6C00",
  error: "#C62828",

  xSmall: 10,
  small: 12,
  large: 16,
  xLarge: 20,

  light: "300",
  bold: "bold",
};

export type ThemeIconSize = "xSmall" | "small" | "medium" | "large" | "xLarge";

export const IconTheme = {
  xSmall: 16,
  small: 24,
  medium: 32,
  large: 40,
  xLarge: 56,
};

export const boxShadow = {
  insetBottom: `inset 0 -9px 9px 0 ${ColorTheme.outline}`,
  light: `0 0 1px 1px ${ColorTheme.outline}`,
};

export const breakpoint = {
  xSmall: 0,
  small: 600,
  medium: 900,
  large: 1200,
  xLarge: 1536,
};
