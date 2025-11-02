import { Alert, AlertColor, Snackbar } from "@/com/ui/comps";

export { snackData } from "@/view/comps/snack/data";

export type SnackData = {
  open: boolean;
  message?: string;
  onClose?: () => void;
  severity?: AlertColor;
};

const snack: { data: SnackData } = { data: { open: false } };

export function Snack({ data }: Readonly<{ data: SnackData }>) {
  function onClose(_event?: unknown, reason?: unknown) {
    if (reason === "clickaway") return;

    snack.data.open = false;

    if (data.onClose) data.onClose();
  }

  if (data.open) snack.data = data;

  return (
    <Snackbar
      open={snack.data.open}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={snack.data.severity} variant="filled" onClose={onClose}>
        {snack.data.message}
      </Alert>
    </Snackbar>
  );
}
