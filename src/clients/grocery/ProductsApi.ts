import { HttpClient } from "@/clients/http/HttpClient";
import { Product } from "@/model/entity/Product";

export class ProductsApi {
  private readonly client = new HttpClient();

  private readonly basePath: string = "/products";

  async save(product: Product): Promise<Product> {
    return this.client.post({ path: this.basePath, body: product });
  }

  async update(product: Product) {
    return this.client.put({ path: this.basePath, body: product });
  }

  async findById(id: string): Promise<Product> {
    return this.client.get({ path: this.basePath.concat("/", id) });
  }

  async pageable(params: {
    name?: string;
    category?: string;
    last?: string;
    limit: string;
  }): Promise<{ items: Product[]; last?: string }> {
    return this.client.get({ path: this.basePath, params });
  }

  async delete(id: string): Promise<void> {
    return this.client.delete({
      path: this.basePath.concat("/", id),
    });
  }
}
