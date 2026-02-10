import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResourceCard } from "@/components/resource-card";
import { ConnectionForm } from "@/components/connection-form";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const resources = await prisma.resource.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { department: true }
  });

  const announcements = await prisma.announcement.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { college: true }
  });

  const downloads = user?.id
    ? await prisma.resourceDownload.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 6,
        include: { resource: true }
      })
    : [];

  const subjectActivity = downloads.reduce<Record<string, number>>((acc, entry) => {
    const subject = entry.resource.subject;
    acc[subject] = (acc[subject] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-white/80 p-6 shadow-sm">
        <Badge className="bg-accent text-accent-foreground">Your workspace</Badge>
        <h1 className="mt-3 text-2xl font-semibold">Welcome back{user?.name ? `, ${user.name}` : ""}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track resources, events, and announcements across your college community.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Latest resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
        <Card className="p-5">
          <h3 className="text-base font-semibold">Announcements</h3>
          <div className="mt-4 space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="rounded-xl border bg-white/70 p-3">
                <p className="text-sm font-semibold">{announcement.title}</p>
                <p className="text-xs text-muted-foreground">{announcement.college.name}</p>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{announcement.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-base font-semibold">Study dashboard</h3>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Download history</p>
              <ul className="mt-2 space-y-2 text-sm">
                {downloads.length === 0 ? (
                  <li className="text-muted-foreground">No downloads yet.</li>
                ) : (
                  downloads.map((download) => (
                    <li key={download.id} className="rounded-lg border bg-white/70 px-3 py-2">
                      {download.resource.title}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Subject activity</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.keys(subjectActivity).length === 0 ? (
                  <span className="text-xs text-muted-foreground">No activity tracked yet.</span>
                ) : (
                  Object.entries(subjectActivity).map(([subject, count]) => (
                    <span key={subject} className="rounded-full bg-secondary px-3 py-1 text-xs">
                      {subject} · {count}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Study reminders</p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li>Review your most downloaded resources this week.</li>
                <li>Schedule a 45-minute deep focus session.</li>
                <li>Check department announcements for updates.</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-base font-semibold">Networking</h3>
          <p className="mt-2 text-sm text-muted-foreground">Connect with peers using their unique EDUGUILD codes.</p>
          <div className="mt-4">
            <ConnectionForm />
          </div>
        </Card>
      </section>
    </div>
  );
}

