"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PROTOCOLS = [
  { id: "aave-v3", name: "Aave V3", icon: "🔷" },
  { id: "compound", name: "Compound", icon: "🟢" },
];

interface ProtocolSelectorProps {
  onProtocolChange: (protocolId: string) => void;
  currentProtocol?: string;
}

export function ProtocolSelector({ onProtocolChange, currentProtocol = "aave-v3" }: ProtocolSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedProtocol = PROTOCOLS.find((p) => p.id === currentProtocol) || PROTOCOLS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
      >
        <span className="text-lg">{selectedProtocol.icon}</span>
        <span>{selectedProtocol.name}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            {PROTOCOLS.map((protocol) => (
              <button
                key={protocol.id}
                onClick={() => {
                  onProtocolChange(protocol.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg",
                  protocol.id === currentProtocol
                    ? "bg-indigo-50 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100"
                    : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                )}
              >
                <span className="text-lg">{protocol.icon}</span>
                <span className="font-medium">{protocol.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
