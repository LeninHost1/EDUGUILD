import { PrismaClient, Role, Visibility, AnnouncementLevel, MessageType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const college = await prisma.college.upsert({
    where: { slug: "northbridge" },
    update: {},
    create: {
      name: "Northbridge University",
      slug: "northbridge",
      description: "A research-focused university with interdisciplinary excellence.",
      city: "Boston",
      websiteUrl: "https://northbridge.example.edu"
    }
  });

  const cs = await prisma.department.upsert({
    where: { collegeId_slug: { collegeId: college.id, slug: "computer-science" } },
    update: {},
    create: {
      name: "Computer Science",
      slug: "computer-science",
      description: "AI, systems, and software engineering.",
      collegeId: college.id
    }
  });

  const ee = await prisma.department.upsert({
    where: { collegeId_slug: { collegeId: college.id, slug: "electrical" } },
    update: {},
    create: {
      name: "Electrical Engineering",
      slug: "electrical",
      description: "Signals, circuits, and embedded systems.",
      collegeId: college.id
    }
  });

  const committee = await prisma.committee.upsert({
    where: { collegeId_slug: { collegeId: college.id, slug: "innovation-club" } },
    update: {},
    create: {
      name: "Innovation Club",
      slug: "innovation-club",
      description: "Student-led research and hackathons.",
      collegeId: college.id
    }
  });

  const passwordHash = await bcrypt.hash("Password123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@northbridge.edu" },
    update: {},
    create: {
      name: "Dr. Ada Monroe",
      email: "admin@northbridge.edu",
      passwordHash,
      role: Role.COLLEGE_ADMIN,
      code: "EDU-ADM1N",
      collegeId: college.id
    }
  });

  const teacher = await prisma.user.upsert({
    where: { email: "teacher@northbridge.edu" },
    update: {},
    create: {
      name: "Prof. Eli Park",
      email: "teacher@northbridge.edu",
      passwordHash,
      role: Role.TEACHER,
      code: "EDU-TEACH",
      collegeId: college.id,
      departmentId: cs.id
    }
  });

  const student = await prisma.user.upsert({
    where: { email: "student@northbridge.edu" },
    update: {},
    create: {
      name: "Maya Patel",
      email: "student@northbridge.edu",
      passwordHash,
      role: Role.STUDENT,
      code: "EDU-STUDY",
      collegeId: college.id,
      departmentId: cs.id,
      committeeId: committee.id
    }
  });

  await prisma.resource.createMany({
    data: [
      {
        title: "Distributed Systems Lecture Notes",
        description: "Consensus, replication, and fault tolerance.",
        link: "https://drive.google.com/file/d/1A2B3C4D/view",
        subject: "Distributed Systems",
        semester: "Spring 2026",
        visibility: Visibility.COLLEGE,
        teacherVerified: true,
        collegeId: college.id,
        departmentId: cs.id,
        createdById: teacher.id
      },
      {
        title: "Digital Signal Processing Workbook",
        description: "Filter design and FFT practice.",
        link: "https://onedrive.live.com/view.aspx?resid=123",
        subject: "DSP",
        semester: "Fall 2025",
        visibility: Visibility.DEPARTMENT,
        teacherVerified: false,
        collegeId: college.id,
        departmentId: ee.id,
        createdById: admin.id
      }
    ]
  });

  await prisma.announcement.create({
    data: {
      title: "Spring Research Showcase",
      body: "Submit posters by March 12. Teams of up to 4.",
      level: AnnouncementLevel.COLLEGE,
      visibility: Visibility.COLLEGE,
      collegeId: college.id,
      createdById: admin.id
    }
  });

  await prisma.event.create({
    data: {
      title: "Innovation Hack Night",
      description: "Rapid prototyping and mentor office hours.",
      location: "Innovation Lab",
      startAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      visibility: Visibility.COLLEGE,
      collegeId: college.id,
      committeeId: committee.id,
      createdById: admin.id
    }
  });

  await prisma.message.create({
    data: {
      content: "Welcome to the Innovation Club discussion channel.",
      type: MessageType.COMMITTEE,
      senderId: admin.id,
      committeeId: committee.id
    }
  });

  await prisma.notification.create({
    data: {
      userId: student.id,
      title: "New resource added",
      body: "Distributed Systems Lecture Notes were posted.",
      link: "/resources",
      read: false
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

