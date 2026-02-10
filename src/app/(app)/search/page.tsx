import { prisma } from "@/lib/prisma";
import { ResourceCard } from "@/components/resource-card";
import { SearchFilters } from "@/components/search-filters";
import { Prisma } from "@prisma/client";

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query =
    typeof searchParams?.q === "string" ? searchParams.q : "";

  const sort =
    typeof searchParams?.sort === "string" ? searchParams.sort : "recent";

  const orderBy: Prisma.ResourceOrderByWithRelationInput =
    sort === "downloads"
      ? { downloads: "desc" }
      : sort === "rating"
      ? { rating: "desc" }
      : sort === "teacher"
      ? { teacherVerified: "desc" }
      : { createdAt: "desc" };

  const resources = await prisma.resource.findMany({
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
    orderBy,
    include: { department: true }
  });

  return (
    <div className="space-y-6">
      <SearchFilters initialQuery={query} initialSort={sort} />
      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
