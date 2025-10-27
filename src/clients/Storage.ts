import { SessionStorage } from "@/clients/storage/SessionStorage";

export class Storage {
  static readonly session = new SessionStorage();
}
