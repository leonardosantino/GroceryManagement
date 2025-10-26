import { ProductsApi } from "@/clients/grocery/ProductsApi";
import { S3StorageApi } from "@/clients/grocery/S3StorageApi";

export class Api {
  static readonly products = new ProductsApi();
  static readonly storage = new S3StorageApi();
}
