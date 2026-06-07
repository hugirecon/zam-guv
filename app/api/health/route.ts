import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", db: "connected" });
  } catch (err) {
    console.error("Health check failed:", err);
    return NextResponse.json(
      { status: "degraded", db: "unavailable", error: String(err) },
      { status: 503 }
    );
  }
}
