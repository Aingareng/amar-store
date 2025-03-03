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

  private async request<ResponseType>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ResponseType> {
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

  public get = async <ResponseType>(
    endpoint: string,
    params?: Record<string, string>,
    options: RequestInit = {}
  ) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return await this.request<ResponseType>(`${endpoint}${queryString}`, {
      ...options,
      method: "GET",
    });
  };

  public post = async <ResponseType>(
    endpoint: string,
    data: unknown,
    options: RequestInit = {}
  ) => {
    return await this.request<ResponseType>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  };
  public delete = async <ResponseType>(
    endpoint: string,
    params?: Record<string, string>,
    options: RequestInit = {}
  ) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";

    return await this.request<ResponseType>(`${endpoint}${queryString}`, {
      ...options,
      method: "DELETE",
    });
  };
  public put = async <ResponseType>(
    endpoint: string,
    data: unknown,
    params?: Record<string, string>,
    option: RequestInit = {}
  ) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";

    // console.log("🚀 ~ ApiClient ~ queryString:", queryString);
    // console.log("🚀 ~ ApiClient ~ data:", data);
    // console.log("🚀 ~ ApiClient ~ option:", option);

    return await this.request<ResponseType>(`${endpoint}${queryString}`, {
      ...option,
      method: "PUT",
      body: JSON.stringify(data),
    });
  };

  // Tambahkan method lain seperti put, delete, dll
}
