import { Paper as Pa, PaperProps } from "@mui/material";

export function Paper(props: PaperProps) {
  return <Pa variant={"outlined"} {...props} />;
}
