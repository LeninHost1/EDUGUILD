import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { rating } = await request.json();
  const value = Number(rating);
  if (Number.isNaN(value) || value < 1 || value > 5) {
    return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
  }

  const resource = await prisma.resource.findUnique({ where: { id: params.id } });
  if (!resource) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  const total = resource.rating * resource.ratingCount + value;
  const count = resource.ratingCount + 1;

  const updated = await prisma.resource.update({
    where: { id: params.id },
    data: { rating: total / count, ratingCount: count }
  });

  return NextResponse.json(updated);
}

