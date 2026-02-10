"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function MessageComposer() {
  const { data } = useSession();
  const [type, setType] = useState("DIRECT");
  const [content, setContent] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [committeeId, setCommitteeId] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function submit() {
    if (!data?.user?.id) return;
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId: data.user.id,
        content,
        type,
        recipientId: type === "DIRECT" ? recipientId : undefined,
        departmentId: type === "DEPARTMENT" ? departmentId : undefined,
        committeeId: type === "COMMITTEE" ? committeeId : undefined
      })
    });

    if (res.ok) {
      setStatus("Message sent.");
      setContent("");
    } else {
      const body = await res.json();
      setStatus(body.error ?? "Unable to send message.");
    }
  }

  return (
    <div className="space-y-3">
      <Select value={type} onValueChange={setType}>
        <SelectTrigger>
          <SelectValue placeholder="Message type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="DIRECT">Direct</SelectItem>
          <SelectItem value="DEPARTMENT">Department</SelectItem>
          <SelectItem value="COMMITTEE">Committee</SelectItem>
        </SelectContent>
      </Select>

      {type === "DIRECT" ? (
        <Input placeholder="Recipient user ID" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} />
      ) : null}

      {type === "DEPARTMENT" ? (
        <Input placeholder="Department ID" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} />
      ) : null}

      {type === "COMMITTEE" ? (
        <Input placeholder="Committee ID" value={committeeId} onChange={(e) => setCommitteeId(e.target.value)} />
      ) : null}

      <Textarea placeholder="Write a message" value={content} onChange={(e) => setContent(e.target.value)} />
      <Button onClick={submit}>Send message</Button>
      {status ? <p className="text-xs text-muted-foreground">{status}</p> : null}
    </div>
  );
}

