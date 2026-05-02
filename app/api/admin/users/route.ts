import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    where: { role: "vp" },
    include: {
      _count: { select: { sessions: true, proposals: true } },
      sessions: {
        orderBy: { startedAt: "desc" },
        take: 1,
        select: { startedAt: true, vehicleType: true, locked: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const admin = await getAuthUser();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, email, password, vehicleHint } = await req.json();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // vehicleHint is UI-only — not persisted (no column in schema)
  void vehicleHint;

  const created = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "vp",
      currentModule: 1,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      currentModule: true,
      createdAt: true,
    },
  });

  return NextResponse.json(created, { status: 201 });
}

export async function DELETE(req: Request) {
  const admin = await getAuthUser();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await req.json();

  // Delete proposals first, then sessions, then user
  await prisma.proposal.deleteMany({ where: { userId: id } });
  await prisma.session.deleteMany({ where: { userId: id } });
  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ deleted: true });
}
