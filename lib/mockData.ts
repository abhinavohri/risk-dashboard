import { ProtocolMetrics, TimeSeriesPoint, RiskPosition, AssetLiquidationConfig } from "@/types";
import { subDays, subHours } from "date-fns";

const PROTOCOL_CONFIG: Record<string, {
    tvlBase: number;
    borrowBase: number;
    utilization: number;
    healthFactor: number;
    users: number;
    apyMultiplier: number;
    reserveMultiplier: number;
    oracleBasePrice: number;
    oracleVolatility: number;
}> = {
    "aave-v3": {
        tvlBase: 12500000,
        borrowBase: 8500000,
        utilization: 0.65,
        healthFactor: 1.8,
        users: 1200,
        apyMultiplier: 1.0,
        reserveMultiplier: 1.0,
        oracleBasePrice: 2000,
        oracleVolatility: 1.0,
    },
    "compound-finance": {
        tvlBase: 8900000,
        borrowBase: 5200000,
        utilization: 0.58,
        healthFactor: 2.1,
        users: 850,
        apyMultiplier: 0.85,
        reserveMultiplier: 0.75,
        oracleBasePrice: 2100,
        oracleVolatility: 1.2,
    },
};

export const generateProtocolMetrics = (protocol: string = "aave-v3"): ProtocolMetrics => {
    const config = PROTOCOL_CONFIG[protocol] || PROTOCOL_CONFIG["aave-v3"];
    return {
        protocol: protocol === "aave-v3" ? "Aave V3" : "Compound",
        tvl: config.tvlBase + Math.random() * 500000,
        totalBorrowed: config.borrowBase + Math.random() * 200000,
        utilizationRate: config.utilization + Math.random() * 0.05,
        averageHealthFactor: config.healthFactor + Math.random() * 0.2,
        liquidationsLast24h: Math.floor(Math.random() * 5),
        uniqueUsers: config.users + Math.floor(Math.random() * 50),
        timestamp: Date.now(),
    };
};

export const generateTimeSeriesData = (days: number = 30, protocol: string = "aave-v3"): TimeSeriesPoint[] => {
    const data: TimeSeriesPoint[] = [];
    const config = PROTOCOL_CONFIG[protocol] || PROTOCOL_CONFIG["aave-v3"];
    let currentValue = config.tvlBase;

    for (let i = days; i >= 0; i--) {
        const change = (Math.random() - 0.45) * 500000;
        currentValue += change;

        // Generate confidence intervals
        const volatility = currentValue * 0.05; // 5% volatility
        const upper = currentValue + volatility * (0.9 + Math.random() * 0.1); // 90-100% of volatility
        const lower = currentValue - volatility * (0.9 + Math.random() * 0.1);

        data.push({
            timestamp: subDays(new Date(), i).getTime(),
            value: currentValue,
            upperBound: upper,
            lowerBound: lower,
        });
    }
    return data;
};

export const generateRiskPositions = (count: number = 20): RiskPosition[] => {
    return Array.from({ length: count }).map((_, i) => {
        const collateral = 10000 + Math.random() * 90000;
        const borrowed = collateral * (0.5 + Math.random() * 0.4);
        const healthFactor = collateral / borrowed;

        let riskLevel: RiskPosition['riskLevel'] = 'low';
        if (healthFactor < 1.1) riskLevel = 'critical';
        else if (healthFactor < 1.3) riskLevel = 'high';
        else if (healthFactor < 1.6) riskLevel = 'medium';

        return {
            id: `pos-${i}`,
            userAddress: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
            collateralUSD: collateral,
            borrowedUSD: borrowed,
            healthFactor,
            liquidationPrice: 1500 + Math.random() * 500,
            asset: Math.random() > 0.5 ? "ETH" : "WBTC",
            riskLevel,
        };
    });
};

export const generateAPYData = (days: number = 30, protocol: string = "aave-v3") => {
    const config = PROTOCOL_CONFIG[protocol] || PROTOCOL_CONFIG["aave-v3"];
    const data = [];
    let supplyAPY = (3 + Math.random()) * config.apyMultiplier;
    let borrowAPY = (5 + Math.random() * 2) * config.apyMultiplier;

    for (let i = days; i >= 0; i--) {
        supplyAPY += (Math.random() - 0.5) * 0.3;
        borrowAPY += (Math.random() - 0.5) * 0.4;

        supplyAPY = Math.max(1 * config.apyMultiplier, Math.min(6 * config.apyMultiplier, supplyAPY));
        borrowAPY = Math.max(4 * config.apyMultiplier, Math.min(10 * config.apyMultiplier, borrowAPY));

        data.push({
            timestamp: subDays(new Date(), i).getTime(),
            supplyAPY,
            borrowAPY,
        });
    }
    return data;
};

export const generateReserveData = (protocol: string = "aave-v3") => {
    const config = PROTOCOL_CONFIG[protocol] || PROTOCOL_CONFIG["aave-v3"];
    const multiplier = config.reserveMultiplier;
    return [
        { asset: "ETH", supplied: 350000000 * multiplier, borrowed: 245000000 * multiplier },
        { asset: "WBTC", supplied: 280000000 * multiplier, borrowed: 196000000 * multiplier },
        { asset: "USDC", supplied: 420000000 * multiplier, borrowed: 336000000 * multiplier },
        { asset: "DAI", supplied: 180000000 * multiplier, borrowed: 126000000 * multiplier },
        { asset: "USDT", supplied: 150000000 * multiplier, borrowed: 105000000 * multiplier },
        { asset: "LINK", supplied: 80000000 * multiplier, borrowed: 56000000 * multiplier },
    ];
};

