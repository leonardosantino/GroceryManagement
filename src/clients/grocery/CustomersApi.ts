import { HttpClient } from "@/clients/http/HttpClient";
import { Customer } from "@/model/entity/Customer";
import { OrderStatusUpdateRequest } from "@/clients/grocery/OrdersApi";

export class CustomersApi {
  private readonly client = new HttpClient();

  private readonly basePath: string = "/seller/customers";

  async findById(id: string): Promise<Customer> {
    return this.client
      .get({
        path: this.basePath.concat("/", id),
      })
      .then((resp) => Customer.from(resp));
  }

  async updateStatus(request: OrderStatusUpdateRequest): Promise<void> {
    return this.client.patch({
      path: this.basePath.concat("/", request.id, "/status"),
      body: request,
    });
  }

  async pageable(params: {
    name?: string;
    status?: string;
    last?: string;
    limit: string;
  }): Promise<{ items: Customer[]; last?: string }> {
    return this.client.get({ path: this.basePath, params }).then((resp) => ({
      items: resp.items.map((it: Customer) => Customer.from(it)),
      last: resp.last,
    }));
  }
}
