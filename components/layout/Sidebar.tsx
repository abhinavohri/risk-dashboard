"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Target, Rss } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProtocol } from "@/components/providers/ProtocolProvider"; // Import useProtocol

interface SidebarProps {
  isOpen: boolean;
}

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Liquidation", icon: Target, href: "/liquidation" },
  { label: "Live", icon: Rss, href: "/live" },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const { protocol } = useProtocol();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 w-64 transform border-r bg-[#F0EDE5]/95 backdrop-blur-xl transition-transform duration-200 ease-in-out pt-16 md:translate-x-0 dark:border-[#3F4647] dark:bg-[#0C2529]/95",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      style={{ borderColor: 'var(--card-border)' }}
    >
      <nav className="flex h-full flex-col gap-2 overflow-y-auto p-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const dynamicHref = `${item.href}?protocol=${protocol}`;
          return (
            <Link
              key={item.label}
              href={dynamicHref}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#E5E7E8] text-[#0C2529] dark:bg-[#1A1A1A] dark:text-[#F0EDE5]"
                  : "text-[#3F4647] hover:bg-[#E5E7E8]/50 hover:text-[#0C2529] dark:text-[#7B8183] dark:hover:bg-[#1A1A1A]/50 dark:hover:text-[#F0EDE5]"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
