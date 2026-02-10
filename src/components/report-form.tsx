"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ReportForm({ targetId, targetType }: { targetId: string; targetType: "RESOURCE" | "MESSAGE" | "ANNOUNCEMENT" | "EVENT" }) {
  const { data } = useSession();
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function submit() {
    if (!data?.user?.id) return;
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filedById: data.user.id, targetType, targetId, reason })
    });

    if (res.ok) {
      setStatus("Report submitted.");
      setReason("");
    } else {
      const body = await res.json();
      setStatus(body.error ?? "Unable to submit report.");
    }
  }

  return (
    <div className="rounded-2xl border bg-white/80 p-4 shadow-sm">
      <p className="text-sm font-semibold">Report content</p>
      <Textarea className="mt-3" placeholder="Explain the issue" value={reason} onChange={(e) => setReason(e.target.value)} />
      <div className="mt-3 flex items-center gap-3">
        <Button size="sm" onClick={submit}>Submit</Button>
        {status ? <span className="text-xs text-muted-foreground">{status}</span> : null}
      </div>
    </div>
  );
}

