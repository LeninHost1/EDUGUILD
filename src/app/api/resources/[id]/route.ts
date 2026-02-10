import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const resource = await prisma.resource.findUnique({ where: { id: params.id } });
  return NextResponse.json(resource);
}

