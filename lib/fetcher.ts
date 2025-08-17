import axios from "axios";
import { getEnv } from "./env";

export async function fetchJSON<T>(path: string): Promise<T> {
  const { NEXT_PUBLIC_API_BASE } = getEnv();
  const base = NEXT_PUBLIC_API_BASE.replace(/\/$/, "");
  const cleaned = path.replace(/^\/+ , "");
  const url = `${base}/${cleaned}`;
  const res = await axios.get<T>(url, { headers: { Accept: "application/json" } });
  return res.data;
}