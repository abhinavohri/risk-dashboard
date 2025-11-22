import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { ethers } from "ethers";

const AAVE_POOL_ADDRESS = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2";
const AAVE_POOL_DATA_PROVIDER = "0x7B4EB56E7CD4b454BA8ff71E4518426369a138a3";

const AAVE_POOL_ABI = [
  "event Supply(address indexed reserve, address user, address indexed onBehalfOf, uint256 amount, uint16 indexed referralCode)",
  "event Borrow(address indexed reserve, address user, address indexed onBehalfOf, uint256 amount, uint8 interestRateMode, uint256 borrowRate, uint16 indexed referralCode)",
  "event Repay(address indexed reserve, address indexed user, address indexed repayer, uint256 amount, bool useATokens)",
  "event Withdraw(address indexed reserve, address indexed user, address indexed to, uint256 amount)",
];

const POOL_DATA_PROVIDER_ABI = [
  "function getAllReservesTokens() external view returns (tuple(string symbol, address tokenAddress)[])",
  "function getReserveConfigurationData(address asset) external view returns (uint256 decimals, uint256 ltv, uint256 liquidationThreshold, uint256 liquidationBonus, uint256 reserveFactor, bool usageAsCollateralEnabled, bool borrowingEnabled, bool stableBorrowRateEnabled, bool isActive, bool isFrozen)",
];

const tokenConfigCache: Record<string, { symbol: string; decimals: number }> = {};

async function fetchTokenConfigs(provider: ethers.JsonRpcProvider): Promise<void> {
  const dataProvider = new ethers.Contract(
    AAVE_POOL_DATA_PROVIDER,
    POOL_DATA_PROVIDER_ABI,
    provider
  );

  const reserveTokens = await dataProvider.getAllReservesTokens();

  const configPromises = reserveTokens.map(
    async (token: { symbol: string; tokenAddress: string }) => {
      const configData = await dataProvider.getReserveConfigurationData(token.tokenAddress);
      const checksumAddress = ethers.getAddress(token.tokenAddress);
      tokenConfigCache[checksumAddress] = {
        symbol: token.symbol,
        decimals: Number(configData.decimals),
      };
    }
  );

  await Promise.all(configPromises);
}

function getTokenConfig(address: string): { symbol: string; decimals: number } {
  const checksumAddress = ethers.getAddress(address);
  return tokenConfigCache[checksumAddress] || { symbol: "UNKNOWN", decimals: 18 };
}

export const fetchAndStoreEvents = internalAction({
  handler: async (ctx) => {
    const nodeUrl = process.env.ETHEREUM_NODE_URL;
    if (!nodeUrl) {
      throw new Error("ETHEREUM_NODE_URL not set");
    }

    const provider = new ethers.JsonRpcProvider(nodeUrl);
    const contract = new ethers.Contract(AAVE_POOL_ADDRESS, AAVE_POOL_ABI, provider);

    await fetchTokenConfigs(provider);

    const lastProcessedBlock = await ctx.runQuery(internal.queries.getLastProcessedBlock);

    const latestBlock = await provider.getBlockNumber();
    const fromBlock = lastProcessedBlock ? lastProcessedBlock + 1 : latestBlock - 100;

    if (fromBlock > latestBlock) return;

    const [supplyEvents, borrowEvents, repayEvents, withdrawEvents] = await Promise.all([
      contract.queryFilter("Supply", fromBlock, latestBlock),
      contract.queryFilter("Borrow", fromBlock, latestBlock),
      contract.queryFilter("Repay", fromBlock, latestBlock),
      contract.queryFilter("Withdraw", fromBlock, latestBlock),
    ]);

    const allEvents = [...supplyEvents, ...borrowEvents, ...repayEvents, ...withdrawEvents] as ethers.EventLog[];

    const blockNumbers = [...new Set(allEvents.map((e) => e.blockNumber))];
    const blockTimestamps: Record<number, number> = {};

    await Promise.all(
      blockNumbers.map(async (blockNum) => {
        const block = await provider.getBlock(blockNum);
        if (block) {
          blockTimestamps[blockNum] = block.timestamp;
        }
      })
    );

    const mutationPromises = allEvents.map((event) => {
      if (event.eventName && event.args) {
        const tokenConfig = getTokenConfig(event.args.reserve);
        const formattedAmount = ethers.formatUnits(event.args.amount, tokenConfig.decimals);

        return ctx.runMutation(internal.mutations.storeEvent, {
          type: event.eventName,
          user: event.args.user,
          reserve: event.args.reserve,
          symbol: tokenConfig.symbol,
          amount: formattedAmount,
          blockNumber: event.blockNumber,
          timestamp: blockTimestamps[event.blockNumber] || Math.floor(Date.now() / 1000),
          transactionHash: event.transactionHash,
          logIndex: event.index,
        });
      }
      return null;
    }).filter((p) => p !== null);

    await Promise.all(mutationPromises);

    await ctx.runMutation(internal.mutations.setLastProcessedBlock, { blockNumber: latestBlock });
  },
});
