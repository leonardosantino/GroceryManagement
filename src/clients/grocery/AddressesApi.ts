import { HttpClient } from "@/clients/http/HttpClient";

import { Address } from "@/model/entity/Address";

export class AddressesApi {
  private readonly client = new HttpClient();

  private readonly basePath: string = "/seller/addresses";

  async findByUser(id: string): Promise<Address> {
    return this.client
      .get({ path: this.basePath.concat("/", id) })
      .then((resp) => Address.from(resp));
  }
}
