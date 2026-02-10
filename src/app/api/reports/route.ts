import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { filedById, targetType, targetId, reason } = body;
  if (!filedById || !targetType || !targetId || !reason) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const report = await prisma.report.create({
    data: {
      filedById,
      targetType,
      targetId,
      reason
    }
  });

  return NextResponse.json(report, { status: 201 });
}

