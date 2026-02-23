'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Product = {
  id: string
  name: string
  thickness: number
  wearLayer: number
  color: string
  pricePerSqft: number
  waterproof: boolean
  commercial: boolean
  active: boolean
  imageUrl: string
}

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}

  useEffect(() => {
    if (!token) {
      router.replace('/admin')
      return
    }
    fetch('/api/admin/products', { headers })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProducts(d.data)
        else router.replace('/admin')
      })
      .catch(() => router.replace('/admin'))
      .finally(() => setLoading(false))
  }, [router, token])

  const toggleActive = async (id: string, active: boolean) => {
    if (!token) return
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !active }),
    })
    const data = await res.json()
    if (data.success) setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)))
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard" className="text-[#4a5568] hover:text-[#1a2036]">← Dashboard</Link>
        <Link href="/admin/products/new" className="rounded-lg bg-[#1a2036] px-4 py-2 text-sm font-medium text-white">Add product</Link>
      </div>
      <h1 className="mt-6 text-2xl font-bold text-[#1a2036]">LVP Products</h1>
      <div className="mt-4 overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#e2e8f0] bg-[#f7f8fc]">
            <tr>
              <th className="p-3 font-medium text-[#1a2036]">Name</th>
              <th className="p-3 font-medium text-[#1a2036]">Color</th>
              <th className="p-3 font-medium text-[#1a2036]">Thickness / Wear</th>
              <th className="p-3 font-medium text-[#1a2036]">$/sqft</th>
              <th className="p-3 font-medium text-[#1a2036]">Active</th>
              <th className="p-3 font-medium text-[#1a2036]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-[#e2e8f0]">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.color}</td>
                <td className="p-3">{p.thickness}mm / {p.wearLayer}mil</td>
                <td className="p-3">${p.pricePerSqft.toFixed(2)}</td>
                <td className="p-3">{p.active ? 'Yes' : 'No'}</td>
                <td className="p-3 flex gap-2">
                  <Link href={`/admin/products/${p.id}`} className="text-[#1a2036] underline">Edit</Link>
                  <button type="button" onClick={() => toggleActive(p.id, p.active)} className="text-[#4a5568] hover:text-[#1a2036]">
                    {p.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="p-6 text-center text-[#718096]">No products yet. Add one to show in the catalog.</p>
        )}
      </div>
    </div>
  )
}
