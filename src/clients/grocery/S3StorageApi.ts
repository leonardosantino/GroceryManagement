import { HttpClient } from "@/clients/http/HttpClient";
import { UploadResponse } from "@/model/dto/response/UploadResponse";

export class S3StorageApi {
  private readonly client = new HttpClient();

  private readonly basePath: string = "/storage";

  async upload(file: File): Promise<UploadResponse> {
    return this.client.upload({ path: this.basePath, body: file });
  }
}
