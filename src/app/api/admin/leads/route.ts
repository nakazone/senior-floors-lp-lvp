import { NextResponse } from 'next/server'
import { requireAdmin } from '@/modules/admin/middleware'
import { getLeads } from '@/modules/leads/service'

export async function GET(request: Request) {
  const auth = requireAdmin(request)
  if (auth instanceof NextResponse) return auth
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '500', 10), 2000)
    const leads = await getLeads(limit)
    return NextResponse.json({ success: true, data: leads })
  } catch (e) {
    console.error('Admin leads list error', e)
    return NextResponse.json({ success: false, error: 'Failed to load leads' }, { status: 500 })
  }
}
