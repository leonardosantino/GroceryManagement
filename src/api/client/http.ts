export class ClientHttp {
  private readonly baseUrl: string = "http://localhost:8080";
  private readonly headers: HeadersInit = {
    seller: "1",
    "Content-Type": "application/json",
  };

  async post({ path, body }: { path: string; body: unknown }) {
    const response = await fetch(this.baseUrl.concat(path), {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    return response.json();
  }

  async put({ path, body }: { path: string; body: unknown }) {
    await fetch(this.baseUrl.concat(path), {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async get(request: { path: string; params?: Record<string, string> }) {
    const params = new URLSearchParams(request.params);

    const response = await fetch(
      this.baseUrl.concat(request.path, "?", params.toString()),
      {
        method: "GET",
        headers: this.headers,
      },
    );
    return response.json();
  }

  async delete({ path }: { path: string }) {
    await fetch(this.baseUrl.concat(path), {
      method: "DELETE",
      headers: this.headers,
    });
  }
}
