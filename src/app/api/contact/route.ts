import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactSchema, isHoneypotTripped } from "@/lib/validate";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { company, ...rest } = (body ?? {}) as Record<string, unknown>;

  if (isHoneypotTripped(company)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(rest);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, a valid email, and a short message." },
      { status: 400 },
    );
  }

  try {
    await prisma.contactMessage.create({ data: parsed.data });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact message failed", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
