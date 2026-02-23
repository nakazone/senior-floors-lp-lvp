'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewProductPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [thickness, setThickness] = useState('6')
  const [wearLayer, setWearLayer] = useState('12')
  const [color, setColor] = useState('')
  const [pricePerSqft, setPricePerSqft] = useState('')
  const [waterproof, setWaterproof] = useState(true)
  const [commercial, setCommercial] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  useEffect(() => {
    if (!token) router.replace('/admin')
  }, [token, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description: description || null,
        thickness: parseFloat(thickness) || 6,
        wearLayer: parseInt(wearLayer, 10) || 12,
        color,
        pricePerSqft: parseFloat(pricePerSqft) || 0,
        waterproof,
        commercial,
        imageUrl: imageUrl || 'https://placehold.co/400x300/f7f8fc/4a5568?text=LVP',
        active: true,
      }),
    })
    const data = await res.json()
    setSaving(false)
    if (data.success) router.push('/admin/products')
    else setError(data.error || 'Failed to create')
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <Link href="/admin/products" className="text-[#4a5568] hover:text-[#1a2036]">← Products</Link>
      <h1 className="mt-6 text-2xl font-bold text-[#1a2036]">New LVP Product</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4 rounded-xl bg-white p-6 shadow">
        <div>
          <label className="block text-sm font-medium text-[#1a2036]">Name *</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-[#e2e8f0] px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a2036]">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-[#e2e8f0] px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1a2036]">Thickness (mm)</label>
            <input type="number" step="0.5" value={thickness} onChange={(e) => setThickness(e.target.value)} className="mt-1 w-full rounded-lg border border-[#e2e8f0] px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1a2036]">Wear layer (mil)</label>
            <input type="number" value={wearLayer} onChange={(e) => setWearLayer(e.target.value)} className="mt-1 w-full rounded-lg border border-[#e2e8f0] px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a2036]">Color *</label>
          <input type="text" required value={color} onChange={(e) => setColor(e.target.value)} placeholder="e.g. Oak, Gray" className="mt-1 w-full rounded-lg border border-[#e2e8f0] px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a2036]">Price per sqft ($) *</label>
          <input type="number" step="0.01" min="0" required value={pricePerSqft} onChange={(e) => setPricePerSqft(e.target.value)} className="mt-1 w-full rounded-lg border border-[#e2e8f0] px-3 py-2" />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={waterproof} onChange={(e) => setWaterproof(e.target.checked)} />
            <span className="text-sm text-[#1a2036]">Waterproof</span>
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={commercial} onChange={(e) => setCommercial(e.target.checked)} />
            <span className="text-sm text-[#1a2036]">Commercial grade</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a2036]">Image URL</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="mt-1 w-full rounded-lg border border-[#e2e8f0] px-3 py-2" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={saving} className="w-full rounded-lg bg-[#1a2036] py-2 font-medium text-white disabled:opacity-50">
          {saving ? 'Saving...' : 'Create product'}
        </button>
      </form>
    </div>
  )
}
