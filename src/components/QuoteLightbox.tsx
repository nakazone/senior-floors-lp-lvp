'use client'

import { useState } from 'react'
import type { LVPProduct } from '@/data/lvpProducts'

const FORM_BASE_URL = process.env.NEXT_PUBLIC_SENIOR_FLOORS_FORM_BASE_URL || 'https://lp.senior-floors.com'

export type ServiceType = 'material_only' | 'labor_only' | 'full_installation'

type ZipCheckResult = { inRange: boolean; message?: string } | null

export interface QuoteLightboxProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  product: LVPProduct
  sqft: string
  serviceType: ServiceType
  estimateTotal: number | null
}

const serviceLabel: Record<ServiceType, string> = {
  full_installation: 'Full installation (material + labor)',
  material_only: 'Material only',
  labor_only: 'Labor only',
}

export function QuoteLightbox({
  isOpen,
  onClose,
  onSuccess,
  product,
  sqft,
  serviceType,
  estimateTotal,
}: QuoteLightboxProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [zipCheckResult, setZipCheckResult] = useState<ZipCheckResult | 'checking' | null>(null)
  const [zipCheckLoading, setZipCheckLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const runZipCheck = async () => {
    const zip = zipCode.replace(/\D/g, '').slice(0, 5)
    if (zip.length < 5) {
      setZipCheckResult(null)
      return
    }
    setZipCheckLoading(true)
    setZipCheckResult('checking')
    try {
      const res = await fetch(`${FORM_BASE_URL}/api/validate-zip?zip=${encodeURIComponent(zip)}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      })
      const data = await res.json()
      if (data?.ok === true) {
        setZipCheckResult({ inRange: data.inRange === true, message: data.message || undefined })
      } else {
        setZipCheckResult({ inRange: false, message: 'Could not verify ZIP.' })
      }
    } catch {
      setZipCheckResult({ inRange: false, message: 'Could not check availability.' })
    } finally {
      setZipCheckLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const zipClean = zipCode.replace(/\D/g, '').slice(0, 5)
    if (zipClean.length < 5) {
      setError('Please enter a valid 5-digit US zip code.')
      return
    }
    if (zipCheckResult === null || zipCheckResult === 'checking') {
      setError('Please check that your ZIP is in our service area before submitting.')
      return
    }
    if (!zipCheckResult.inRange) {
      setError(zipCheckResult.message || "We don't currently serve this ZIP code.")
      return
    }
    if (name.trim().length < 2) {
      setError('Name is required (at least 2 characters).')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number.')
      return
    }

    setSubmitting(true)
    try {
      const messageParts: string[] = [
        `Selected product: ${product.name}`,
        `Square footage (est.): ${sqft}`,
        `Service: ${serviceLabel[serviceType]}`,
      ]
      if (estimateTotal != null) messageParts.push(`Est. total: $${estimateTotal.toLocaleString()}`)
      const messageBody = messageParts.join('\n')

      const params = new URLSearchParams({
        'form-name': 'lvp-form',
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        zipcode: zipClean,
        message: messageBody,
      })
      const res = await fetch(`${FORM_BASE_URL}/api/send-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body: params.toString(),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || (data && data.success === false)) {
        throw new Error((data && data.message) || `Request failed (${res.status})`)
      }
      if (typeof (window as unknown as { fbq?: (a: string, b: string) => void }).fbq === 'function') {
        try {
          (window as unknown as { fbq: (a: string, b: string) => void }).fbq('track', 'Lead')
        } catch {}
      }
      setDone(true)
      setTimeout(() => {
        onSuccess?.()
        onClose()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-lightbox-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#4a5568] transition hover:bg-[#e2e8f0] hover:text-[#1a2036]"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 pt-10">
          <h2 id="quote-lightbox-title" className="text-xl font-bold text-[#1a2036] md:text-2xl">
            Get Your Quote
          </h2>

          {done ? (
            <div className="py-8 text-center">
              <p className="text-lg font-semibold text-[#1a2036]">Thank you!</p>
              <p className="mt-2 text-[#4a5568]">We&apos;ll contact you within 24 hours with your free estimate.</p>
            </div>
          ) : (
            <>
              {/* Summary: selected floor info */}
              <div className="mt-4 rounded-xl bg-[#f7f8fc] p-4">
                <h3 className="mb-2 text-sm font-semibold text-[#1a2036]">Your selection</h3>
                <ul className="space-y-1 text-sm text-[#4a5568]">
                  <li><strong className="text-[#1a2036]">Floor:</strong> {product.name}</li>
                  <li><strong className="text-[#1a2036]">Square footage:</strong> {sqft || '—'}</li>
                  <li><strong className="text-[#1a2036]">Service:</strong> {serviceLabel[serviceType]}</li>
                  {estimateTotal != null && (
                    <li><strong className="text-[#1a2036]">Est. total:</strong> ${estimateTotal.toLocaleString()}</li>
                  )}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="quote-name" className="mb-1 block text-sm font-semibold text-[#1a2036]">Name *</label>
                  <input
                    id="quote-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="quote-phone" className="mb-1 block text-sm font-semibold text-[#1a2036]">Phone *</label>
                  <input
                    id="quote-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                    placeholder="(720) 555-0123"
                  />
                </div>
                <div>
                  <label htmlFor="quote-email" className="mb-1 block text-sm font-semibold text-[#1a2036]">Email *</label>
                  <input
                    id="quote-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="quote-zip" className="mb-1 block text-sm font-semibold text-[#1a2036]">ZIP Code *</label>
                  <p className="mb-1.5 text-xs text-[#718096]">Enter your ZIP to check availability.</p>
                  <div className="flex gap-2">
                    <input
                      id="quote-zip"
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      value={zipCode}
                      onChange={(e) => {
                        setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))
                        setZipCheckResult(null)
                      }}
                      className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                      placeholder="80202"
                    />
                    <button
                      type="button"
                      onClick={runZipCheck}
                      disabled={zipCheckLoading || zipCode.replace(/\D/g, '').length < 5}
                      className="shrink-0 rounded-md bg-[#1a2036] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#252b47] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {zipCheckLoading ? 'Checking...' : 'Check'}
                    </button>
                  </div>
                  {zipCheckResult && zipCheckResult !== 'checking' && (
                    <p
                      className={`mt-1.5 text-sm font-medium ${zipCheckResult.inRange ? 'text-[#48bb78]' : 'text-red-600'}`}
                      role="status"
                    >
                      {zipCheckResult.inRange
                        ? '✅ Great news! We serve your area.'
                        : "❌ Sorry, we don't currently serve this ZIP Code."}
                    </p>
                  )}
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-[#1a2036] py-3.5 font-semibold text-white transition hover:bg-[#252b47] disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Request My Free Quote'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
