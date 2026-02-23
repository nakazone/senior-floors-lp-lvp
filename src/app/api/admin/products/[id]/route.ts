import { NextResponse } from 'next/server'
import { requireAdmin } from '@/modules/admin/middleware'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdmin(request)
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const product = await prisma.lVPProduct.findUnique({ where: { id } })
    if (!product) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: product })
  } catch (e) {
    console.error('Admin product get error', e)
    return NextResponse.json({ success: false, error: 'Failed to load product' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdmin(request)
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const body = await request.json()
    const product = await prisma.lVPProduct.update({
      where: { id },
      data: {
        ...(body.name != null && { name: String(body.name) }),
        ...(body.description != null && { description: body.description ? String(body.description) : null }),
        ...(body.thickness != null && { thickness: parseFloat(body.thickness) || 0 }),
        ...(body.wearLayer != null && { wearLayer: parseInt(body.wearLayer, 10) || 0 }),
        ...(body.color != null && { color: String(body.color) }),
        ...(body.pricePerSqft != null && { pricePerSqft: parseFloat(body.pricePerSqft) || 0 }),
        ...(body.waterproof != null && { waterproof: Boolean(body.waterproof) }),
        ...(body.commercial != null && { commercial: Boolean(body.commercial) }),
        ...(body.imageUrl != null && { imageUrl: String(body.imageUrl) }),
        ...(body.active != null && { active: Boolean(body.active) }),
      },
    })
    return NextResponse.json({ success: true, data: product })
  } catch (e) {
    console.error('Admin product update error', e)
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdmin(request)
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    await prisma.lVPProduct.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Admin product delete error', e)
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 })
  }
}
