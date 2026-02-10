import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const announcements = await prisma.announcement.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(announcements);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, body: text, collegeId, createdById } = body;
  if (!title || !text || !collegeId || !createdById) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: createdById } });
  if (!user || user.role === "STUDENT") {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const announcement = await prisma.announcement.create({
    data: {
      title,
      body: text,
      collegeId,
      createdById,
      level: body.level,
      visibility: body.visibility,
      departmentId: body.departmentId,
      committeeId: body.committeeId
    }
  });

  return NextResponse.json(announcement, { status: 201 });
}

