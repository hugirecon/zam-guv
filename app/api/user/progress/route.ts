import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { currentModule: true, module1Done: true, module2Done: true, module3Done: true },
  });

  if (!dbUser) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(dbUser);
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { action } = body;

  if (!["complete", "skip"].includes(action)) {
    return NextResponse.json({ error: "Invalid action. Use 'complete' or 'skip'." }, { status: 400 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { currentModule: true },
  });

  if (!dbUser) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const currentModule = dbUser.currentModule;
  const nextModule = Math.min(currentModule + 1, 4);

  const updateData: Record<string, unknown> = { currentModule: nextModule };

  // Only mark as done on explicit "complete" action
  if (action === "complete") {
    if (currentModule === 1) updateData.module1Done = true;
    else if (currentModule === 2) updateData.module2Done = true;
    else if (currentModule === 3) updateData.module3Done = true;
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: updateData,
    select: { currentModule: true, module1Done: true, module2Done: true, module3Done: true },
  });

  return NextResponse.json(updated);
}
