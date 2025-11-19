import { ProtocolMetrics } from "@/types";
import { generateProtocolMetrics } from "./mockData";

const DEFILLAMA_API = "https://api.llama.fi";

export async function fetchProtocolMetrics(protocolSlug: string = "aave-v3"): Promise<ProtocolMetrics | null> {
    try {
        const response = await fetch(`${DEFILLAMA_API}/protocol/${protocolSlug}`, {
            next: { revalidate: 60 } 
        });
        if (!response.ok) throw new Error("Failed to fetch from DefiLlama");

        const data = await response.json();

        console.log("data", data)
        const mock = generateProtocolMetrics();

        let currentTvl = mock.tvl;

        if (Array.isArray(data.tvl) && data.tvl.length > 0) {
            const lastPoint = data.tvl[data.tvl.length - 1];
            currentTvl = lastPoint?.totalLiquidityUSD ?? mock.tvl;
        }

        return {
            ...mock,
            protocol: data.name || protocolSlug,
            tvl: currentTvl,
        };
    } catch (error) {
        console.error("Failed to fetch TVL data:", error);
        return null;
    }
}
