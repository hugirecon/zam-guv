import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let sessionInfo = null;
  if (user.role === "vp" && user.sessionId) {
    const session = await prisma.session.findUnique({
      where: { id: user.sessionId },
    });
    if (session) {
      sessionInfo = {
        id: session.id,
        startedAt: session.startedAt,
        expiresAt: session.expiresAt,
        locked: session.locked,
        mode: session.mode,
        vehicleType: session.vehicleType,
      };
    }
  }

  return NextResponse.json({ user, session: sessionInfo });
}
