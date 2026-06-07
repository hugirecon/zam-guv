import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken, getOrCreateVPSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

// In-memory rate limiter (per-IP, resets per serverless instance)
// For production: replace with Upstash Redis rate limiting
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 10; // max 10 attempts per 15 min window

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  record.count++;
  return { allowed: true };
}

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_APP_URL || "https://zam-guv.vercel.app";

export async function POST(req: NextRequest) {
  // CORS: restrict to app origin only
  const origin = req.headers.get("origin");
  if (origin && origin !== ALLOWED_ORIGIN && !origin.includes("localhost")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limiting by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateCheck.retryAfterSeconds),
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
        },
      }
    );
  }

  let body: { email?: string; password?: string; vehicleType?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, password, vehicleType = "Standard" } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const loginToken = randomUUID();

    let sessionId: string | undefined;
    if (user.role === "vp") {
      const trainingMode = user.currentModule <= 2;
      const session = await getOrCreateVPSession(user.id, trainingMode, vehicleType, loginToken);
      sessionId = session.id;
    }

    const token = signToken({ userId: user.id, role: user.role, sessionId, loginToken });

    const res = NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      sessionId,
      currentModule: user.currentModule,
    });

    res.cookies.set("zam-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 8 * 60 * 60,
      sameSite: "lax",
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
  }
}
