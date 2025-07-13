import { Button, Input } from "@mui/material";
import { ChangeEvent } from "react";

export function InputFileUpload({
  onChange,
}: Readonly<{
  onChange: (files: FileList) => void;
}>) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.files as FileList);
    e.target.value = "";
  }

  return (
    <Button component="label" variant="outlined">
      Selecione
      <VisuallyHiddenInput onChange={handleChange} />
    </Button>
  );
}

function VisuallyHiddenInput({
  onChange,
}: Readonly<{
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}>) {
  return (
    <Input
      type="file"
      onChange={onChange}
      inputProps={{ accept: "image/*" }}
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
