import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { waitlistSchema, isHoneypotTripped } from "@/lib/validate";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { company, ...rest } = (body ?? {}) as Record<string, unknown>;

  // Bots that fill the hidden honeypot field get a fake success, no write.
  if (isHoneypotTripped(company)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = waitlistSchema.safeParse(rest);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    await prisma.waitlistSignup.create({ data: parsed.data });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      // Already on the list — treat it as a success from the visitor's side.
      return NextResponse.json({ ok: true });
    }
    console.error("waitlist signup failed", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
