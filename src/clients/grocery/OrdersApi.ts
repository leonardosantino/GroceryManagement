import { HttpClient } from "@/clients/http/HttpClient";

import { Order } from "@/model/entity/Order";

export class OrdersApi {
  private readonly client = new HttpClient();

  private readonly basePath: string = "/seller/orders";

  async updateStatus(request: OrderStatusUpdateRequest): Promise<void> {
    return this.client.patch({
      path: this.basePath.concat("/", request.id, "/status"),
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
  }): Promise<{ items: Order[]; last?: string, first?: string }> {
    return this.client.get({ path: this.basePath, params }).then((resp) => ({
      items: resp.items.map((it: Order) => Order.from(it)),
      last: resp.last,
    }));
  }
}

export class OrderStatusUpdateRequest {
  id: string;
  description: string;
}
