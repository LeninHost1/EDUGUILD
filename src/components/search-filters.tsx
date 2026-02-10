"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function SearchFilters({ initialQuery, initialSort }: { initialQuery: string; initialSort: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState(initialSort);

  function apply() {
    const next = new URLSearchParams(params.toString());
    if (query) {
      next.set("q", query);
    } else {
      next.delete("q");
    }
    next.set("sort", sort);
    router.push(`/search?${next.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-white/80 p-4 shadow-sm md:flex-row md:items-center">
      <Input placeholder="Search by subject, department, college" value={query} onChange={(e) => setQuery(e.target.value)} />
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="md:w-48">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Most recent</SelectItem>
          <SelectItem value="downloads">Most downloaded</SelectItem>
          <SelectItem value="rating">Highest rated</SelectItem>
          <SelectItem value="teacher">Teacher verified</SelectItem>
        </SelectContent>
      </Select>
      <button
        onClick={apply}
        className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
      >
        Apply
      </button>
    </div>
  );
}

