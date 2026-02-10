import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const committees = await prisma.committee.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(committees);
}

