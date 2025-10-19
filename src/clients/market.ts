import { Product } from "@/model/product";
import { ProductResponse } from "@/model/dto/ProductResponse";
import { ClientHttp } from "@/clients/client/http";

export class MarketApi {
  private readonly client = new ClientHttp();

  private readonly basePath: string = "/products";

  async productSave(product: Product): Promise<Product> {
    return this.client.post({ path: this.basePath, body: product });
  }

  async productUpdate(product: Product) {
    return this.client.put({ path: this.basePath, body: product });
  }

  async findById(id: string): Promise<Product> {
    return this.client.get({
      path: this.basePath.concat("/", id),
    });
  }

  async productFindAll(params: { last: string }): Promise<ProductResponse> {
    return this.client.get({
      path: this.basePath,
      params: { last: params.last, limit: "10" },
    });
  }

  async productDelete(id: string): Promise<void> {
    return this.client.delete({
      path: this.basePath.concat("/", id),
    });
  }
}
