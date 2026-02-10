import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const events = await prisma.event.findMany({ orderBy: { startAt: "asc" } });
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, startAt, collegeId, createdById } = body;
  if (!title || !startAt || !collegeId || !createdById) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: createdById } });
  if (!user || user.role === "STUDENT") {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  const event = await prisma.event.create({
    data: {
      title,
      startAt: new Date(startAt),
      endAt: body.endAt ? new Date(body.endAt) : undefined,
      description: body.description,
      location: body.location,
      visibility: body.visibility,
      collegeId,
      departmentId: body.departmentId,
      committeeId: body.committeeId,
      createdById
    }
  });

  return NextResponse.json(event, { status: 201 });
}

