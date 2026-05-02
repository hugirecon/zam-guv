import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, signToken, getOrCreateVPSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "vp") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { vehicleType, mode } = await req.json();
  const trainingMode = mode === "training";

  const session = await getOrCreateVPSession(user.id, trainingMode, vehicleType);

  const token = signToken({ userId: user.id, role: user.role, sessionId: session.id });

  const res = NextResponse.json({
    sessionId: session.id,
    vehicleType: session.vehicleType,
    mode: session.mode,
    expiresAt: session.expiresAt,
    locked: session.locked,
  });

  res.cookies.set("zam-token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 8 * 60 * 60,
    sameSite: "lax",
  });

  return res;
}
