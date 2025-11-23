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

function setCache(it: { message?: string; severity?: AlertColor }) {
  cache.message = it.message;
  cache.severity = it.severity;
}

export function Snack({ data, onClose }: Readonly<SnackProps>) {
  if (data.open) setCache(data);

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
