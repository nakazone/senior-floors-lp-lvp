import { NextResponse } from 'next/server'
import { requireAdmin } from '@/modules/admin/middleware'
import { getLeads } from '@/modules/leads/service'

export async function GET(request: Request) {
  const auth = requireAdmin(request)
  if (auth instanceof NextResponse) return auth
  try {
    const leads = await getLeads(2000)
    const headers = ['Name', 'Email', 'Phone', 'Zip', 'Sqft', 'Product', 'Service Type', 'Status', 'Created At']
    const rows = leads.map((l) => [
      l.name,
      l.email,
      l.phone,
      l.zipCode,
      l.sqft ?? '',
      l.product?.name ?? '',
      l.serviceType,
      l.status,
      l.createdAt.toISOString(),
    ])
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n')
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="leads.csv"',
      },
    })
  } catch (e) {
    console.error('Admin leads export error', e)
    return NextResponse.json({ success: false, error: 'Export failed' }, { status: 500 })
  }
}
