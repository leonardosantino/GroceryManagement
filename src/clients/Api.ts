import { ProductsApi } from "@/clients/grocery/ProductsApi";

export class Api {
  static readonly products = new ProductsApi();
}
