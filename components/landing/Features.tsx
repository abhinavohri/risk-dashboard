"use client";

import { Shield, TrendingUp, Activity, Zap, BarChart3, Lock } from "lucide-react";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description }: Omit<FeatureCardProps, 'gradient'>) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-zinc-300/50 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900/80 dark:shadow-zinc-900/50 dark:hover:border-zinc-600">
      {/* Icon container */}
      <div className="mb-4 inline-flex rounded-xl border border-[#0b282d]/10 bg-[#f1ede5] p-3">
        <div className="text-[#0b282d]">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-semibold text-[#0b282d] dark:text-[#f1ede5]">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[#3c5155] dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}

export function Features() {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Real-time Risk Monitoring",
      description: "Monitor protocol health factors, liquidation risks, and market conditions in real-time with advanced analytics."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Predictive Analytics",
      description: "Leverage machine learning models to forecast volatility and identify potential risk scenarios before they occur."
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Oracle Reliability",
      description: "Track oracle performance, price deviations, and data feed health across multiple sources for accurate risk assessment."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast Updates",
      description: "Sub-second data refresh rates ensure you're always working with the most current market and protocol data."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Visualization",
      description: "Interactive charts and heatmaps provide deep insights into liquidation zones, TVL trends, and risk distributions."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Enterprise-grade security with end-to-end encryption. Your data and strategies remain completely private."
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#0b282d] dark:text-[#f1ede5] sm:text-5xl">
            Powerful Features
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#3c5155] dark:text-zinc-400">
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
