import { NextResponse } from 'next/server'
import { getActiveProducts } from '@/modules/lvp/service'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const color = searchParams.get('color') || undefined
    const thickness = searchParams.get('thickness')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const waterproof = searchParams.get('waterproof')
    const commercial = searchParams.get('commercial')

    const products = await getActiveProducts({
      color,
      thickness: thickness ? parseFloat(thickness) : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      waterproof: waterproof === 'true' ? true : waterproof === 'false' ? false : undefined,
      commercial: commercial === 'true' ? true : commercial === 'false' ? false : undefined,
    })
    return NextResponse.json({ success: true, data: products })
  } catch (e) {
    console.error('LVP list error', e)
    return NextResponse.json({ success: false, error: 'Failed to load products' }, { status: 500 })
  }
}
