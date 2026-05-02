import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const agency = searchParams.get("agency") || "";
  const setAside = searchParams.get("setAside") || "";
  const type = searchParams.get("type") || "";
  const securityClear = searchParams.get("securityClear") || "";
  const vehicleType = searchParams.get("vehicleType") || "";

  const contracts = await prisma.contract.findMany({
    where: {
      status: "active",
      ...(search && {
        OR: [
          { title: { contains: search } },
          { agency: { contains: search } },
          { solicNumber: { contains: search } },
          { description: { contains: search } },
        ],
      }),
      ...(agency && { agency: { contains: agency } }),
      ...(setAside && { setAside }),
      ...(type && { type }),
      ...(securityClear && { securityClear }),
      ...(vehicleType && vehicleType !== 'Standard' && { vehicleType }),
    },
    include: {
      _count: { select: { proposals: true } },
    },
    orderBy: { dueDate: "asc" },
  });

  return NextResponse.json(contracts);
}
