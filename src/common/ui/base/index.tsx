import { Badge, BadgeProps, Box, styled, Typography } from "@mui/material";

export const Sx = {
  Main: styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "inherit",
  }),
  MainPadding: styled(Box)({
    padding: 8,
  }),

  Box: styled(Box)({
    display: "flex",
  }),

  Div: styled(Box)({}),

  Text: styled(Typography)({
    wordWrap: "break-word",
  }),

  Strong: styled("strong")({
    color: "black",
  }),

  StyledBadge: styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -4,
      top: 4,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  })),

  StickyNavigationTop: styled(Box)({
    position: "sticky",
    top: 0,
  }),

  StickyNavigationBottom: styled(Box)({
    position: "sticky",
    bottom: 0,
  }),
};
