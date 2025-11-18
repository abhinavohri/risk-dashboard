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
        "fixed inset-y-0 left-0 z-20 w-64 transform border-r border-zinc-200 bg-white transition-transform duration-200 ease-in-out dark:border-zinc-800 dark:bg-zinc-950 pt-16 md:translate-x-0 md:static md:pt-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <nav className="flex flex-col gap-2 p-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              item.active
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
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
