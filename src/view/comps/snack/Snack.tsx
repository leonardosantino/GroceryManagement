import { Alert, AlertColor, Snackbar } from "@/com/ui/comps";

export { snackData } from "@/view/comps/snack/data";

export type SnackData = {
  open: boolean;
  message?: string;
  onClose?: () => void;
  severity?: AlertColor;
};

export function Snack({ data }: Readonly<{ data: SnackData }>) {
  function onClose(_event?: unknown, reason?: unknown) {
    if (reason === "clickaway") return;

    if (data.onClose) data.onClose();
  }

  return (
    <Snackbar
      open={data.open}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={data.severity} variant="filled" onClose={onClose}>
        {data.message}
      </Alert>
    </Snackbar>
  );
}
