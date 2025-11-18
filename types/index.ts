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

export interface OracleEvent {
  id: string;
  timestamp: number;
  asset: string;
  priceSource: string;
  price: number;
  upperPriceBound?: number;
  lowerPriceBound?: number;
  deviation: number; // percentage from median
  severity: 'info' | 'warning' | 'critical';
}
