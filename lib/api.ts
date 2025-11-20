import { ProtocolMetrics, TimeSeriesPoint } from "@/types";
import { generateProtocolMetrics, generateTimeSeriesData } from "./mockData";

const DEFILLAMA_API = "https://api.llama.fi";

export interface ProtocolData {
  metrics: ProtocolMetrics;
  tvlHistory: TimeSeriesPoint[];
}

export async function fetchProtocolData(protocolSlug: string = "aave-v3"): Promise<ProtocolData> {
    try {
        const response = await fetch(`${DEFILLAMA_API}/protocol/${protocolSlug}`, {
            cache: "no-store"
        });

        if (!response.ok) throw new Error("Failed to fetch from DefiLlama");

        const data = await response.json();
        const mock = generateProtocolMetrics(protocolSlug);

        let currentTvl = mock.tvl;
        let tvlHistory: TimeSeriesPoint[] = generateTimeSeriesData(30, protocolSlug);

        // Extract current TVL and only last 30 days
        if (Array.isArray(data.tvl) && data.tvl.length > 0) {
            const lastPoint = data.tvl[data.tvl.length - 1];
            currentTvl = lastPoint?.totalLiquidityUSD ?? mock.tvl;

            // Only take last 30 days to reduce payload
            const recentTvl = data.tvl.slice(-30);
            tvlHistory = recentTvl.map((point: { date: number; totalLiquidityUSD: number }) => ({
                timestamp: point.date * 1000, // Convert to ms
                value: point.totalLiquidityUSD,
            }));
        }

        // Return lightweight processed data (will be cached by page)
        return {
            metrics: {
                ...mock,
                protocol: data.name || protocolSlug,
                tvl: currentTvl,
            },
            tvlHistory,
        };
    } catch (error) {
        console.error("Failed to fetch protocol data:", error);
        // Return mock data as fallback
        return {
            metrics: generateProtocolMetrics(protocolSlug),
            tvlHistory: generateTimeSeriesData(30, protocolSlug),
        };
    }
}

export async function fetchProtocolDataClient(protocolSlug: string = "aave-v3"): Promise<ProtocolData> {
    const response = await fetch(`/api/protocol?slug=${protocolSlug}`);
    if (!response.ok) throw new Error("Failed to fetch protocol data");
    return response.json();
}
