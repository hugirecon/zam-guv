import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const currentUser = await getAuthUser();

    // All VP users with their scored, submitted proposals
    const users = await prisma.user.findMany({
      where: { role: "vp" },
      select: {
        id: true,
        name: true,
        proposals: {
          where: { status: "submitted", aiScore: { not: null } },
          select: {
            aiScore: true,
            session: { select: { vehicleType: true, locked: true } },
          },
        },
      },
    });

    const entries = users.map((u) => {
      const scores = u.proposals.map((p) => p.aiScore!);
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
