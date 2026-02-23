import { NextResponse } from 'next/server'
import { getLaborRate } from '@/modules/calculator/service'

export async function GET() {
  try {
    const rate = await getLaborRate()
    return NextResponse.json({ success: true, data: { laborRatePerSqft: rate } })
  } catch (e) {
    console.error('Labor rate error', e)
    return NextResponse.json({ success: false, error: 'Failed to get rate' }, { status: 500 })
  }
}
