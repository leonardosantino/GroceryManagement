import { SxProps, Theme, Typography } from "@mui/material";

type Props = {
  children: string;
  sx?: SxProps<Theme>;
};

export function Text({ children, sx }: Props) {
  return (
    <Typography
      sx={{
        wordWrap: "break-word",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
