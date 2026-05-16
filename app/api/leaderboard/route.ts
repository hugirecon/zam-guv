import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getAuthUser();
    const cohortId = req.nextUrl.searchParams.get("cohortId") || null;

    // All VP users with their scored, submitted proposals
    const users = await prisma.user.findMany({
      where: { role: "vp", ...(cohortId ? { cohortId } : {}) },
      select: {
        id: true,
        name: true,
        proposals: {
          where: { status: "submitted" },
          select: {
            aiScore: true,
            adminScore: true,
            session: { select: { vehicleType: true, locked: true } },
          },
        },
      },
    });

    const entries = users.map((u) => {
      // Feature 3: use adminScore if set, else aiScore
      const scoredProposals = u.proposals.filter(
        (p) => p.adminScore != null || p.aiScore != null
      );
      const scores = scoredProposals.map((p) => p.adminScore ?? p.aiScore!);
      const hasAdminOverride = u.proposals.some((p) => p.adminScore != null);

      const compositeScore =
        scores.length > 0
          ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
          : null;
      const bestScore =
        scores.length > 0 ? Math.round(Math.max(...scores) * 10) / 10 : null;

      const vehiclesCompleted = new Set(
        u.proposals
          .filter((p) => p.session?.locked)
          .map((p) => p.session?.vehicleType)
          .filter(Boolean)
      ).size;

      return {
        userId: u.id,
        name: u.name,
        compositeScore,
        proposalCount: u.proposals.length,
        vehiclesCompleted,
        bestScore,
        hasAdminOverride,
        isCurrentUser: currentUser?.id === u.id,
      };
    });

    // Scored users by composite desc, unscored at bottom
    entries.sort((a, b) => {
      if (a.compositeScore === null && b.compositeScore === null) return 0;
      if (a.compositeScore === null) return 1;
      if (b.compositeScore === null) return -1;
      return b.compositeScore - a.compositeScore;
    });

    // Assign ranks — ties share a rank
    let rank = 1;
    const ranked = entries.map((e, i) => {
      if (i > 0 && e.compositeScore !== entries[i - 1].compositeScore) {
        rank = i + 1;
      }
      return { ...e, rank: e.compositeScore !== null ? rank : null };
    });

    return NextResponse.json({ entries: ranked });
  } catch (err) {
    console.error("Leaderboard error:", err);
    return NextResponse.json({ entries: [] });
  }
}
