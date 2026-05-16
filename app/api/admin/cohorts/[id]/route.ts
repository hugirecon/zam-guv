import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const cohort = await prisma.cohort.findUnique({
    where: { id },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          currentModule: true,
          proposals: {
            where: { status: "submitted" },
            select: { aiScore: true, adminScore: true },
          },
          sessions: {
            select: { vehicleType: true, locked: true },
          },
        },
      },
    },
  });

  if (!cohort) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(cohort);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { name, description } = await req.json();

  const cohort = await prisma.cohort.update({
    where: { id },
    data: {
      ...(name && { name: name.trim() }),
      ...(description !== undefined && { description: description?.trim() || null }),
    },
  });

  return NextResponse.json(cohort);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  // Remove cohort assignment from users first
  await prisma.user.updateMany({
    where: { cohortId: id },
    data: { cohortId: null },
  });

  await prisma.cohort.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
