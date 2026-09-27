import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const patchSchema = z.object({
  id: z.string().min(1),
  handled: z.boolean(),
});

export async function PATCH(req: NextRequest) {
  const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(session))) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  await prisma.contactMessage.update({
    where: { id: parsed.data.id },
    data: { handled: parsed.data.handled },
  });

  return NextResponse.json({ ok: true });
}
