import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateUserCode } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password, role, collegeId } = body;

  if (!name || !email || !password || !role || !collegeId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  }

  const college = await prisma.college.findUnique({ where: { id: collegeId } });
  if (!college) {
    return NextResponse.json({ error: "College not found" }, { status: 404 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  let code = generateUserCode();
  let attempts = 0;

  while (attempts < 5) {
    const existingCode = await prisma.user.findUnique({ where: { code } });
    if (!existingCode) break;
    code = generateUserCode();
    attempts += 1;
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
      code,
      collegeId
    }
  });

  return NextResponse.json({ id: user.id, code: user.code }, { status: 201 });
}

