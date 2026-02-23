'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminConfigPage() {
  const router = useRouter()
  const [rate, setRate] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  useEffect(() => {
    if (!token) {
      router.replace('/admin')
      return
    }
    fetch('/api/admin/config', { headers })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setRate(String(d.data.laborRatePerSqft ?? 2.5))
        else router.replace('/admin')
      })
      .catch(() => router.replace('/admin'))
  }, [router, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = parseFloat(rate)
    if (!Number.isFinite(v) || v < 0) {
      setMessage('Enter a valid number')
      return
    }
    setSaving(true)
    setMessage('')
    const res = await fetch('/api/admin/config', {
      method: 'PUT',
      headers: token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' },
      body: JSON.stringify({ laborRatePerSqft: v }),
    })
    const data = await res.json()
    setSaving(false)
    if (data.success) setMessage('Saved.')
    else setMessage(data.error || 'Failed')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <Link href="/admin/dashboard" className="text-[#4a5568] hover:text-[#1a2036]">← Dashboard</Link>
      <h1 className="mt-6 text-2xl font-bold text-[#1a2036]">Config</h1>
      <form onSubmit={handleSubmit} className="mt-4 rounded-xl bg-white p-6 shadow">
        <label className="block text-sm font-medium text-[#1a2036]">Labor rate per sqft ($)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[#e2e8f0] px-3 py-2"
        />
        <p className="mt-1 text-sm text-[#718096]">Used in the price calculator for labor-only and full installation.</p>
        {message && <p className="mt-2 text-sm text-[#1a2036]">{message}</p>}
        <button type="submit" disabled={saving} className="mt-4 w-full rounded-lg bg-[#1a2036] py-2 font-medium text-white disabled:opacity-50">
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
