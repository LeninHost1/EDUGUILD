import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const college = await prisma.college.findUnique({
    where: { id: params.id },
    include: { departments: true, committees: true }
  });
  return NextResponse.json(college);
}

