import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";

export default async function CommitteePage({ params }: { params: { id: string } }) {
  const committee = await prisma.committee.findUnique({
    where: { id: params.id },
    include: { events: { orderBy: { startAt: "desc" }, take: 5 }, announcements: { take: 5, orderBy: { createdAt: "desc" } }, college: true }
  });

  if (!committee) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-white/80 p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">{committee.college.name}</p>
        <h1 className="mt-2 text-2xl font-semibold">{committee.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{committee.description}</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="font-semibold">Upcoming events</h2>
          <div className="mt-3 space-y-3">
            {committee.events.map((event) => (
              <div key={event.id} className="rounded-xl border bg-white/70 p-3">
                <p className="text-sm font-semibold">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.startAt.toDateString()}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <h2 className="font-semibold">Announcements</h2>
          <div className="mt-3 space-y-3">
            {committee.announcements.map((announcement) => (
              <div key={announcement.id} className="rounded-xl border bg-white/70 p-3">
                <p className="text-sm font-semibold">{announcement.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{announcement.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

