import { ProtocolMetrics, TimeSeriesPoint, RiskPosition, OracleDeviationPoint, APYPoint, ReserveDataPoint, TokenDistribution } from "@/types";
import {
    generateProtocolMetrics,
    generateTimeSeriesData,
    generateRiskPositions,
    generateOracleDeviationData,
    generateAPYData,
    generateReserveData
} from "./mockData";

const DEFILLAMA_API = "https://api.llama.fi";

const TOKEN_COLORS: Record<string, string> = {
    'WETH': '#627EEA', 'ETH': '#627EEA', 'STETH': '#00A3FF',
    'WBTC': '#F7931A', 'BTC': '#F7931A',
    'USDC': '#2775CA', 'USDT': '#26A17B', 'DAI': '#F5AC37', 'FRAX': '#000000',
    'AAVE': '#B6509E', 'LINK': '#2A5ADA', 'UNI': '#FF007A',
    'CRV': '#40649F', 'CVX': '#3A3A3A', 'BAL': '#1E1E1E',
};

export interface ProtocolData {
    metrics: ProtocolMetrics;
    tvlHistory: TimeSeriesPoint[];
    tokenDistribution: TokenDistribution[];
    riskPositions: RiskPosition[];
    oracleData: OracleDeviationPoint[];
    apyData: APYPoint[];
    reserveData: ReserveDataPoint[];
}

export async function fetchProtocolData(protocolSlug: string = "aave"): Promise<ProtocolData> {
    try {
        const response = await fetch(`${DEFILLAMA_API}/protocol/${protocolSlug}`, {
            next: { revalidate: 300 }
        });

        if (!response.ok) throw new Error("Failed to fetch from DefiLlama");

        const data = await response.json();
        const mock = generateProtocolMetrics(protocolSlug);

        let currentTvl = mock.tvl;
        let tvlHistory: TimeSeriesPoint[] = [];

        if (Array.isArray(data.tvl) && data.tvl.length > 0) {
            const lastPoint = data.tvl[data.tvl.length - 1];
            currentTvl = lastPoint?.totalLiquidityUSD ?? mock.tvl;

            const recentTvl = data.tvl.slice(-365);
            tvlHistory = recentTvl.map((point: { date: number; totalLiquidityUSD: number }) => ({
                timestamp: point.date * 1000,
                value: point.totalLiquidityUSD,
            }));
        }

        let tokenDistribution: TokenDistribution[] = [];
        if (Array.isArray(data.tokensInUsd) && data.tokensInUsd.length > 0) {
            const latestTokens = data.tokensInUsd[data.tokensInUsd.length - 1].tokens;

            const tokenEntries = Object.entries(latestTokens)
                .map(([name, value]) => ({ name, value: value as number }))
                .sort((a, b) => b.value - a.value);

            const topTokens = tokenEntries.slice(0, 7);
            const otherTokens = tokenEntries.slice(7);
            const otherValue = otherTokens.reduce((sum, t) => sum + t.value, 0);

            const totalValue = tokenEntries.reduce((sum, t) => sum + t.value, 0);

            tokenDistribution = topTokens.map(({ name, value }) => ({
                name,
                value,
                percentage: (value / totalValue) * 100,
                color: TOKEN_COLORS[name] || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            }));

            if (otherValue > 0) {
                tokenDistribution.push({
                    name: 'Other',
                    value: otherValue,
                    percentage: (otherValue / totalValue) * 100,
                    color: '#9CA3AF',
                });
            }
        }

        return {
            metrics: {
                ...mock,
                protocol: data.name || protocolSlug,
                tvl: currentTvl,
            },
            tvlHistory,
            tokenDistribution,
            riskPositions: generateRiskPositions(50),
            oracleData: generateOracleDeviationData(24, protocolSlug),
            apyData: generateAPYData(30, protocolSlug),
            reserveData: generateReserveData(protocolSlug),
        };
    } catch (error) {
        console.error("Failed to fetch protocol data:", error);
        return {
            metrics: generateProtocolMetrics(protocolSlug),
            tvlHistory: generateTimeSeriesData(30, protocolSlug),
            tokenDistribution: [],
            riskPositions: generateRiskPositions(50),
            oracleData: generateOracleDeviationData(24, protocolSlug),
            apyData: generateAPYData(30, protocolSlug),
            reserveData: generateReserveData(protocolSlug),
        };
    }
}

export async function fetchProtocolDataClient(protocolSlug: string = "aave-v3"): Promise<ProtocolData> {
    const response = await fetch(`/api/protocol?slug=${protocolSlug}`);
    if (!response.ok) throw new Error("Failed to fetch protocol data");
    return response.json();
}
