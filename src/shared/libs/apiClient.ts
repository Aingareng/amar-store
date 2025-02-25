interface ApiErrorResponse {
  message: string;
  [key: string]: unknown;
}
export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public data: ApiErrorResponse
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClient {
  private baseUrl: string;

  constructor(endpoint: string) {
    this.baseUrl = endpoint;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = options.body
      ? {
          "Content-Type": "application/json",
          ...options.headers,
        }
      : options.headers;

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        })
      );
    }

    return await response.json();
  }

  public get = async <T>(
    endpoint: string,
    params?: Record<string, string>,
    options: RequestInit = {}
  ) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return await this.request<T>(`${endpoint}${queryString}`, {
      ...options,
      method: "GET",
    });
  };

  public post = <T>(
    endpoint: string,
    data: unknown,
    options: RequestInit = {}
  ) => {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  // Tambahkan method lain seperti put, delete, dll
}
