"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Github, Twitter } from "lucide-react";
import { CryptoScene3D } from "@/components/landing/CryptoScene3D";
import { Features } from "@/components/landing/Features";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Theme toggle in top right */}
      <div className="absolute right-8 top-8 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section with 3D Background */}
      <section className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* 3D Scene Background */}
        {mounted && (
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <CryptoScene3D />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">
              Next-gen DeFi Risk Analytics
            </span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-7xl lg:text-8xl">
            Monitor DeFi Risks
            <br />
            <span className="gradient-text glow-text">With Confidence</span>
          </h1>

          {/* Subheading */}
          <p className="mb-12 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl lg:text-2xl">
            Real-time protocol analytics, predictive risk modeling, and advanced
            <br className="hidden sm:block" />
            monitoring tools for the decentralized finance ecosystem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-indigo-500/50 transition-all duration-300 hover:shadow-indigo-500/70 hover:scale-105"
            >
              <span className="relative z-10">Launch App</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>

            <a
              href="#features"
              className="group inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/50 px-8 py-4 text-lg font-semibold text-zinc-900 backdrop-blur-sm transition-all duration-300 hover:border-zinc-400 hover:bg-white/80 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-white dark:hover:border-zinc-600 dark:hover:bg-zinc-800/80"
            >
              Explore Features
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/30">
              <div className="mb-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                $2.5B+
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Total Value Monitored
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/30">
              <div className="mb-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
                50+
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                DeFi Protocols Tracked
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/30">
              <div className="mb-2 text-3xl font-bold text-teal-600 dark:text-teal-400">
                99.9%
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Uptime Reliability
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Scroll to explore</span>
            <div className="h-8 w-px animate-pulse bg-gradient-to-b from-indigo-500 to-transparent" />
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
              <h3 className="mb-2 text-xl font-bold gradient-text">
                DeFi Risk Dashboard
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Advanced protocol risk monitoring
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
            © {new Date().getFullYear()} DeFi Risk Dashboard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
