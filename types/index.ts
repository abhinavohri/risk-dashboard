export interface ProtocolMetrics {
  protocol: string;
  tvl: number; // in USD
  totalBorrowed: number;
  utilizationRate: number; // 0-1
  averageHealthFactor: number; // > 1 is healthy
  liquidationsLast24h: number;
  uniqueUsers: number;
  timestamp: number;
}

export interface TimeSeriesPoint {
  timestamp: number;
  value: number;
  upperBound?: number;
  lowerBound?: number;
  borrow?: number;
  utilization?: number;
}

export interface RiskPosition {
  id: string;
  userAddress: string; // anonymized
  collateralUSD: number;
  borrowedUSD: number;
  healthFactor: number;
  liquidationPrice: number;
  asset: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface AssetLiquidationConfig {
  asset: string;
  ltv: number; // Loan-to-Value ratio (0-1)
  liquidationThreshold: number; // (0-1)
  liquidationBonus: number; // (0-1)
  supplied: number; // Total supplied in USD
  borrowed: number; // Total borrowed in USD
  utilization: number; // Current utilization rate (0-1)
  canBeCollateral: boolean;
  canBeBorrowed: boolean;
}

export interface OracleDeviationPoint {
  timestamp: number;
  chainlink: number;
  uniswap: number;
  band: number;
}

export interface TokenDistribution {
  name: string;
  value: number; // in USD
  percentage: number; // 0-100
  color: string;
}

export interface APYPoint {
  timestamp: number;
  supplyAPY: number;
  borrowAPY: number;
}

export interface ReserveDataPoint {
  asset: string;
  supplied: number;
  borrowed: number;
}
