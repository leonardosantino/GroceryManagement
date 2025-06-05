import { Button, Input } from "@mui/material";

function VisuallyHiddenInput() {
  return (
    <Input
      type="file"
      sx={{
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
      }}
    />
  );
}

export function InputFileUpload() {
  return (
    <Button component="label" variant="outlined">
      Selecione
      <VisuallyHiddenInput />
    </Button>
  );
}
