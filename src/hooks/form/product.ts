import { createRef, useRef } from "react";

export function useProductFormRef() {
  return useRef({
    name: createRef<HTMLInputElement>(),
    description: createRef<HTMLInputElement>(),
    category: createRef<HTMLInputElement>(),
    image: createRef<HTMLInputElement>(),
    unit: {
      name: createRef<HTMLInputElement>(),
      description: createRef<HTMLInputElement>(),
      price: createRef<HTMLInputElement>(),
      quantity: createRef<HTMLInputElement>(),
    },
  }).current;
}
