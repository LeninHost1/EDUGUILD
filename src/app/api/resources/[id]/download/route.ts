import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resource = await prisma.resource.update({
    where: { id: params.id },
    data: { downloads: { increment: 1 } }
  });

  await prisma.resourceDownload.create({
    data: { resourceId: resource.id, userId: session.user.id }
  });

  redirect(resource.link);
}

