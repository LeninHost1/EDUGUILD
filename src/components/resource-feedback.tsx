"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ResourceFeedback({ resourceId }: { resourceId: string }) {
  const [rating, setRating] = useState("5");
  const [status, setStatus] = useState<string | null>(null);

  async function submit() {
    const res = await fetch(`/api/resources/${resourceId}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating })
    });

    if (res.ok) {
      setStatus("Thanks for rating.");
    } else {
      const body = await res.json();
      setStatus(body.error ?? "Unable to submit rating.");
    }
  }

  return (
    <div className="rounded-2xl border bg-white/80 p-4 shadow-sm">
      <p className="text-sm font-semibold">Rate this resource</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Select value={rating} onValueChange={setRating}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            {["5", "4", "3", "2", "1"].map((value) => (
              <SelectItem key={value} value={value}>{value} stars</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" onClick={submit}>Submit</Button>
        {status ? <span className="text-xs text-muted-foreground">{status}</span> : null}
      </div>
    </div>
  );
}

