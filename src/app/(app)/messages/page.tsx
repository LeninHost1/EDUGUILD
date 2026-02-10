import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { MessageComposer } from "@/components/message-composer";

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    take: 15,
    include: { sender: true }
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="mt-2 text-sm text-muted-foreground">Direct and group communications.</p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-4">
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="rounded-xl border bg-white/70 p-3">
                <p className="text-sm font-semibold">{message.sender.name}</p>
                <p className="text-xs text-muted-foreground">{message.content}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <h2 className="text-base font-semibold">New message</h2>
          <div className="mt-4">
            <MessageComposer />
          </div>
        </Card>
      </div>
    </div>
  );
}

