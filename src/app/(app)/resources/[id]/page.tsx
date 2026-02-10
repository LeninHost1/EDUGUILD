import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { embedResourceLink } from "@/lib/utils";
import { ResourceFeedback } from "@/components/resource-feedback";
import { ReportForm } from "@/components/report-form";

export default async function ResourcePage({ params }: { params: { id: string } }) {
  const resource = await prisma.resource.findUnique({
    where: { id: params.id },
    include: { department: true, college: true, createdBy: true }
  });

  if (!resource) {
    notFound();
  }

  const embed = embedResourceLink(resource.link);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-white/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-secondary text-secondary-foreground">{resource.department.name}</Badge>
          {resource.teacherVerified ? <Badge>Teacher verified</Badge> : null}
        </div>
        <h1 className="mt-3 text-2xl font-semibold">{resource.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
        <p className="mt-3 text-xs text-muted-foreground">Shared by {resource.createdBy.name}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <form action={`/api/resources/${resource.id}/download`} method="POST">
            <Button type="submit">Open resource</Button>
          </form>
          <Button variant="outline" asChild>
            <a href={resource.link} target="_blank" rel="noreferrer">Open externally</a>
          </Button>
        </div>
      </section>

      {embed ? (
        <div className="rounded-2xl border bg-white/80 p-4 shadow-sm">
          <iframe
            className="h-[70vh] w-full rounded-xl"
            src={embed}
            title="Resource preview"
            allow="autoplay; encrypted-media"
          />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Preview unavailable for this link. Use the buttons above to open the resource.
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <ResourceFeedback resourceId={resource.id} />
        <ReportForm targetId={resource.id} targetType="RESOURCE" />
      </div>
    </div>
  );
}

