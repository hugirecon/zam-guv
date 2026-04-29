import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const sessions = await prisma.session.findMany({
    orderBy: { startedAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { proposals: true } },
    },
  });

  return NextResponse.json(sessions);
}
