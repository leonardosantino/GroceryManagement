import { Product } from "@/model/product";
import { ProductResponse } from "@/model/dto/ProductResponse";

export class MarketApi {
  private readonly url: string = "http://localhost:8080";
  private readonly headers: HeadersInit = {
    seller: "1",
  };

  async productSave(product: Product): Promise<Product> {
    const response = await this.post({ path: "/products", body: product });

    return response;
  }

  async productFindAll(params: { last: string }): Promise<ProductResponse> {
    const response = await this.get({
      path: "/products",
      params: { last: params.last, limit: "10" },
    });

    return response;
  }

  private async post({ path, body }: { path: string; body: unknown }) {
    const response = await fetch(this.url.concat(path), {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    return response.json();
  }

  private async get(request: {
    path: string;
    params: { [key: string]: string };
  }) {
    const params = new URLSearchParams(request.params);

    const response = await fetch(
      this.url.concat(request.path, "?", params.toString()),
      {
        method: "GET",
        headers: this.headers,
      },
    );
    return response.json();
  }
}
