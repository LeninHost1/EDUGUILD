import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: "desc" },
    take: 10
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="mt-2 text-sm text-muted-foreground">Recent updates and alerts.</p>
      </Card>

      <Card className="p-4">
        <div className="space-y-3">
          {notifications.map((notice) => (
            <div key={notice.id} className="rounded-xl border bg-white/70 p-3">
              <p className="text-sm font-semibold">{notice.title}</p>
              <p className="text-xs text-muted-foreground">{notice.body}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

