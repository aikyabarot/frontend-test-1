import axios, { isAxiosError } from "axios";

import { getEnv } from "./env";

export interface FetchJSONOptions {
  query?: Record<string, string | number | boolean | Array<string | number | boolean> | null | undefined>;
  retries?: number;          // default 2 (total attempts = retries + 1)
  retryBaseDelayMs?: number; // default 200
  headers?: Record<string, string>;
}

function normalizeUrl(base: string, path: string): string {
  const b = base.replace(/\/\/+$/, "");
  const p = path.replace(/^\/+/, "");
  return `${b}/${p}`.replace(/(^https?:\/\/)|\/\/+/g, (m, proto) => (proto ? proto : "/"));
}

function appendQuery(url: string, query?: FetchJSONOptions["query"]): string {
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v == null) continue;
    if (Array.isArray(v)) {
      for (const item of v) {
        if (item == null) continue;
        params.append(k, String(item));
      }
    } else {
      params.append(k, String(v));
    }
  }
  const qs = params.toString();
  if (!qs) return url;
  return url.includes("?") ? `${url}&${qs}` : `${url}?${qs}`;
}

function isRetryable(status: number | undefined, err: unknown): boolean {
  if (status === 429) return true;
  if (status && status >= 500) return true;
  if (isAxiosError(err) && !err.response) return true; // network
  return false;
}

function wait(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function fetchJSON<T = unknown>(path: string, options: FetchJSONOptions = {}): Promise<T> {
  const { NEXT_PUBLIC_API_BASE } = getEnv();
  const { query, retries = 2, retryBaseDelayMs = 200, headers = {} } = options;

  const url = appendQuery(normalizeUrl(NEXT_PUBLIC_API_BASE, path), query);

  let attempt = 0;
  const maxAttempts = retries + 1;

  for (;;) {
    attempt++;
    try {
      const res = await axios.get<T>(url, { headers: { Accept: "application/json", ...headers } });
      return res.data;
    } catch (err) {
      const axErr = isAxiosError(err) ? err : undefined;
      const status = axErr?.response?.status as number | undefined;
      if (attempt < maxAttempts && isRetryable(status, err)) {
        const delay = retryBaseDelayMs * Math.pow(2, attempt - 1);
        await wait(delay);
        continue;
      }
      throw err;
    }
  }
}

export const _test = { normalizeUrl, appendQuery };