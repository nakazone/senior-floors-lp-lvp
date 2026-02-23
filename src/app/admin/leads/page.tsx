'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Lead = {
  id: string
  name: string
  email: string
  phone: string
  zipCode: string
  sqft: number | null
  serviceType: string
  status: string
  createdAt: string
  product: { name: string } | null
}

export default function AdminLeadsPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  useEffect(() => {
    if (!token) {
      router.replace('/admin')
      return
    }
    fetch('/api/admin/leads', { headers })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setLeads(d.data)
        else router.replace('/admin')
      })
      .catch(() => router.replace('/admin'))
      .finally(() => setLoading(false))
  }, [router, token])

  const exportCsv = async () => {
    if (!token) return
    const res = await fetch('/api/admin/leads/export', { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) return
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leads.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard" className="text-[#4a5568] hover:text-[#1a2036]">← Dashboard</Link>
        <button type="button" onClick={exportCsv} className="rounded-lg bg-[#1a2036] px-4 py-2 text-sm font-medium text-white">
          Export CSV
        </button>
      </div>
      <h1 className="mt-6 text-2xl font-bold text-[#1a2036]">Leads</h1>
      <div className="mt-4 overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#e2e8f0] bg-[#f7f8fc]">
            <tr>
              <th className="p-3 font-medium text-[#1a2036]">Name</th>
              <th className="p-3 font-medium text-[#1a2036]">Email</th>
              <th className="p-3 font-medium text-[#1a2036]">Phone</th>
              <th className="p-3 font-medium text-[#1a2036]">Zip</th>
              <th className="p-3 font-medium text-[#1a2036]">Sqft</th>
              <th className="p-3 font-medium text-[#1a2036]">Service</th>
              <th className="p-3 font-medium text-[#1a2036]">Product</th>
              <th className="p-3 font-medium text-[#1a2036]">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b border-[#e2e8f0]">
                <td className="p-3">{l.name}</td>
                <td className="p-3">{l.email}</td>
                <td className="p-3">{l.phone}</td>
                <td className="p-3">{l.zipCode}</td>
                <td className="p-3">{l.sqft ?? '—'}</td>
                <td className="p-3">{l.serviceType}</td>
                <td className="p-3">{l.product?.name ?? '—'}</td>
                <td className="p-3">{new Date(l.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <p className="p-6 text-center text-[#718096]">No leads yet.</p>}
      </div>
    </div>
  )
}
