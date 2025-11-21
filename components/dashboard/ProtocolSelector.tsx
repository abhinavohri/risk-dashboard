"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProtocol } from "@/components/providers/ProtocolProvider";

const PROTOCOLS = [
  { id: "aave", name: "AAVE", icon: "🔷" },
  { id: "compound-finance", name: "Compound", icon: "🟢" },
];

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ProtocolSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { protocol } = useProtocol();
  const searchParams = useSearchParams();
  const selectedProtocol = PROTOCOLS.find((p) => p.id === protocol) || PROTOCOLS[0];

  const getHref = (protocolId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("protocol", protocolId);
    return `?${params.toString()}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm md:px-4"
      >
        <span className="text-sm sm:text-base md:text-lg">{selectedProtocol.icon}</span>
        <span className="hidden sm:inline">{selectedProtocol.name}</span>
        <span className="sm:hidden">{selectedProtocol.name.split(' ')[0]}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform sm:h-4 sm:w-4", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-2 w-36 rounded-lg border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:w-40 md:w-48">
            {PROTOCOLS.map((p) => (
              <Link
                key={p.id}
                href={getHref(p.id)}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors first:rounded-t-lg last:rounded-b-lg sm:gap-3 sm:px-4 sm:py-3 sm:text-sm",
                  p.id === protocol
                    ? "bg-indigo-50 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100"
                    : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                )}
              >
                <span className="text-sm sm:text-base md:text-lg">{p.icon}</span>
                <span className="font-medium">{p.name}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
