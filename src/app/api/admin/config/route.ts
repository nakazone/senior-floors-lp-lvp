import { NextResponse } from 'next/server'
import { requireAdmin } from '@/modules/admin/middleware'
import { getLaborRate, setLaborRate } from '@/modules/calculator/service'

export async function GET(request: Request) {
  const auth = requireAdmin(request)
  if (auth instanceof NextResponse) return auth
  try {
    const rate = await getLaborRate()
    return NextResponse.json({ success: true, data: { laborRatePerSqft: rate } })
  } catch (e) {
    console.error('Admin config get error', e)
    return NextResponse.json({ success: false, error: 'Failed to get config' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const auth = requireAdmin(request)
  if (auth instanceof NextResponse) return auth
  try {
    const body = await request.json()
    const rate = body.laborRatePerSqft != null ? parseFloat(body.laborRatePerSqft) : undefined
    if (rate == null || !Number.isFinite(rate) || rate < 0) {
      return NextResponse.json({ success: false, error: 'Invalid laborRatePerSqft' }, { status: 400 })
    }
    await setLaborRate(rate)
    return NextResponse.json({ success: true, data: { laborRatePerSqft: rate } })
  } catch (e) {
    console.error('Admin config update error', e)
    return NextResponse.json({ success: false, error: 'Failed to update config' }, { status: 500 })
  }
}
