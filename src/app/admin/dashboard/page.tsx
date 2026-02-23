'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<{ products: number; leads: number } | null>(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    if (!token) {
      router.replace('/admin')
      return
    }
    const headers = { Authorization: `Bearer ${token}` }
    Promise.all([
      fetch('/api/admin/products', { headers }).then((r) => r.json()),
      fetch('/api/admin/leads', { headers }).then((r) => r.json()),
    ]).then(([p, l]) => {
      if (p.success && l.success) setStats({ products: p.data.length, leads: l.data.length })
      else router.replace('/admin')
    }).catch(() => router.replace('/admin'))
  }, [router])

  const logout = () => {
    localStorage.removeItem('admin_token')
    router.replace('/admin')
  }

  if (stats === null) return <div className="p-8">Loading...</div>

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a2036]">Admin</h1>
        <div className="flex gap-2">
          <Link href="/" className="rounded-lg border border-[#e2e8f0] px-4 py-2 text-sm font-medium text-[#1a2036]">View site</Link>
          <button type="button" onClick={logout} className="rounded-lg bg-[#e2e8f0] px-4 py-2 text-sm font-medium text-[#1a2036]">Logout</button>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/products" className="rounded-xl bg-white p-6 shadow">
          <h2 className="font-semibold text-[#1a2036]">Products (LVP)</h2>
          <p className="mt-1 text-2xl font-bold text-[#1a2036]">{stats.products}</p>
          <p className="mt-1 text-sm text-[#718096]">Create, edit, activate/deactivate</p>
        </Link>
        <Link href="/admin/leads" className="rounded-xl bg-white p-6 shadow">
          <h2 className="font-semibold text-[#1a2036]">Leads</h2>
          <p className="mt-1 text-2xl font-bold text-[#1a2036]">{stats.leads}</p>
          <p className="mt-1 text-sm text-[#718096]">View and export CSV</p>
        </Link>
        <Link href="/admin/config" className="rounded-xl bg-white p-6 shadow sm:col-span-2">
          <h2 className="font-semibold text-[#1a2036]">Config</h2>
          <p className="mt-1 text-sm text-[#718096]">Labor rate per sqft</p>
        </Link>
      </div>
    </div>
  )
}
