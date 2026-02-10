import Link from "next/link";
import { Home, Search, UserRound, Bell, ShieldCheck, MessageSquare } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/admin", label: "Admin", icon: ShieldCheck }
];

export function Sidebar() {
  return (
    <aside className="hidden w-56 flex-shrink-0 flex-col gap-2 rounded-2xl border bg-white/70 p-4 shadow-sm md:flex">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Navigation</p>
      <nav className="mt-3 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

