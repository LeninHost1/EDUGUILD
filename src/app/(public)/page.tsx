import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-grid">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-semibold">
            EG
          </div>
          <div>
            <p className="text-lg font-semibold">EDUGUILD</p>
            <p className="text-sm text-muted-foreground">Academic Collaboration Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Get started</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-6 lg:grid-cols-2">
        <div className="space-y-6 animate-fade-in">
          <Badge className="bg-accent text-accent-foreground">New • Unified Campus Network</Badge>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Connect every academic community in one modern workspace.
          </h1>
          <p className="text-lg text-muted-foreground">
            EDUGUILD links students, teachers, departments, committees, and colleges with clean workflows for resources,
            announcements, and collaboration.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/auth/signup">
              <Button size="lg">Launch your college</Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline">Explore resources</Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Verified academic resources",
              "Department and committee spaces",
              "Real-time collaboration",
              "Role-based moderation"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border bg-white/70 p-4 shadow-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-none bg-white/80 p-6 shadow-lg animate-slide-in">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Today on EDUGUILD</p>
            <h2 className="mt-3 text-2xl font-semibold">Research showcase, committee events, and tailored study analytics.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything you need to collaborate, share knowledge, and stay aligned with your campus community.
            </p>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Resource Vault", desc: "Centralized external links with verified badges." },
              { title: "Smart Search", desc: "Find by subject, college, or department." },
              { title: "Networking", desc: "Connect using unique codes." },
              { title: "Admin Studio", desc: "Moderation and announcements." }
            ].map((item) => (
              <Card key={item.title} className="border-none bg-white/80 p-5 shadow-md">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

