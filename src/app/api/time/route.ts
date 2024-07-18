import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET() {
  return NextResponse.json({
    time: new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Jakarta'
    })
  })
}
