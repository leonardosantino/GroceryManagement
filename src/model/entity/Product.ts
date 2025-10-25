import { Unity } from "@/model/objects/Unity";

export class Product {
  constructor(
    public id: string,
    public seller: string,
    public name: string,
    public description: string,
    public categories: string[],
    public images: string[],
    public unity: Unity,

    public updatedAt: string,
  ) {}

  static default() {
    return new Product("", "", "", "", [], [], new Unity("", 0, 0), "");
  }

  static from(product: Partial<Product>) {
    const it = product as Product;
    return new Product(
      it.id,
      it.seller,
      it.name,
      it.description,
      it.categories,
      it.images,
      it.unity,
      it.updatedAt,
    );
  }

  copy({
    id = this.id,
    seller = this.seller,
    name = this.name,
    description = this.description,
    categories = this.categories,
    images = this.images,
    unity = this.unity,
    updatedAt = this.updatedAt,
  }: Partial<Product> = {}) {
    return new Product(
      id,
      seller,
      name,
      description,
      categories,
      images,
      unity,
      updatedAt,
    );
  }
}
