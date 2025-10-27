import { ProductsApi } from "@/clients/grocery/ProductsApi";
import { S3StorageApi } from "@/clients/grocery/S3StorageApi";
import { UsersApi } from "@/clients/grocery/UsersApi";

export class Api {
  static readonly products = new ProductsApi();
  static readonly storage = new S3StorageApi();
  static readonly users = new UsersApi();
}
