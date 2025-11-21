"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ProtocolSelector } from "@/components/dashboard/ProtocolSelector";
import Image from "next/image";

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();

  const showProtocolSelector = pathname === "/dashboard" || pathname === "/liquidation";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/50 bg-[#F0EDE5]/80 backdrop-blur-xl px-6 dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2 hover:bg-zinc-100 rounded-md dark:hover:bg-zinc-800 transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <Image src='https://llamarisk.com/LlamaRisk-logo.svg' alt="LlamaRisk" width={120} height={32} className="h-8 w-auto dark:invert-0 invert" />
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {showProtocolSelector && (
          <Suspense fallback={<div className="h-9 w-32 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />}>
            <ProtocolSelector />
          </Suspense>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
