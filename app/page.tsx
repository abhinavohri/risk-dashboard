"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Twitter } from "lucide-react";
import { Features } from "@/components/landing/Features";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { PageTransition } from "@/components/PageTransition";
import logo from "@/public/logo.svg";

export default function LandingPage() {

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute right-8 top-8 z-50">
          <ThemeToggle />
        </div>

      <section className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#232e31]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: 'radial-gradient(circle at 1px 1px, #f1ede5 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}
        />

        <div className="absolute inset-0 bg-liinear-to-b from-transparent via-transparent to-[#232e31]/30" />
        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#f1ede5]/20 bg-[#f1ede5]/10 px-4 py-2 backdrop-blur-sm">
            <Image src={logo} alt="LlamaRisk logo" width={36} height={36} priority className="inline-block" />
            <span className="text-sm font-medium text-[#f1ede5]">
              Professional DeFi Risk Analytics
            </span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-[#f1ede5] sm:text-7xl lg:text-8xl">
            Monitor DeFi Risks
            <br />
            <span className="text-white">With Llama Risk</span>
          </h1>

          {/* Subheading */}
          <p className="mb-12 text-lg leading-relaxed text-[#f1ede5]/80 sm:text-xl lg:text-2xl">
            Real-time protocol analytics, predictive risk modeling, and advanced
            <br className="hidden sm:block" />
            monitoring tools for the decentralized finance ecosystem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#f1ede5] px-8 py-4 text-lg font-semibold text-black shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10">Launch App</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#features"
              className="group inline-flex items-center gap-2 rounded-xl border border-[#f1ede5]/30 bg-transparent px-8 py-4 text-lg font-semibold text-[#f1ede5] backdrop-blur-sm transition-all duration-300 hover:border-[#f1ede5]/50 hover:bg-[#f1ede5]/5"
            >
              Explore Features
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#f1ede5]/10 bg-[#162326]/50 p-6 backdrop-blur-xl">
              <div className="mb-2 text-3xl font-bold text-[#f1ede5]">
                $2.5B+
              </div>
              <div className="text-sm text-[#f1ede5]/60">
                Total Value Monitored
              </div>
            </div>
            <div className="rounded-2xl border border-[#f1ede5]/10 bg-[#162326]/50 p-6 backdrop-blur-xl">
              <div className="mb-2 text-3xl font-bold text-[#f1ede5]">
                50+
              </div>
              <div className="text-sm text-[#f1ede5]/60">
                DeFi Protocols Tracked
              </div>
            </div>
            <div className="rounded-2xl border border-[#f1ede5]/10 bg-[#162326]/50 p-6 backdrop-blur-xl">
              <div className="mb-2 text-3xl font-bold text-[#f1ede5]">
                99.9%
              </div>
              <div className="text-sm text-[#f1ede5]/60">
                Uptime Reliability
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div id="features">
        <Features />
      </div>

      {/* Footer */}
      <footer className="relative border-t border-zinc-200 py-12 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-[#fdf8d8]">
                LlamaRisk Dashboard
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Professional protocol risk monitoring
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-200 pt-8 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            © {new Date().getFullYear()} LlamaRisk. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
}
