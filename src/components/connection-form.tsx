"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ConnectionForm() {
  const { data } = useSession();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function submit() {
    if (!data?.user?.id) return;
    const res = await fetch("/api/connections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requesterId: data.user.id, recipientCode: code })
    });

    if (res.ok) {
      setStatus("Connection request sent.");
      setCode("");
    } else {
      const body = await res.json();
      setStatus(body.error ?? "Unable to connect.");
    }
  }

  return (
    <div className="space-y-3">
      <Input placeholder="Enter user code" value={code} onChange={(e) => setCode(e.target.value)} />
      <Button onClick={submit}>Connect</Button>
      {status ? <p className="text-xs text-muted-foreground">{status}</p> : null}
    </div>
  );
}

