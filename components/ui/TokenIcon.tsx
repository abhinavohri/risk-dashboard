"use client";

import { useState } from "react";
import blockies from "ethereum-blockies-base64";
import Image from "next/image";

interface TokenIconProps {
  symbol: string;
  className?: string;
}

const TOKEN_ADDRESSES: Record<string, string> = {
  ETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  AAVE: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
  UNI: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
};

export function TokenIcon({ symbol, className = "h-8 w-8" }: TokenIconProps) {
  const [hasError, setHasError] = useState(false);
  const address = TOKEN_ADDRESSES[symbol];

  // Generate blockie as fallback
  const blockieUrl = address ? blockies(address) : blockies(symbol);

  const tokenIconUrl = address
    ? `https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/${address}/logo.png`
    : null;

  if (!tokenIconUrl || hasError) {
    return (
      <Image
        src={blockieUrl}
        alt={symbol}
        className={`${className} rounded-full`}
        width={32}
        height={32}
      />
    );
  }

  return (
    <Image
      src={tokenIconUrl}
      alt={symbol}
      className={`${className} rounded-full`}
      onError={() => setHasError(true)}
      width={32}
      height={32}
    />
  );
}
