import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  locale: z.enum(["en", "bn"]).default("en"),
  source: z.string().max(64).optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  message: z.string().trim().min(10).max(4000),
});

/** Honeypot: a hidden form field real visitors never fill in. Bots often do. */
export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.length > 0;
}

export const adminLoginSchema = z.object({
  password: z.string().min(1).max(256),
});
