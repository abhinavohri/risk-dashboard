import { ProtocolMetrics } from "@/types";
import { generateProtocolMetrics } from "./mockData";

const DEFILLAMA_API = "https://api.llama.fi";

export async function fetchProtocolMetrics(protocolSlug: string = "aave-v3"): Promise<ProtocolMetrics> {
    try {
        // Attempt to fetch real TVL data
        const response = await fetch(`${DEFILLAMA_API}/protocol/${protocolSlug}`);
        if (!response.ok) throw new Error("Failed to fetch from DefiLlama");

        const data = await response.json();

        // Mix real data with mock data for fields not easily available or for simulation
        const mock = generateProtocolMetrics();

        // DefiLlama returns tvl as an array of historical data points or a single number depending on endpoint
        // For /protocol/{slug}, it returns an object with `tvl` as an array.
        let currentTvl = mock.tvl;
        if (Array.isArray(data.tvl)) {
            const lastPoint = data.tvl[data.tvl.length - 1];
            currentTvl = lastPoint?.totalLiquidityUSD || mock.tvl;
        } else if (typeof data.tvl === 'number') {
            currentTvl = data.tvl;
        }

        return {
            ...mock,
            protocol: data.name || protocolSlug,
            tvl: currentTvl,
            // We use mock data for other fields as they are specific to risk analysis 
            // and might not be directly available in the simple protocol endpoint
        };
    } catch (error) {
        console.warn("Falling back to mock data:", error);
        return generateProtocolMetrics();
    }
}
