"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProtocolContextType {
  protocol: string;
  setProtocol: (protocol: string) => void;
}

const ProtocolContext = createContext<ProtocolContextType | undefined>(undefined);

export function ProtocolProvider({ children }: { children: ReactNode }) {
  const [protocol, setProtocol] = useState("aave-v3");

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
