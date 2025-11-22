"use client";

import numbro from "numbro";
import Link from "next/link";
import { TokenIcon } from "@/components/ui/TokenIcon";
import { ArrowDown, ArrowUp, Repeat, Zap } from "lucide-react";

interface EventCardProps {
  event: {
    type: string;
    user: string;
    reserve: string;
    symbol?: string;
    amount: string;
    blockNumber: number;
    timestamp?: number;
    transactionHash: string;
    logIndex: number;
    _id: string; // From Convex
  };
}

const ETHERSCAN_BASE_URL = "https://etherscan.io";

export function EventCard({ event }: EventCardProps) {
  const displaySymbol = event.symbol || "UNKNOWN";

  const displayAmount = parseFloat(event.amount);

  const formatTimestamp = (ts: number) => {
    const date = new Date(ts * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Supply":
        return <ArrowUp className="h-5 w-5 text-green-500" />;
      case "Borrow":
        return <ArrowDown className="h-5 w-5 text-yellow-500" />;
      case "Withdraw":
        return <ArrowDown className="h-5 w-5 text-blue-500" />;
      case "Repay":
        return <Repeat className="h-5 w-5 text-purple-500" />;
      case "Liquidation":
        return <Zap className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm dark:shadow-zinc-900/50 mb-2">
      <div className="shrink-0 mt-0.5">{getEventIcon(event.type)}</div>
      <div className="grow min-w-0">
        <div className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-300">
          <TokenIcon symbol={displaySymbol} className="h-6 w-6" />
          <span className="font-semibold">
            {numbro(displayAmount).format({
              thousandSeparated: true,
              mantissa: 4,
            })}{" "}
            {displaySymbol}
          </span>
          <span className="ml-auto text-sm font-medium text-zinc-900 dark:text-white">{event.type}</span>
        </div>

        <div className="flex items-center justify-between mt-2 text-xs">
          <Link
            href={`${ETHERSCAN_BASE_URL}/address/${event.user}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            User: {event.user.slice(0, 6)}...{event.user.slice(-4)}
          </Link>
          <div className="text-right">
            <div className="text-zinc-500 dark:text-zinc-400">
              {event.timestamp ? `${formatTimestamp(event.timestamp)} · ` : ""}Block {event.blockNumber}
            </div>
            <Link
              href={`${ETHERSCAN_BASE_URL}/tx/${event.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Transaction
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
