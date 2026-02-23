import { NextResponse } from 'next/server'
import { findAdminByEmail, verifyPassword, signToken } from '@/modules/admin/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body.email || '').trim()
    const password = String(body.password || '')
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password required' }, { status: 400 })
    }
    const admin = await findAdminByEmail(email)
    if (!admin || !(await verifyPassword(password, admin.password))) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }
    const token = signToken({ sub: admin.id, email: admin.email })
    return NextResponse.json({ success: true, data: { token } })
  } catch (e) {
    console.error('Admin login error', e)
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 })
  }
}
