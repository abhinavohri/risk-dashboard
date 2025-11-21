import { NextResponse } from 'next/server';
import { generateAssetLiquidationData } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const protocol = searchParams.get('protocol') || 'aave-v3';
  const data = generateAssetLiquidationData(protocol);
  return NextResponse.json(data);
}
