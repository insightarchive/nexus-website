import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  // Also enforced by middleware.ts; checked again here so this endpoint is
  // safe even if it's ever called directly.
  const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(session))) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const [waitlist, messages] = await Promise.all([
    prisma.waitlistSignup.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return NextResponse.json({ ok: true, waitlist, messages });
}
