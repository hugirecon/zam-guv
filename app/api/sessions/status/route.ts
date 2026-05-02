import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VEHICLE_TYPES = ["Standard", "IDIQ", "OTA", "GSA", "SBIR"] as const;

type VehicleStatus = {
  sessionId: string;
  mode: string;
  locked: boolean;
  expiresAt: Date;
  proposalCount: number;
} | null;

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "vp") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const sessions = await prisma.session.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      vehicleType: true,
      mode: true,
      locked: true,
      expiresAt: true,
      startedAt: true,
      _count: { select: { proposals: true } },
    },
    orderBy: { startedAt: "desc" },
  });

  const result: Record<string, VehicleStatus> = {};

  for (const vt of VEHICLE_TYPES) {
    const session = sessions.find((s) => s.vehicleType === vt);
    result[vt] = session
      ? {
          sessionId: session.id,
          mode: session.mode,
          locked: session.locked,
          expiresAt: session.expiresAt,
          proposalCount: session._count.proposals,
        }
      : null;
  }

  return NextResponse.json(result);
}
