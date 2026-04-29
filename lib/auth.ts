import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "zam-guv-dev-secret";

export interface TokenPayload {
  userId: string;
  role: string;
  sessionId?: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("zam-token")?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true, role: true },
  });
  return user ? { ...user, sessionId: payload.sessionId } : null;
}

export async function getOrCreateVPSession(userId: string) {
  // Find an active (non-expired, non-locked) session
  const now = new Date();
  const existing = await prisma.session.findFirst({
    where: {
      userId,
      locked: false,
      expiresAt: { gt: now },
    },
    orderBy: { startedAt: "desc" },
  });
  if (existing) return existing;

  // Create a fresh 30-minute session
  return prisma.session.create({
    data: {
      userId,
      expiresAt: new Date(now.getTime() + 30 * 60 * 1000), // 30 minutes
    },
  });
}
