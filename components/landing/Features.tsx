"use client";

import { Shield, TrendingUp, Activity, Zap, BarChart3, Lock } from "lucide-react";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-zinc-700/50 dark:hover:bg-zinc-800/50">
      {/* Gradient overlay */}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 ${gradient}`} />

      {/* Icon container */}
      <div className={`mb-4 inline-flex rounded-xl ${gradient} p-3 shadow-lg`}>
        <div className="text-white">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

export function Features() {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Real-time Risk Monitoring",
      description: "Monitor protocol health factors, liquidation risks, and market conditions in real-time with advanced analytics.",
      gradient: "bg-gradient-to-br from-indigo-500 to-purple-600"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Predictive Analytics",
      description: "Leverage machine learning models to forecast volatility and identify potential risk scenarios before they occur.",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Oracle Reliability",
      description: "Track oracle performance, price deviations, and data feed health across multiple sources for accurate risk assessment.",
      gradient: "bg-gradient-to-br from-teal-500 to-cyan-600"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast Updates",
      description: "Sub-second data refresh rates ensure you're always working with the most current market and protocol data.",
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Visualization",
      description: "Interactive charts and heatmaps provide deep insights into liquidation zones, TVL trends, and risk distributions.",
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Enterprise-grade security with end-to-end encryption. Your data and strategies remain completely private.",
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-600"
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Everything you need to monitor, analyze, and manage DeFi protocol risks with confidence.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
