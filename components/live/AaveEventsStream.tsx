"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AnimatePresence } from 'framer-motion';
import { EventCard } from "./EventCard";
import * as Tooltip from '@radix-ui/react-tooltip';

export function AaveEventsStream() {
  const events = useQuery(api.aaveEvents.getRecentEvents);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white/50 p-6 shadow-lg backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80 dark:shadow-zinc-900/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Aave v3 Live Events</h3>
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger asChild>
              <div className="flex items-center gap-2 cursor-help">
                <div className={`h-3 w-3 rounded-full transition-colors ${events ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{events ? 'Live' : 'Connecting...'}</span>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="rounded-md bg-zinc-800 px-3 py-2 text-xs text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                sideOffset={5}
              >
                Updates every 1 minute
                <Tooltip.Arrow className="fill-zinc-800" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
      <div className="h-[60vh] overflow-y-auto rounded-lg bg-zinc-50/50 dark:bg-zinc-800/50 p-2">
        <AnimatePresence initial={false}>
          {events?.map((event) => (
            <EventCard key={event.transactionHash + event.logIndex} event={event} />
          ))}
        </AnimatePresence>
        {events === undefined && (
          <div className="flex items-center justify-center h-full text-zinc-500">
            Loading Aave events...
          </div>
        )}
        {events?.length === 0 && (
          <div className="flex items-center justify-center h-full text-zinc-500">
            No recent events found.
          </div>
        )}
      </div>
    </div>
  );
}
