// src/api/http.ts
const API_BASE = __API_BASE__ ?? '';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class HttpError extends Error {
  status: number;
  body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

async function parseBody(res: Response) {
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json().catch(() => null);
  }
  return res.text().catch(() => '');
}

export async function request<TResponse>(
  path: string,
  options?: {
    method?: HttpMethod;
    body?: unknown;
    headers?: HeadersInit;
  }
): Promise<TResponse> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: options?.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await parseBody(res);

  if (!res.ok) {
    const msg =
      (typeof data === 'string' && data) ||
      (data &&
        typeof data === 'object' &&
        'message' in (data as any) &&
        String((data as any).message)) ||
      `Request failed (${res.status})`;

    throw new HttpError(msg, res.status, data);
  }

  return data as TResponse;
}
