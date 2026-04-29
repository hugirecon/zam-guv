import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const contractId = searchParams.get("contractId");

  if (user.role === "vp") {
    // VPs see only their own proposals
    const proposals = await prisma.proposal.findMany({
      where: {
        userId: user.id,
        ...(contractId && { contractId }),
      },
      include: { contract: true },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(proposals);
  }

  // Admins see all
  const proposals = await prisma.proposal.findMany({
    where: contractId ? { contractId } : {},
    include: { contract: true, user: { select: { id: true, name: true, email: true } } },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(proposals);
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user || user.role !== "vp") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Validate session
  const sessionId = user.sessionId;
  if (!sessionId) return NextResponse.json({ error: "No active session" }, { status: 400 });

  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session || session.locked || new Date() > session.expiresAt) {
    return NextResponse.json({ error: "Session expired or locked" }, { status: 403 });
  }

  const body = await req.json();
  const { contractId, executiveSummary, technicalApproach, managementApproach, pricingNarrative, pastPerformance, proposedValue } = body;

  // Upsert proposal (one per contract per user)
  const proposal = await prisma.proposal.upsert({
    where: { contractId_userId: { contractId, userId: user.id } },
    update: {
      executiveSummary,
      technicalApproach,
      managementApproach,
      pricingNarrative,
      pastPerformance,
      proposedValue: parseFloat(proposedValue),
      updatedAt: new Date(),
    },
    create: {
      contractId,
      userId: user.id,
      sessionId,
      executiveSummary,
      technicalApproach,
      managementApproach,
      pricingNarrative,
      pastPerformance,
      proposedValue: parseFloat(proposedValue),
    },
  });

  return NextResponse.json(proposal, { status: 201 });
}
