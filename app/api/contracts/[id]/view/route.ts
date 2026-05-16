import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PATCH /api/contracts/[id]/view — update timeSpentMs for a contract view
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "vp" || !user.sessionId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { timeSpentMs } = await req.json();

  if (typeof timeSpentMs !== "number") {
    return NextResponse.json({ error: "timeSpentMs required" }, { status: 400 });
  }

  const view = await prisma.contractView.updateMany({
    where: {
      contractId: id,
      userId: user.id,
      sessionId: user.sessionId,
    },
    data: { timeSpentMs },
  });

  return NextResponse.json({ updated: view.count });
}
