"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-50 via-indigo-50/30 to-purple-50/30 dark:from-zinc-950 dark:via-indigo-950/20 dark:to-purple-950/20">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 p-4 md:p-6 md:ml-64 overflow-x-hidden">
          {children}
        </main>
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
