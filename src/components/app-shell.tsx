import { TopNav } from "@/components/top-nav";
import { Sidebar } from "@/components/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-grid">
      <TopNav />
      <div className="mx-auto flex max-w-7xl gap-6 px-6 pb-12">
        <Sidebar />
        <main className="w-full rounded-2xl border bg-white/70 p-6 shadow-sm animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}

