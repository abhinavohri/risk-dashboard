import React from "react";
import Link from "next/link";
import { ShieldCheck, Bell, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/50 bg-white/80 backdrop-blur-xl px-6 dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2 hover:bg-zinc-100 rounded-md dark:hover:bg-zinc-800 transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <div className="rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="gradient-text">LlamaRisk</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
          DR
        </div>
      </div>
    </header>
  );
}
