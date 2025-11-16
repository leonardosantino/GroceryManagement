import { HttpClient } from "@/clients/http/HttpClient";
import { Customer } from "@/model/entity/Customer";

export class CustomersApi {
  private readonly client = new HttpClient();

  private readonly basePath: string = "/customers";

  async pageable(params: {
    name?: string;
    last?: string;
    limit: string;
  }): Promise<{ items: Customer[]; last?: string }> {
    return this.client
      .get({ path: this.basePath.concat("/pageable"), params })
      .then((resp) => ({
        items: resp.items.map((it: Customer) => Customer.from(it)),
        last: resp.last,
      }));
  }
}
