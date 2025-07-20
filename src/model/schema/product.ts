import { RefObject } from "react";
import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  categories: z
    .array(z.string())
    .min(1, "Pelo menos uma categoria é obrigatória"),
  images: z.array(z.string()).min(1, "Pelo menos uma imagem é obrigatória"),
  unit: z.object({
    name: z.string().min(1, "Nome da unidade é obrigatório"),
    description: z.string().min(1, "Descrição da unidade é obrigatória"),
    price: z.number().min(0.1, "Preço é obrigatório"),
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

export type ZodIssue = { message?: string; path: string[] };

export function getIssueMessageByPath(path: string, issues: ZodIssue[]) {
  return issues.find((issue) => issue.path.join(".") === path)?.message;
}

export function refScroll(ref: RefObject<HTMLInputElement | null>) {
  ref.current?.scrollIntoView({ behavior: "smooth" });
}

export function refValue(ref: RefObject<HTMLInputElement | null>): string {
  return ref.current?.value as string;
}

export function getProductFormIssues(issues: ZodIssue[]) {
  return {
    name: getIssueMessageByPath("name", issues),
    description: getIssueMessageByPath("description", issues),
    categories: getIssueMessageByPath("categories", issues),
    images: getIssueMessageByPath("images", issues),
    unit: {
      name: getIssueMessageByPath("unit.name", issues),
      description: getIssueMessageByPath("unit.description", issues),
      price: getIssueMessageByPath("unit.price", issues),
      quantity: getIssueMessageByPath("unit.quantity", issues),
    },
  };
}
