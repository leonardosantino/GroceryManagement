import { Product } from "@/model/product";

export class MarketApi {
  private readonly url: string = "http://localhost:3000";
  private readonly headers: HeadersInit = {
    seller: "1",
  };

  async productSave(product: Product): Promise<Product> {
    const response = await this.post({ path: "/products", body: product });

    return response;
  }

  async productFindAll(): Promise<{ items: Product[] }> {
    const response = await this.get({ path: "/products" });

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

  private async get({ path }: { path: string }) {
    const response = await fetch(this.url.concat(path), {
      method: "GET",
      headers: this.headers,
    });

    return response.json();
  }
}
