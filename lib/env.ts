import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_API_BASE: z.string().url().default("https://api.example.com")
});

type Env = z.infer<typeof schema>;

let cached: Env | null = null;

export function getEnv(): Env {
  if (cached) return cached;
  const parsed = schema.safeParse({
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE
  });
  if (!parsed.success) {
    // Fail fast in build/runtime for invalid configuration
    console.error("Environment validation error", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment configuration");
  }
  cached = parsed.data;
  return cached;
}
