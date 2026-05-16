import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/proposals/[id]/score — admin score override
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { adminScore, adminNotes } = await req.json();

  if (typeof adminScore !== "number" || adminScore < 0 || adminScore > 100) {
    return NextResponse.json({ error: "adminScore must be 0-100" }, { status: 400 });
  }

  try {
    const updated = await prisma.proposal.update({
      where: { id },
      data: {
        adminScore,
        adminNotes: adminNotes || null,
        adminScoredAt: new Date(),
      },
      select: {
        id: true,
        adminScore: true,
        adminNotes: true,
        adminScoredAt: true,
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  }
}
