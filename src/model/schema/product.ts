import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  categories: z
    .array(z.string())
    .min(1, "Pelo menos uma categoria é obrigatória"),
  images: z.array(z.string()).min(1, "Pelo menos uma imagem é obrigatória"),
  unity: z.object({
    name: z.string().min(1, "Unidade é obrigatório"),
    price: z.number().min(0.1, "Preço é obrigatório"),
    quantity: z.number().min(1, "Quantidade é obrigatória"),
  }),
});

export type ProductFormErrors = {
  name?: string;
  description?: string;
  categories?: string;
  images?: string;
  unity?: {
    name?: string;
    price?: string;
    quantity?: string;
  };
};

export type ZodIssue = { message?: string; path: string[] };

export function getIssueMessageByPath(path: string, issues: ZodIssue[]) {
  return issues.find((issue) => issue.path.join(".") === path)?.message;
}

export function getProductFormIssues(zodIssues?: unknown) {
  const issues = zodIssues as ZodIssue[];

  return {
    name: getIssueMessageByPath("name", issues),
    description: getIssueMessageByPath("description", issues),
    categories: getIssueMessageByPath("categories", issues),
    images: getIssueMessageByPath("images", issues),
    unity: {
      name: getIssueMessageByPath("unity.name", issues),
      price: getIssueMessageByPath("unity.price", issues),
      quantity: getIssueMessageByPath("unity.quantity", issues),
    },
  };
}
