import type { Metadata } from "next";
import React from "react";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ProtocolProvider } from "@/components/providers/ProtocolProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "LlamaRisk - Protocol Risk Monitor",
  description: "Advanced DeFi protocol risk monitoring and analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <React.Suspense>
          <ProtocolProvider>
            <QueryProvider>{children}</QueryProvider>
          </ProtocolProvider>
        </React.Suspense>
      </body>
    </html>
  );
}
