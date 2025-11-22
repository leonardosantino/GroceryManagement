import { HttpClient } from "@/clients/http/HttpClient";
import { Seller } from "@/model/entity/Seller";

export class SellersApi {
  private readonly client = new HttpClient();

  private readonly basePath: string = "/sellers";

  async findById(id: string): Promise<Seller> {
    return this.client
      .get({
        path: this.basePath.concat("/", id),
      })
      .then((resp) => Seller.from(resp));
  }
}
