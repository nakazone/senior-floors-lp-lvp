import { NextResponse } from 'next/server'
import { verifyToken } from './auth'

export function getBearerToken(request: Request): string | null {
  const auth = request.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return null
  return auth.slice(7)
}

export function requireAdmin(request: Request): { sub: string; email: string } | NextResponse {
  const token = getBearerToken(request)
  if (!token) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  const payload = verifyToken(token)
  if (!payload) {
    return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 401 })
  }
  return payload
}
