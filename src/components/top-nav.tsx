"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

export function TopNav() {
  const { data } = useSession();

  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <div className="flex items-center gap-3">
        <MobileNav />
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-semibold">
            EG
          </div>
          <div>
            <p className="text-lg font-semibold">EDUGUILD</p>
            <p className="text-sm text-muted-foreground">Campus network</p>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/search" className="hidden md:inline-flex">
          <Button variant="ghost">Search</Button>
        </Link>
        {data?.user ? (
          <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
        ) : (
          <Link href="/auth/login">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

