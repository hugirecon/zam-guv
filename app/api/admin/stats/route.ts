import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [
    totalContracts,
    totalProposals,
    submittedProposals,
    scoredProposals,
    totalVPs,
    activeSessions,
  ] = await Promise.all([
    prisma.contract.count(),
    prisma.proposal.count(),
    prisma.proposal.count({ where: { status: "submitted" } }),
    prisma.proposal.count({ where: { aiScore: { not: null } } }),
    prisma.user.count({ where: { role: "vp" } }),
    prisma.session.count({ where: { locked: false, expiresAt: { gt: new Date() } } }),
  ]);

  const topScored = await prisma.proposal.findMany({
    where: { aiScore: { not: null } },
    orderBy: { aiScore: "desc" },
    take: 5,
    include: {
      contract: { select: { title: true, solicNumber: true } },
      user: { select: { name: true } },
    },
  });

  const byAgency = await prisma.contract.groupBy({
    by: ["agency"],
    _count: true,
    orderBy: { _count: { agency: "desc" } },
    take: 8,
  });

  const byVehicleType = await prisma.contract.groupBy({
    by: ["vehicleType"],
    _count: true,
    orderBy: { _count: { vehicleType: "desc" } },
  });

  return NextResponse.json({
    totalContracts,
    totalProposals,
    submittedProposals,
    scoredProposals,
    totalVPs,
    activeSessions,
    topScored,
    byAgency,
    byVehicleType,
  });
}
