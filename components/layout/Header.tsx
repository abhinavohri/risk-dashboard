"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ProtocolSelector } from "@/components/dashboard/ProtocolSelector";
import Image from "next/image";
import logo from "@/public/LlamaRisk-logo-light.svg"

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();

  const showProtocolSelector = pathname === "/dashboard" || pathname === "/liquidation";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-[#F0EDE5]/80 backdrop-blur-xl px-6 text-[#0C2529] dark:bg-[#0C2529]/95 dark:text-[#F0EDE5]" style={{ borderColor: 'var(--card-border)' }}>
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2 hover:bg-[#E5E7E8] rounded-md dark:hover:bg-[#1A1A1A] transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <Image src={logo} alt="LlamaRisk" width={120} height={32} className="h-8 w-auto dark:invert-0 invert" />
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {showProtocolSelector && (
          <Suspense fallback={<div className="h-9 w-32 animate-pulse rounded-lg bg-[#E5E7E8] dark:bg-[#1A1A1A]" />}>
            <ProtocolSelector />
          </Suspense>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
