import { NextResponse } from 'next/server'
import { getProductById } from '@/modules/lvp/service'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await getProductById(id)
    if (!product) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: product })
  } catch (e) {
    console.error('LVP get error', e)
    return NextResponse.json({ success: false, error: 'Failed to load product' }, { status: 500 })
  }
}
