"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    collegeId: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setMessage("Account created. You can now sign in.");
      setForm({ ...form, password: "" });
    } else {
      const data = await res.json();
      setMessage(data.error ?? "Unable to create account.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-grid flex items-center justify-center px-6">
      <Card className="w-full max-w-lg p-6 shadow-lg">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Create your EDUGUILD account</h1>
          <p className="text-sm text-muted-foreground">Join your college community in minutes.</p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={(value) => setForm({ ...form, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="TEACHER">Teacher</SelectItem>
                  <SelectItem value="COMMITTEE_ADMIN">Committee Admin</SelectItem>
                  <SelectItem value="COLLEGE_ADMIN">College Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="collegeId">College ID</Label>
              <Input id="collegeId" placeholder="Paste college ID" value={form.collegeId} onChange={(e) => setForm({ ...form, collegeId: e.target.value })} required />
            </div>
          </div>
          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link className="text-primary underline-offset-4 hover:underline" href="/auth/login">Sign in</Link>
        </p>
      </Card>
    </div>
  );
}

