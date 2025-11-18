# DeFi Risk Monitoring Dashboard

A responsive, data-intensive dashboard for monitoring DeFi protocol metrics, liquidation risks, and oracle data. Built with Next.js, TypeScript, Tailwind CSS, and Recharts.

## Features

- **Risk Overview**: Key metrics (TVL, Health Factor, Utilization) with trend indicators.
- **Interactive Charts**: 
  - Time-series analysis of TVL with confidence intervals.
  - Liquidation risk heatmap visualizing collateral vs. borrowed positions.
- **Oracle Health**: Monitoring of price feed deviations and severity.
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile.
- **Real-time Simulation**: Mock data updates every 30 seconds to simulate live feeds.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, clsx, tailwind-merge
- **Visualization**: Recharts
- **Icons**: Lucide React
- **Utilities**: date-fns

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd risk_dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Assumptions & Trade-offs

- **Data Source**: Since real-time risk data is expensive or requires complex indexing, this project uses a hybrid approach. It fetches basic protocol data (TVL) from DefiLlama when possible, but relies on realistic mock data generators for granular risk metrics (positions, oracle events).
- **Confidence Intervals**: The confidence interval chart uses a simulated volatility model. In a production environment, this would be calculated using historical volatility or VaR models.
- **Heatmap**: Recharts ScatterChart is used to approximate a heatmap for liquidation risk. A dedicated heatmap library or Canvas-based solution might be more performant for thousands of positions.

## Live Demo

[Insert Live Demo URL Here]
