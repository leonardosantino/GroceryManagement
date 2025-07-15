import { z } from "zod";

export type ProductForm = z.infer<typeof ProductSchema>;

export const ProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  categories: z
    .set(z.string())
    .min(1, "Pelo menos uma categoria é obrigatória"),
  images: z.set(z.string()).min(1, "Pelo menos uma imagem é obrigatória"),
  unit: z.object({
    name: z.string().min(1, "Nome da unidade é obrigatório"),
    description: z.string().min(1, "Descrição da unidade é obrigatória"),
    price: z.string().min(1, "Preço é obrigatório"),
    quantity: z.number().min(1, "Quantidade é obrigatória"),
  }),
});

export type ProductFormErrors = {
  name?: string;
  description?: string;
  categories?: string;
  images?: string;
  unit?: {
    name?: string;
    description?: string;
    price?: string;
    quantity?: string;
  };
};

export function getIssueMessageByPath(
  path: string,
  issues: { message?: string; path: string[] }[],
) {
  return issues.find((issue) => issue.path.join(".") === path)?.message;
}
