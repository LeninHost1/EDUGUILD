import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(resources);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, link, subject, semester, departmentId, collegeId, createdById, description, visibility } = body;

  if (!title || !link || !subject || !semester || !departmentId || !collegeId || !createdById) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const resource = await prisma.resource.create({
    data: {
      title,
      link,
      subject,
      semester,
      description,
      visibility,
      departmentId,
      collegeId,
      createdById
    }
  });

  return NextResponse.json(resource, { status: 201 });
}

