import { z } from "zod";

const envSchema = z.object({
  AUTH_SECRET: z.string().min(32).refine((value) => !value.startsWith("replace-"), "Replace the example AUTH_SECRET with a generated secret.").optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  DEMO_STAFF_PHONE: z.string().optional(),
  DEMO_STAFF_NAME: z.string().optional(),
  DEMO_STAFF_PASSWORD_HASH: z.string().optional(),
});

const parsed = envSchema.safeParse({
  AUTH_SECRET: process.env.AUTH_SECRET || undefined,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  DEMO_STAFF_PHONE: process.env.DEMO_STAFF_PHONE || undefined,
  DEMO_STAFF_NAME: process.env.DEMO_STAFF_NAME || undefined,
  DEMO_STAFF_PASSWORD_HASH: process.env.DEMO_STAFF_PASSWORD_HASH || undefined,
});

if (!parsed.success) {
  throw new Error(`Invalid environment configuration: ${parsed.error.issues.map((issue) => issue.message).join("; ")}`);
}

export const env = parsed.data;

export function requireAuthSecret() {
  if (!env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is required. Copy .env.example to .env.local and generate a secret as described in README.md.");
  }
  return env.AUTH_SECRET;
}
