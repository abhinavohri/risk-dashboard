"use client";

import { createContext, useContext, ReactNode, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProtocolContextType {
  protocol: string;
  setProtocol: (protocol: string) => void;
}

const ProtocolContext = createContext<ProtocolContextType | undefined>(undefined);

export function ProtocolProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const protocol = searchParams.get("protocol") || "aave";

  const setProtocol = useCallback(
    (newProtocol: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("protocol", newProtocol);
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  return (
    <ProtocolContext.Provider value={{ protocol, setProtocol }}>
      {children}
    </ProtocolContext.Provider>
  );
}

export function useProtocol() {
  const context = useContext(ProtocolContext);
  if (context === undefined) {
    throw new Error("useProtocol must be used within a ProtocolProvider");
  }
  return context;
}
