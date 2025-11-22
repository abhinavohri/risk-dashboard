import type { Metadata } from "next";
import React from "react";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ProtocolProvider } from "@/components/providers/ProtocolProvider";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "LlamaRisk - Protocol Risk Monitor",
  description: "Advanced DeFi protocol risk monitoring and analytics",
  icons: {
    icon: "/logo.svg",
  },
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
          <ConvexClientProvider>
            <ProtocolProvider>
              <QueryProvider>{children}</QueryProvider>
            </ProtocolProvider>
          </ConvexClientProvider>
        </React.Suspense>
      </body>
    </html>
  );
}
