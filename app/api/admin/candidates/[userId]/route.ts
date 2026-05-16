import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await params;

  const candidate = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      currentModule: true,
      cohort: { select: { id: true, name: true } },
      sessions: {
        orderBy: { startedAt: "desc" },
        select: {
          id: true,
          vehicleType: true,
          mode: true,
          startedAt: true,
          expiresAt: true,
          locked: true,
          lockedAt: true,
          tabSwitchCount: true,
          proposals: {
            select: {
              id: true,
              status: true,
              submittedAt: true,
              aiScore: true,
              adminScore: true,
              createdAt: true,
              updatedAt: true,
              contract: { select: { id: true, title: true, solicNumber: true } },
            },
          },
          contractViews: {
            select: {
              id: true,
              contractId: true,
              viewedAt: true,
              timeSpentMs: true,
              contract: { select: { title: true, solicNumber: true } },
            },
          },
        },
      },
    },
  });

  if (!candidate) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Compute behavioral stats
  const allProposals = candidate.sessions.flatMap((s) => s.proposals);
  const submittedProposals = allProposals.filter((p) => p.status === "submitted");
  const allViews = candidate.sessions.flatMap((s) => s.contractViews);

  const viewedContractIds = new Set(allViews.map((v) => v.contractId));
  const proposedContractIds = new Set(submittedProposals.map((p) => p.contract.id));
  const bidRate =
    viewedContractIds.size > 0
      ? Math.round((proposedContractIds.size / viewedContractIds.size) * 100)
      : null;

  const timedViews = allViews.filter((v) => v.timeSpentMs != null);
  const avgTimePerProposal =
    timedViews.length > 0
      ? Math.round(timedViews.reduce((a, v) => a + (v.timeSpentMs ?? 0), 0) / timedViews.length)
      : null;

  // Submission timing: for each submitted proposal, time from session start
  const submissionTimings = submittedProposals
    .filter((p) => p.submittedAt)
    .map((p) => {
      const session = candidate.sessions.find((s) =>
        s.proposals.some((sp) => sp.id === p.id)
      );
      if (!session) return null;
      const msFromStart = new Date(p.submittedAt!).getTime() - new Date(session.startedAt).getTime();
      return Math.round(msFromStart / 60000); // minutes
    })
    .filter((t): t is number => t !== null);

  return NextResponse.json({
    candidate,
    stats: {
      totalSessions: candidate.sessions.length,
      totalViews: allViews.length,
      uniqueContractsViewed: viewedContractIds.size,
      totalProposals: allProposals.length,
      submittedProposals: submittedProposals.length,
      bidRate,
      avgTimePerProposalMs: avgTimePerProposal,
      submissionTimings,
    },
  });
}
