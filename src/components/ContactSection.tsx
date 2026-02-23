'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

type Product = {
  id: string
  name: string
  pricePerSqft?: number
  thickness?: number
  wearLayer?: number
  color?: string
  imageUrl?: string
} | null

const GALLERY_ITEMS = [
  { src: '/assets/lvp1.png', alt: 'LVP flooring – premium luxury vinyl plank', caption: 'Premium LVP installation – Denver metro' },
  { src: '/assets/lvp2.png', alt: 'LVP flooring – modern finish', caption: 'LVP flooring – residential project' },
  { src: '/assets/lvp-background.jpg', alt: 'LVP flooring – wide plank', caption: 'Luxury vinyl plank – Colorado home' },
]

export function ContactSection({
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
  const [message, setMessage] = useState('')
  const [sqft, setSqft] = useState(initialSqft || '')
  const [serviceType, setServiceType] = useState(initialServiceType)
  const [photoUrl, setPhotoUrl] = useState<string | undefined>()
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { setSqft(initialSqft || '') }, [initialSqft])
  useEffect(() => { setServiceType(initialServiceType) }, [initialServiceType])

  useEffect(() => {
    const t = setInterval(() => setGalleryIndex((i) => (i + 1) % GALLERY_ITEMS.length), 5000)
    return () => clearInterval(t)
  }, [])

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
      <section id="contact" className="bg-[#f7f8fc] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-[#1a2036] md:text-3xl">Thank you!</h2>
          <p className="mt-2 text-[#4a5568]">We&apos;ll contact you within 24 hours with your free LVP estimate.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Contact Section - same structure as first LP */}
      <section id="contact" className="bg-[#f7f8fc] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 text-center md:mb-12">
            <h2 className="section-title mb-2 text-2xl font-bold text-[#1a2036] md:text-3xl">
              Ready to Transform Your Floors with Premium LVP?
            </h2>
            <p className="section-subtitle mx-auto max-w-[700px] text-lg text-[#4a5568]">
              Get your free in-home LVP estimate today. We&apos;ll visit your Denver area home to assess your flooring needs and provide a detailed, no-obligation quote within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 md:items-stretch">
            {/* Gallery - same as first LP */}
            <div className="flex flex-col rounded-xl bg-white p-6 shadow-[0_4px_20px_rgba(26,32,54,0.15)]">
              <h3 className="gallery-title mb-2 text-center text-xl font-bold text-[#1a2036] md:text-2xl">
                Our LVP Floors
              </h3>
              <div className="relative mt-4 min-h-[300px] flex-1 overflow-hidden rounded-lg shadow-md md:min-h-[400px]">
                {GALLERY_ITEMS.map((item, i) => (
                  <div
                    key={item.src}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      i === galleryIndex ? 'z-[1] opacity-100' : 'z-0 opacity-0'
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center text-sm font-medium text-white">
                      {item.caption}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setGalleryIndex((i) => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)}
                  className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a2036]/80 text-2xl font-bold text-white shadow-lg backdrop-blur-sm transition hover:bg-[#1a2036]"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryIndex((i) => (i + 1) % GALLERY_ITEMS.length)}
                  className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a2036]/80 text-2xl font-bold text-white shadow-lg backdrop-blur-sm transition hover:bg-[#1a2036]"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Contact Form - same structure as first LP */}
            <div className="flex flex-col">
              <div className="flex min-h-[500px] flex-col rounded-xl bg-white p-6 shadow-[0_4px_20px_rgba(26,32,54,0.15)]">
                <h3 className="form-title mb-1 text-center text-xl font-bold text-[#1a2036] md:text-2xl">
                  Get Your Free LVP Estimate
                </h3>
                <p className="form-subtitle mb-6 text-center text-sm text-[#4a5568]">
                  Fill out the form below and we&apos;ll contact you within 24 hours
                </p>

                <form onSubmit={handleSubmit} className="flex flex-1 flex-col" aria-label="Contact form">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="mb-1 block text-sm font-semibold text-[#1a2036]">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] transition focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="mb-1 block text-sm font-semibold text-[#1a2036]">
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] transition focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                        placeholder="(720) 555-0123"
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-1 block text-sm font-semibold text-[#1a2036]">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] transition focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-zipcode" className="mb-1 block text-sm font-semibold text-[#1a2036]">
                        Zip Code *
                      </label>
                      <input
                        id="contact-zipcode"
                        type="text"
                        required
                        pattern="[0-9]{5}"
                        maxLength={5}
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] transition focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                        placeholder="80202"
                        autoComplete="postal-code"
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-sqft" className="mb-1 block text-sm font-semibold text-[#1a2036]">
                        Square Footage (est.)
                      </label>
                      <input
                        id="contact-sqft"
                        type="number"
                        min={1}
                        value={sqft}
                        onChange={(e) => setSqft(e.target.value)}
                        className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] transition focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                        placeholder="500"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-service" className="mb-1 block text-sm font-semibold text-[#1a2036]">
                        Service
                      </label>
                      <select
                        id="contact-service"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value as typeof serviceType)}
                        className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] transition focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                      >
                        <option value="full_installation">Full installation (material + labor)</option>
                        <option value="material_only">Material only</option>
                        <option value="labor_only">Labor only</option>
                      </select>
                    </div>
                    {selectedProduct && (
                      <p className="text-sm text-[#4a5568]">Selected floor: <strong>{selectedProduct.name}</strong></p>
                    )}
                    <div>
                      <label htmlFor="contact-message" className="mb-1 block text-sm font-semibold text-[#1a2036]">
                        Message (Optional)
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] transition focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                        placeholder="Tell us about your project..."
                        aria-label="Project details"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-[#1a2036]">Photo (optional)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="block w-full text-sm text-[#4a5568] file:mr-2 file:rounded file:border-0 file:bg-[#1a2036] file:px-3 file:py-1.5 file:text-sm file:text-white file:transition file:hover:bg-[#252b47]"
                      />
                    </div>
                  </div>
                  {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-6 w-full rounded-md bg-[#1a2036] py-3.5 font-semibold text-white transition hover:bg-[#252b47] hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
                    aria-label="Submit contact form"
                  >
                    {submitting ? 'Sending...' : 'Request My Free Estimate Now'}
                  </button>
                  <p className="form-disclaimer mt-3 text-center text-sm text-[#718096]">
                    ✓ No obligation · ✓ Free in-home consultation · ✓ Same-day response · ✓ Serving all Denver metro areas · ✓ Transparent pricing, no hidden fees
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - same as first LP, LVP-adapted */}
      <section className="bg-gradient-to-br from-[#1a2036] to-[#252b47] px-4 py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1200px] text-center">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">Ready to Transform Your Floors with Premium LVP?</h2>
          <p className="mx-auto mb-8 max-w-[700px] text-lg text-white/90">
            Join satisfied Denver homeowners who chose Senior Floors for their LVP projects. Get your free in-home estimate today — no obligation, same-day response.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-block w-full rounded-md bg-[#1a2036] px-8 py-4 text-center text-lg font-semibold text-white shadow-lg transition hover:bg-[#252b47] hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
            >
              Get a Free Estimate Today
            </a>
            <a
              href="tel:+17207519813"
              className="inline-block w-full rounded-md bg-[#d6b598] px-8 py-4 text-center text-lg font-semibold text-[#1a2036] shadow-lg transition hover:bg-[#e0c4a8] hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
            >
              Call (720) 751-9813
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
