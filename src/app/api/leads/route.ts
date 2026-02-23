import { NextResponse } from 'next/server'
import { createLead } from '@/modules/leads/service'

function validateServiceType(v: string): 'material_only' | 'labor_only' | 'full_installation' | null {
  if (v === 'material_only' || v === 'labor_only' || v === 'full_installation') return v
  return null
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const phone = String(body.phone || '').trim()
    const zipCode = String(body.zipCode || '').trim()
    const serviceType = validateServiceType(body.serviceType || 'full_installation')
    if (!name || !email || !phone || !zipCode || !serviceType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, phone, zipCode, serviceType' },
        { status: 400 }
      )
    }
    const sqft = body.sqft != null ? parseFloat(body.sqft) : undefined
    const productId = body.productId ? String(body.productId).trim() : undefined
    const photoUrl = body.photoUrl ? String(body.photoUrl).trim() : undefined

    const lead = await createLead({
      name,
      email,
      phone,
      zipCode,
      sqft: Number.isFinite(sqft) ? sqft : undefined,
      productId: productId || undefined,
      serviceType,
      photoUrl: photoUrl || undefined,
    })
    // TODO: send email, notify admin, CRM webhook
    return NextResponse.json({ success: true, data: { id: lead.id } })
  } catch (e) {
    console.error('Lead create error', e)
    return NextResponse.json({ success: false, error: 'Failed to submit' }, { status: 500 })
  }
}
