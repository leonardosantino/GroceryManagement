import { HttpClient } from "@/clients/http/HttpClient";
import { User } from "@/model/entity/User";
import { UserResponse } from "@/model/dto/response/UserResponse";

export class UsersApi {
  private readonly client = new HttpClient();

  private readonly basePath: string = "/users";

  async signIn(request: User): Promise<UserResponse> {
    return this.client.post({
      path: this.basePath.concat("/signin"),
      body: request,
    });
  }
}
