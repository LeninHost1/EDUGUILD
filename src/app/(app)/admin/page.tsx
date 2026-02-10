import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export default async function AdminPage() {
  const reports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { filedBy: true }
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold">Moderation panel</h1>
        <p className="mt-2 text-sm text-muted-foreground">Review flagged content and enforce policies.</p>
      </Card>

      <Card className="p-4">
        <h2 className="font-semibold">Latest reports</h2>
        <div className="mt-4 space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="rounded-xl border bg-white/70 p-3">
              <p className="text-sm font-semibold">{report.targetType}</p>
              <p className="text-xs text-muted-foreground">Filed by {report.filedBy.name}</p>
              <p className="mt-2 text-xs text-muted-foreground">{report.reason}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