export const generateOracleDeviationData = (hours: number = 24, protocol: string = "aave-v3") => {
    const config = PROTOCOL_CONFIG[protocol] || PROTOCOL_CONFIG["aave-v3"];
    const data = [];
    let basePrice = config.oracleBasePrice;

    for (let i = hours; i >= 0; i--) {
        // Base price walks randomly
        basePrice += (Math.random() - 0.5) * 20 * config.oracleVolatility;

        // Different oracles have slight deviations from base price
        const chainlink = basePrice + (Math.random() - 0.5) * 5 * config.oracleVolatility; // ±$2.5
        const uniswap = basePrice + (Math.random() - 0.5) * 15 * config.oracleVolatility; // ±$7.5 (more volatile)
        const band = basePrice + (Math.random() - 0.5) * 8 * config.oracleVolatility; // ±$4

        data.push({
            timestamp: subHours(new Date(), i).getTime(),
            chainlink,
            uniswap,
            band,
        });
    }

    return data;
};

export const generateAssetLiquidationData = (protocol: string): AssetLiquidationConfig[] => {
    if (protocol === 'compound-finance') {
      return [
        {
          asset: "ETH",
          ltv: 0.75,
          liquidationThreshold: 0.80,
          liquidationBonus: 0.08,
          supplied: 320000000,
          borrowed: 220000000,
          utilization: 0.6875,
          canBeCollateral: true,
          canBeBorrowed: true,
        },
        {
          asset: "WBTC",
          ltv: 0.65,
          liquidationThreshold: 0.70,
          liquidationBonus: 0.12,
          supplied: 250000000,
          borrowed: 150000000,
          utilization: 0.60,
          canBeCollateral: true,
          canBeBorrowed: true,
        },
        {
          asset: "USDC",
          ltv: 0.85,
          liquidationThreshold: 0.88,
          liquidationBonus: 0.05,
          supplied: 400000000,
          borrowed: 300000000,
          utilization: 0.75,
          canBeCollateral: true,
          canBeBorrowed: true,
        },
        {
          asset: "DAI",
          ltv: 0.72,
          liquidationThreshold: 0.75,
          liquidationBonus: 0.08,
          supplied: 150000000,
          borrowed: 90000000,
          utilization: 0.60,
          canBeCollateral: true,
          canBeBorrowed: true,
        },
        {
          asset: "COMP",
          ltv: 0.50,
          liquidationThreshold: 0.55,
          liquidationBonus: 0.15,
          supplied: 75000000,
          borrowed: 25000000,
          utilization: 0.33,
          canBeCollateral: true,
          canBeBorrowed: true,
        },
      ];
    }
    // Default to Aave V3 data
    return [
        {
            asset: "ETH",
            ltv: 0.825,
            liquidationThreshold: 0.86,
            liquidationBonus: 0.05,
            supplied: 350000000,
            borrowed: 245000000,
            utilization: 0.70,
            canBeCollateral: true,
            canBeBorrowed: true,
        },
        {
            asset: "WBTC",
            ltv: 0.70,
            liquidationThreshold: 0.75,
            liquidationBonus: 0.10,
            supplied: 280000000,
            borrowed: 196000000,
            utilization: 0.70,
            canBeCollateral: true,
            canBeBorrowed: true,
        },
        {
            asset: "USDC",
            ltv: 0.87,
            liquidationThreshold: 0.89,
            liquidationBonus: 0.045,
            supplied: 420000000,
            borrowed: 336000000,
            utilization: 0.80,
            canBeCollateral: true,
            canBeBorrowed: true,
        },
        {
            asset: "DAI",
            ltv: 0.77,
            liquidationThreshold: 0.80,
            liquidationBonus: 0.05,
            supplied: 180000000,
            borrowed: 126000000,
            utilization: 0.70,
            canBeCollateral: true,
            canBeBorrowed: true,
        },
        {
            asset: "USDT",
            ltv: 0.00,
            liquidationThreshold: 0.00,
            liquidationBonus: 0.00,
            supplied: 150000000,
            borrowed: 105000000,
            utilization: 0.70,
            canBeCollateral: false,
            canBeBorrowed: true,
        },
        {
            asset: "LINK",
            ltv: 0.65,
            liquidationThreshold: 0.70,
            liquidationBonus: 0.10,
            supplied: 80000000,
            borrowed: 56000000,
            utilization: 0.70,
            canBeCollateral: true,
            canBeBorrowed: true,
        },
        {
            asset: "AAVE",
            ltv: 0.60,
            liquidationThreshold: 0.70,
            liquidationBonus: 0.10,
            supplied: 45000000,
            borrowed: 22500000,
            utilization: 0.50,
            canBeCollateral: true,
            canBeBorrowed: true,
        },
        {
            asset: "UNI",
            ltv: 0.60,
            liquidationThreshold: 0.77,
            liquidationBonus: 0.10,
            supplied: 35000000,
            borrowed: 21000000,
            utilization: 0.60,
            canBeCollateral: true,
            canBeBorrowed: true,
        },
    ];
};
