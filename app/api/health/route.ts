import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "cwcw-network",
    timestamp: new Date().toISOString(),
  });
}
