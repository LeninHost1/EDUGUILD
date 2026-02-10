import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  const results = await prisma.resource.findMany({
    where: query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { subject: { contains: query, mode: "insensitive" } },
            { department: { name: { contains: query, mode: "insensitive" } } },
            { college: { name: { contains: query, mode: "insensitive" } } }
          ]
        }
      : undefined,
    include: { department: true }
  });

  return NextResponse.json(results);
}

