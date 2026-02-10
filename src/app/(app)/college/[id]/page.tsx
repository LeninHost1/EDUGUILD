import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";

export default async function CollegePage({ params }: { params: { id: string } }) {
  const college = await prisma.college.findUnique({
    where: { id: params.id },
    include: { departments: true, committees: true, announcements: { take: 5, orderBy: { createdAt: "desc" } } }
  });

  if (!college) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-white/80 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">{college.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{college.description}</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-4">
          <h2 className="font-semibold">Departments</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {college.departments.map((dept) => (
              <li key={dept.id}>{dept.name}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <h2 className="font-semibold">Committees</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {college.committees.map((committee) => (
              <li key={committee.id}>{committee.name}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <h2 className="font-semibold">Announcements</h2>
          <ul className="mt-3 space-y-3">
            {college.announcements.map((announcement) => (
              <li key={announcement.id} className="text-sm">
                <p className="font-medium">{announcement.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{announcement.body}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

