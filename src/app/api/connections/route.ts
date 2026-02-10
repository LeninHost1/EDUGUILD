import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { requesterId, recipientCode } = await request.json();
  if (!requesterId || !recipientCode) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const recipient = await prisma.user.findUnique({ where: { code: recipientCode } });
  if (!recipient) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const connection = await prisma.connection.create({
    data: {
      requesterId,
      recipientId: recipient.id
    }
  });

  return NextResponse.json(connection, { status: 201 });
}

