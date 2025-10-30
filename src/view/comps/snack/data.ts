import { SnackData } from "@/view/comps/snack/Snack";

const addProduct: SnackData = {
  open: true,
  severity: "success",
  message: "Produto criado com sucesso.",
};

const updateProduct: SnackData = {
  open: true,
  severity: "success",
  message: "Produto atualizado com sucesso.",
};

const requiredFieldsError: SnackData = {
  open: true,
  severity: "error",
  message: "Os campos obrigatórios não foram preenchidos.",
};

export const snackData = {
  addProduct,
  updateProduct,
  requiredFieldsError,
};
