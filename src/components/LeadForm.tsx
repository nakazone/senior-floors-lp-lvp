'use client'

import { useState, useEffect } from 'react'

type Product = { id: string; name: string } | null

export function LeadForm({
  selectedProduct,
  serviceType: initialServiceType,
  sqft: initialSqft,
}: {
  selectedProduct: Product
  serviceType: 'material_only' | 'labor_only' | 'full_installation'
  sqft?: string
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [sqft, setSqft] = useState(initialSqft || '')
  const [serviceType, setServiceType] = useState(initialServiceType)
  const [photoUrl, setPhotoUrl] = useState<string | undefined>()
  useEffect(() => {
    setSqft(initialSqft || '')
  }, [initialSqft])
  useEffect(() => {
    setServiceType(initialServiceType)
  }, [initialServiceType])
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setError('Photo must be under 2MB')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setPhotoUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          zipCode,
          sqft: sqft ? parseFloat(sqft) : undefined,
          productId: selectedProduct?.id || undefined,
          serviceType,
          photoUrl: photoUrl || undefined,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed to submit')
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <section id="contact" className="bg-[#1a2036] py-16 text-white md:py-20">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="text-2xl font-bold">Thank you!</h2>
          <p className="mt-2 text-white/90">We&apos;ll contact you within 24 hours with your free estimate.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="bg-[#1a2036] py-16 text-white md:py-20">
      <div className="mx-auto max-w-xl px-4">
        <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">Get Your Free Estimate</h2>
        <p className="mx-auto mb-8 text-center text-white/90">
          Fill out the form and we&apos;ll reach out within 24h.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white/10 p-6 backdrop-blur-sm">
          <div>
            <label className="block text-sm font-medium text-white/90">Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/90">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/90">Phone *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50"
              placeholder="(720) 555-0123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/90">Zip Code *</label>
            <input
              type="text"
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50"
              placeholder="80202"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/90">Square Footage (est.)</label>
            <input
              type="number"
              min={1}
              value={sqft}
              onChange={(e) => setSqft(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50"
              placeholder="500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/90">Service</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value as typeof serviceType)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white"
            >
              <option value="full_installation">Full installation (material + labor)</option>
              <option value="material_only">Material only</option>
              <option value="labor_only">Labor only</option>
            </select>
          </div>
          {selectedProduct && (
            <p className="text-sm text-white/80">Selected: {selectedProduct.name}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-white/90">Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-1 block w-full text-sm text-white/80 file:mr-2 file:rounded file:border-0 file:bg-white/20 file:px-3 file:py-1 file:text-sm file:text-white"
            />
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-[#d6b598] py-3 font-semibold text-[#1a2036] hover:bg-[#e0c4a8] disabled:opacity-50"
          >
            {submitting ? 'Sending...' : 'Get My Free Estimate'}
          </button>
        </form>
      </div>
    </section>
  )
}
