import React from "react";
import { ShieldCheck, Bell, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2 hover:bg-zinc-100 rounded-md dark:hover:bg-zinc-800">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-white">
          <ShieldCheck className="h-8 w-8 text-indigo-600" />
          <span>LlamaRisk</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
          JS
        </div>
      </div>
    </header>
  );
}
