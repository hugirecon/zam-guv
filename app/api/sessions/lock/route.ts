import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Called when session timer hits 0 — auto-submits all drafts and locks session
export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user || user.role !== "vp") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { sessionId } = await req.json();
  if (!sessionId || sessionId !== user.sessionId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });
  if (session.locked) return NextResponse.json({ message: "Already locked" });

  // Auto-submit all draft proposals in this session
  const drafts = await prisma.proposal.findMany({
    where: { sessionId, status: "draft" },
  });

  const autoSubmitResults = [];
  for (const draft of drafts) {
    const updated = await prisma.proposal.update({
      where: { id: draft.id },
      data: {
        status: "submitted",
        submittedAt: new Date(),
        autoSubmitted: true,
      },
    });
    autoSubmitResults.push(updated.id);
  }

  // Lock the session
  await prisma.session.update({
    where: { id: sessionId },
    data: { locked: true, lockedAt: new Date() },
  });

  return NextResponse.json({
    locked: true,
    autoSubmitted: autoSubmitResults.length,
    proposalIds: autoSubmitResults,
  });
}
