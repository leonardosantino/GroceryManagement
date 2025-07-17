import { Product } from "@/model/product";

export class MarketApi {
  url: string = "http://localhost:3000";

  async productSave(product: Product) {
    const response = await this.post({ path: "/products", body: product });

    return response.json();
  }

  private async post({ path, body }: { path: string; body: unknown }) {
    return fetch(this.url.concat(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}
