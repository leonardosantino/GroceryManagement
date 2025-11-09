import { AlertColor } from "@mui/material/Alert";

export const DataSnack = {
  addProduct: {
    open: true,
    severity: "success" as AlertColor,
    message: "Produto criado com sucesso.",
  },

  updateProduct: {
    open: true,
    severity: "success" as AlertColor,
    message: "Produto atualizado com sucesso.",
  },

  updateOrderStatus: {
    open: true,
    severity: "success" as AlertColor,
    message: "Status Atualizado.",
  },

  updateOrderStatusError: {
    open: true,
    severity: "error" as AlertColor,
    message: "Houve um problema ao atualizar o status.",
  },

  requiredFieldsError: {
    open: true,
    severity: "error" as AlertColor,
    message: "Os campos obrigatórios não foram preenchidos.",
  },
};
