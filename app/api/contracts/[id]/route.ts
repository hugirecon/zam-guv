import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const contract = await prisma.contract.findUnique({
    where: { id },
    include: {
      proposals: user.role === "admin" ? { include: { user: true } } : false,
    },
  });

  if (!contract) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Feature 1: Track contract view for VPs
  if (user.role === "vp" && user.sessionId) {
    await prisma.contractView.upsert({
      where: {
        contractId_userId_sessionId: {
          contractId: id,
          userId: user.id,
          sessionId: user.sessionId,
        },
      },
      create: {
        contractId: id,
        userId: user.id,
        sessionId: user.sessionId,
      },
      update: {
        viewedAt: new Date(),
      },
    });
  }

  return NextResponse.json(contract);
}
