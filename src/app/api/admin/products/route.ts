import { NextResponse } from 'next/server'
import { requireAdmin } from '@/modules/admin/middleware'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const auth = requireAdmin(request)
  if (auth instanceof NextResponse) return auth
  try {
    const products = await prisma.lVPProduct.findMany({ orderBy: { name: 'asc' } })
    return NextResponse.json({ success: true, data: products })
  } catch (e) {
    console.error('Admin products list error', e)
    return NextResponse.json({ success: false, error: 'Failed to load products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = requireAdmin(request)
  if (auth instanceof NextResponse) return auth
  try {
    const body = await request.json()
    const product = await prisma.lVPProduct.create({
      data: {
        name: String(body.name),
        description: body.description ? String(body.description) : null,
        thickness: parseFloat(body.thickness) || 0,
        wearLayer: parseInt(body.wearLayer, 10) || 0,
        color: String(body.color || ''),
        pricePerSqft: parseFloat(body.pricePerSqft) || 0,
        waterproof: Boolean(body.waterproof),
        commercial: Boolean(body.commercial),
        imageUrl: String(body.imageUrl || '/placeholder-lvp.jpg'),
        active: body.active !== false,
      },
    })
    return NextResponse.json({ success: true, data: product })
  } catch (e) {
    console.error('Admin product create error', e)
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 })
  }
}
