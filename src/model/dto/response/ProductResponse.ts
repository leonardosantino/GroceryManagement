import { Product } from "@/model/entity/Product";

export class ProductResponse {
  items: Product[];
  last: string;
}
