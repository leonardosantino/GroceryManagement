import { ErrorResponse } from "@/clients/http/ErrorResponse";
import { SessionStorage } from "@/clients/storage/SessionStorage";
import { isStatusNotAuthorized } from "@/clients/http/status";

export class HttpClient {
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL as string;
  private readonly contentType = {
    "Content-Type": "application/json",
  };
  private readonly accept = {
    Accept: "application/json",
  };
  private readonly bearer = "Bearer ";

  private readonly sessionStorage = new SessionStorage();

  async post({ path, body }: { path: string; body: unknown }) {
    const headers = { ...this.contentType, ...this.accept };

    this.setAuthorizationHeader(headers);

    const response = await fetch(this.baseUrl.concat(path), {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (response.ok) return response.json();

    return this.errorResponse(response);
  }

  async upload({ path, body }: { path: string; body: File }) {
    const headers = { ...this.accept };

    this.setAuthorizationHeader(headers);

    const data = new FormData();

    data.append("file", body);

    const response = await fetch(this.baseUrl.concat(path), {
      method: "POST",
      headers,
      body: data,
    });

    if (response.ok) return response.json();

    return this.errorResponse(response);
  }

  async put({ path, body }: { path: string; body: unknown }) {
    const headers = { ...this.contentType, ...this.accept };

    this.setAuthorizationHeader(headers);

    const response = await fetch(this.baseUrl.concat(path), {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (response.ok) return response.json();

    return this.errorResponse(response);
  }

  async get(request: { path: string; params?: Record<string, string> }) {
    const headers = { ...this.accept };
    const params = this.getParams(request.params);

    this.setAuthorizationHeader(headers);

    const response = await fetch(this.baseUrl.concat(request.path, params), {
      method: "GET",
      headers,
    });

    if (response.ok) return response.json();

    return this.errorResponse(response);
  }

  async delete({ path }: { path: string }) {
    const headers = { ...this.accept };

    this.setAuthorizationHeader(headers);

    await fetch(this.baseUrl.concat(path), {
      method: "DELETE",
      headers,
    });
  }

  private getParams(params?: Record<string, string>) {
    if (!params) return "";

    const paramsString = new URLSearchParams(params).toString();

    return "?".concat(paramsString);
  }

  private setAuthorizationHeader(headers: Record<string, string>) {
    const { token } = this.sessionStorage.getSession();
    if (token) headers.Authorization = this.bearer.concat(token);
  }

  private deleteSessionIfUnauthorized(response: Response) {
    if (isStatusNotAuthorized(response.status))
      this.sessionStorage.deleteSession();
  }

  private async errorResponse(response: Response) {
    const resp = await response.json();

    this.deleteSessionIfUnauthorized(response);

    throw new ErrorResponse({
      status: response.status,
      message: resp.message,
    });
  }
}
