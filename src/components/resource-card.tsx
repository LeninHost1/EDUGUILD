import Link from "next/link";
import { Resource } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ResourceCard({ resource }: { resource: Resource & { department?: { name: string } } }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <Badge className="bg-secondary text-secondary-foreground">{resource.department?.name ?? "General"}</Badge>
        {resource.teacherVerified ? <Badge>Verified</Badge> : null}
      </div>
      <h3 className="mt-3 text-base font-semibold">{resource.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{resource.description}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{resource.subject}</span>
        <span>{resource.semester}</span>
      </div>
      <Link className="mt-4 inline-flex text-sm font-medium text-primary hover:underline" href={`/resources/${resource.id}`}>
        View resource
      </Link>
    </Card>
  );
}

