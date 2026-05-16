import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "vp" || !user.sessionId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const sessionId = user.sessionId;

  // Verify session is active (not locked, not expired)
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    select: { id: true, locked: true, expiresAt: true, mode: true },
  });

  if (!session || session.locked || new Date() > session.expiresAt) {
    return NextResponse.json({ error: "Session not active" }, { status: 400 });
  }

  // Only count tab switches during assessment mode
  if (session.mode !== "assessment") {
    return NextResponse.json({ ok: true, skipped: true });
  }

  // Create event and increment counter atomically
  await prisma.$transaction([
    prisma.tabSwitchEvent.create({
      data: { userId: user.id, sessionId },
    }),
    prisma.session.update({
      where: { id: sessionId },
      data: { tabSwitchCount: { increment: 1 } },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
