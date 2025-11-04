import { HttpClient } from "@/clients/http/HttpClient";

import { Order } from "@/model/entity/Order";

export class OrdersApi {
  private readonly client = new HttpClient();

  private readonly basePath: string = "/orders";

  async create(request: Order): Promise<Order> {
    return this.client.post({
      path: this.basePath,
      body: request,
    });
  }

  async findById(id: string): Promise<Order> {
    return this.client
      .get({ path: this.basePath.concat("/", id) })
      .then((resp) => Order.from(resp));
  }

  async pageable(params: {
    last?: string;
    status?: string;
    limit: string;
  }): Promise<{ items: Order[]; last?: string }> {
    return this.client.get({ path: this.basePath, params }).then((resp) => ({
      items: resp.items.map((it: Order) => Order.from(it)),
      last: resp.last,
    }));
  }
}
