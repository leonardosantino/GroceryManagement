import { HttpClient } from "@/clients/http/HttpClient";
import { Product } from "@/model/entity/Product";

export class ProductsApi {
  private readonly client = new HttpClient();

  private readonly basePath: string = "/seller/products";

  async save(product: Product): Promise<Product> {
    return this.client
      .post({ path: this.basePath, body: product })
      .then((it) => Product.from(it));
  }

  async update(product: Product): Promise<void> {
    return this.client.put({ path: this.basePath, body: product });
  }

  async findById(id: string): Promise<Product> {
    return this.client
      .get({ path: this.basePath.concat("/", id) })
      .then((it) => Product.from(it));
  }

  async pageable(params: {
    name?: string;
    categories?: string;
    last?: string;
    limit: string;
  }): Promise<{ items: Product[]; last?: string }> {
    return this.client.get({ path: this.basePath, params }).then((it) => ({
      items: it.items.map((item: Product) => Product.from(item)),
      last: it.last,
    }));
  }

  async delete(id: string): Promise<void> {
    return this.client.delete({
      path: this.basePath.concat("/", id),
    });
  }
}
