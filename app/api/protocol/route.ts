import { NextRequest, NextResponse } from "next/server";
import { fetchProtocolData } from "@/lib/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug") || "aave-v3";

  try {
    const data = await fetchProtocolData(slug);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch protocol data" },
      { status: 500 }
    );
  }
}
