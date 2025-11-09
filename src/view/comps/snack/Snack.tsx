import { Alert, AlertColor, Snackbar } from "@/com/ui/comps";

export { DataSnack } from "@/com/consts/snack";

export type SnackProps = {
  data: {
    open: boolean;
    message?: string;
    severity?: AlertColor;
  };
  onClose?: () => void;
};

const cache: { message?: string; severity?: AlertColor } = {};

export function Snack({ data, onClose }: Readonly<SnackProps>) {
  if (data.open) {
    cache.message = data.message;
    cache.severity = data.severity;
  }

  function onSnackClose(_event?: unknown, reason?: unknown) {
    if (reason === "clickaway") return;

    if (onClose) onClose();
  }

  return (
    <Snackbar
      open={data.open}
      onClose={onSnackClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={cache.severity} variant="filled" onClose={onSnackClose}>
        {cache.message}
      </Alert>
    </Snackbar>
  );
}
