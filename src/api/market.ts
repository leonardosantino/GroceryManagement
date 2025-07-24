import { Product } from "@/model/product";
import { ProductResponse } from "@/model/dto/ProductResponse";

export class MarketApi {
  private readonly basePath: string = "/products";
  private readonly baseUrl: string = "http://localhost:8080";
  private readonly headers: HeadersInit = {
    seller: "1",
    "Content-Type": "application/json",
  };

  async productSave(product: Product): Promise<Product> {
    return await this.post({ path: this.basePath, body: product });
  }

  async productUpdate(product: Product): Promise<Product> {
    return this.put({ path: this.basePath, body: product });
  }

  async findById(id: string): Promise<Product> {
    return this.get({
      path: this.basePath.concat("/", id),
    });
  }

  async productFindAll(params: { last: string }): Promise<ProductResponse> {
    return this.get({
      path: this.basePath,
      params: { last: params.last, limit: "10" },
    });
  }

  private async post({ path, body }: { path: string; body: unknown }) {
    const response = await fetch(this.baseUrl.concat(path), {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    return response.json();
  }

  private async put({ path, body }: { path: string; body: unknown }) {
    const response = await fetch(this.baseUrl.concat(path), {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    return response.json();
  }

  private async get(request: {
    path: string;
    params?: Record<string, string>;
  }) {
    const params = new URLSearchParams(request.params);

    const response = await fetch(
      this.baseUrl.concat(request.path, "?", params.toString()),
      {
        method: "GET",
        headers: this.headers,
      },
    );
    return response.json();
  }
}
