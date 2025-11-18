export interface ProtocolComparison {
    protocol: string;
    tvl: number;
    healthFactor: number;
    utilizationRate: number;
    liquidations24h: number;
    apy: number;
}

export interface AssetDistribution {
    name: string;
    value: number;
    color: string;
}

export const generateProtocolComparisons = (): ProtocolComparison[] => {
    return [
        {
            protocol: "Aave V3",
            tvl: 12500000000,
            healthFactor: 2.1,
            utilizationRate: 0.68,
            liquidations24h: 3,
            apy: 4.2,
        },
        {
            protocol: "Compound",
            tvl: 8300000000,
            healthFactor: 1.9,
            utilizationRate: 0.72,
            liquidations24h: 5,
            apy: 3.8,
        },
        {
            protocol: "MakerDAO",
            tvl: 6700000000,
            healthFactor: 2.3,
            utilizationRate: 0.61,
            liquidations24h: 1,
            apy: 2.5,
        },
        {
            protocol: "Curve",
            tvl: 4200000000,
            healthFactor: 2.5,
            utilizationRate: 0.55,
            liquidations24h: 0,
            apy: 5.1,
        },
        {
            protocol: "Morpho",
            tvl: 1800000000,
            healthFactor: 1.7,
            utilizationRate: 0.78,
            liquidations24h: 8,
            apy: 6.3,
        },
    ];
};

export const generateAssetDistribution = (): AssetDistribution[] => {
    return [
        { name: "ETH", value: 42, color: "#6366f1" },
        { name: "WBTC", value: 28, color: "#f59e0b" },
        { name: "USDC", value: 15, color: "#10b981" },
        { name: "DAI", value: 8, color: "#3b82f6" },
        { name: "USDT", value: 5, color: "#8b5cf6" },
        { name: "Other", value: 2, color: "#64748b" },
    ];
};
