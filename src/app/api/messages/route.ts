import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { senderId, content } = body;
  if (!senderId || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      senderId,
      content,
      type: body.type,
      recipientId: body.recipientId,
      departmentId: body.departmentId,
      committeeId: body.committeeId
    }
  });

  return NextResponse.json(message, { status: 201 });
}

