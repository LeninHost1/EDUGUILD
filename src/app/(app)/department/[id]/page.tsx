import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ResourceCard } from "@/components/resource-card";

export default async function DepartmentPage({ params }: { params: { id: string } }) {
  const department = await prisma.department.findUnique({
    where: { id: params.id },
    include: { resources: { take: 6, orderBy: { createdAt: "desc" } }, college: true }
  });

  if (!department) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-white/80 p-6 shadow-sm">
        <Badge className="bg-secondary text-secondary-foreground">{department.college.name}</Badge>
        <h1 className="mt-3 text-2xl font-semibold">{department.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{department.description}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Latest resources</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {department.resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
}

