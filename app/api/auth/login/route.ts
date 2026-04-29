import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken, getOrCreateVPSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  let sessionId: string | undefined;
  if (user.role === "vp") {
    const session = await getOrCreateVPSession(user.id);
    sessionId = session.id;
  }

  const token = signToken({ userId: user.id, role: user.role, sessionId });

  const res = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    sessionId,
  });

  res.cookies.set("zam-token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 8 * 60 * 60, // 8 hours
    sameSite: "lax",
  });

  return res;
}
