import React from "react";
import { LayoutDashboard, PieChart, Activity, AlertTriangle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Market Risk", icon: Activity, active: false },
  { label: "Liquidations", icon: AlertTriangle, active: false },
  { label: "Analytics", icon: PieChart, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 w-64 transform border-r border-zinc-200/50 bg-white/80 backdrop-blur-xl transition-transform duration-200 ease-in-out dark:border-zinc-800/50 dark:bg-zinc-950/80 pt-16 md:translate-x-0 md:static md:pt-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <nav className="flex flex-col gap-2 p-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
              item.active
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
