import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, title, body: text } = body;
  if (!userId || !title || !text) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const notification = await prisma.notification.create({
    data: {
      userId,
      title,
      body: text,
      link: body.link
    }
  });

  return NextResponse.json(notification, { status: 201 });
}

