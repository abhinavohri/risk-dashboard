import { ProtocolMetrics, TimeSeriesPoint, RiskPosition, OracleEvent } from "@/types";
import { subDays, subHours } from "date-fns";

export const generateProtocolMetrics = (): ProtocolMetrics => ({
    protocol: "LlamaLend",
    tvl: 12500000 + Math.random() * 500000,
    totalBorrowed: 8500000 + Math.random() * 200000,
    utilizationRate: 0.65 + Math.random() * 0.1,
    averageHealthFactor: 1.8 + Math.random() * 0.4,
    liquidationsLast24h: Math.floor(Math.random() * 5),
    uniqueUsers: 1200 + Math.floor(Math.random() * 50),
    timestamp: Date.now(),
});

export const generateTimeSeriesData = (days: number = 30): TimeSeriesPoint[] => {
    const data: TimeSeriesPoint[] = [];
    let currentValue = 10000000;

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

export const generateOracleEvents = (count: number = 10): OracleEvent[] => {
    return Array.from({ length: count }).map((_, i) => {
        const price = 2000 + Math.random() * 100;
        const deviation = (Math.random() * 3);

        let severity: OracleEvent['severity'] = 'info';
        if (deviation > 2) severity = 'critical';
        else if (deviation > 1) severity = 'warning';

        return {
            id: `evt-${i}`,
            timestamp: subHours(new Date(), i * 2).getTime(),
            asset: "ETH",
            priceSource: Math.random() > 0.5 ? "Chainlink" : "Uniswap",
            price,
            upperPriceBound: price * 1.02,
            lowerPriceBound: price * 0.98,
            deviation,
            severity,
        };
    });
};
