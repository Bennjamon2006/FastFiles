import { APIError } from "./APIError";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

type APIErrorResponse = {
  error: string;
  code?: string;
  details?: Record<string, unknown>;
};

const request = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    let errorDetails: APIErrorResponse = {
      error: response.statusText,
    };

    try {
      errorDetails = await response.json();
    } catch {
      // If parsing fails, we can ignore it and use the default error details
    }

    throw new APIError(
      response.status,
      errorDetails.error,
      errorDetails.code,
      errorDetails.details,
    );
  }

  if (response.status === 204) {
    // No content to parse
    return {} as T;
  }

  try {
    return await response.json();
  } catch (error) {
    throw new APIError(
      response.status,
      "Failed to parse response",
      "PARSE_ERROR",
      { originalError: error },
    );
  }
};

const createOptions = (method: string, body?: unknown): RequestInit => {
  const options: RequestInit = {
    method,
  };

  if (body) {
    options.headers = {
      "Content-Type": "application/json",
    };

    options.body = JSON.stringify(body);
  }

  return options;
};

export const apiClient = {
  get: <T>(endpoint: string) => request<T>(endpoint, createOptions("GET")),
  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, createOptions("POST", body)),
  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, createOptions("PUT", body)),
  delete: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, createOptions("DELETE", body)),
  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, createOptions("PATCH", body)),
};
