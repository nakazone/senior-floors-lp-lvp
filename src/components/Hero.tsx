'use client'

import { useState, useRef, useEffect } from 'react'

const FORM_BASE_URL = process.env.NEXT_PUBLIC_SENIOR_FLOORS_FORM_BASE_URL || 'https://lp.senior-floors.com'

type ZipCheckResult = { inRange: boolean; message?: string } | null

export function Hero() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', zipCode: '' })
  const [zipCheckResult, setZipCheckResult] = useState<ZipCheckResult | 'checking' | null>(null)
  const [zipCheckLoading, setZipCheckLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const play = () => video.play().catch(() => {})
    play()
    video.addEventListener('loadeddata', play)
    return () => video.removeEventListener('loadeddata', play)
  }, [])

  const runZipCheck = async () => {
    const zip = form.zipCode.replace(/\D/g, '').slice(0, 5)
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
    const zipClean = form.zipCode.replace(/\D/g, '').slice(0, 5)
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
    if (form.name.trim().length < 2) {
      setError('Name is required (at least 2 characters).')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    if (form.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number.')
      return
    }
    setLoading(true)
    try {
      const params = new URLSearchParams({
        'form-name': 'lvp-hero-form',
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        zipcode: zipClean,
        message: '',
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
        try { (window as unknown as { fbq: (a: string, b: string) => void }).fbq('track', 'Lead') } catch {}
      }
      setSuccess(true)
      setForm({ name: '', phone: '', email: '', zipCode: '' })
      setZipCheckResult(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#1a2036] py-20 pt-28 md:pt-32"
    >
      {/* Video background: lvp.mp4 (primary), lvp.MOV fallback */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
        poster="/assets/lvp-background.jpg"
        aria-hidden
      >
        <source src="/assets/lvp.mp4" type="video/mp4" />
        <source src="/assets/lvp.MOV" type="video/quicktime" />
      </video>
      {/* Overlay - same as LP */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 32, 54, 0.85) 0%, rgba(26, 32, 54, 0.75) 100%)',
        }}
      />

      <div className="container relative z-[2] mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: hero text - same structure as LP, content adapted for LVP */}
          <div className="hero-text text-left">
            {/* Certificate Badge */}
            <div className="mb-4 inline-block rounded-md border border-white/30 bg-white/10 px-5 py-3 backdrop-blur-sm">
              <div className="text-center text-base text-[#d6b598]" style={{ letterSpacing: '0.1em' }}>
                ★★★★★ Google Reviews
              </div>
              <div className="text-center text-xs font-semibold uppercase tracking-wider text-white/95">
                LVP Flooring Specialists
              </div>
            </div>

            {/* Headline */}
            <h1 className="hero-headline mb-6 text-4xl font-bold leading-tight text-white drop-shadow-md md:text-5xl lg:text-6xl">
              Premium LVP Flooring
              <br />
              Installed Fast & Professionally
            </h1>

            <p className="hero-subheadline mb-6 max-w-xl text-base leading-relaxed text-white/95 drop-shadow-sm md:text-lg">
              High-quality Luxury Vinyl Plank + expert installation. Licensed & insured flooring contractors serving Denver, Cherry Creek, Greenwood Village, Lakewood, Morrison, and the metro area. Free in-home estimates. 5-star rated on Google.
            </p>

            {/* Trust Badges - same as LP */}
            <div className="trust-badges mb-6 flex flex-wrap gap-3" role="list">
              <div
                className="inline-block rounded-md border border-white/30 bg-white/10 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white/95 backdrop-blur-sm"
                role="listitem"
              >
                Licensed & Insured
              </div>
              <div
                className="inline-block rounded-md border border-white/30 bg-white/10 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white/95 backdrop-blur-sm"
                role="listitem"
              >
                Premium Materials
              </div>
              <div
                className="inline-block rounded-md border border-white/30 bg-white/10 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white/95 backdrop-blur-sm"
                role="listitem"
              >
                Local Company
              </div>
            </div>

            {/* CTAs - same as LP */}
            <div className="hero-ctas flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex rounded-md bg-[#1a2036] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#252b47] hover:shadow-xl"
              >
                Free In-Home Estimates
              </a>
              <a
                href="tel:+17207519813"
                className="inline-flex rounded-md border-2 border-[#d6b598] bg-[#d6b598] px-6 py-3.5 text-base font-semibold text-[#1a2036] transition hover:bg-[#e0c4a8] hover:border-[#e0c4a8]"
              >
                Call (720) 751-9813
              </a>
            </div>
          </div>

          {/* Right: Hero Form - same as LP */}
          <div className="hero-form-wrapper w-full">
            {success ? (
              <div className="rounded-xl bg-white p-6 text-center shadow-xl">
                <p className="font-semibold text-[#1a2036]">Submitted successfully!</p>
                <p className="mt-2 text-sm text-[#4a5568]">Thank you. We&apos;ll contact you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="hero-form rounded-xl bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.3)] md:p-6"
                aria-label="Quick estimate form"
              >
                <h2 className="hero-form-title mb-2 text-center text-xl font-bold text-[#1a2036] md:text-2xl">
                  Get Your Free LVP Estimate
                </h2>
                <p className="hero-form-subtitle mb-4 text-center text-sm text-[#4a5568]">
                  Schedule your free consultation. We&apos;ll visit your home within 24 hours for a detailed, no-obligation estimate.
                </p>

                {error && <p className="mb-3 text-center text-sm text-red-600">{error}</p>}

                <div className="space-y-3">
                  <div>
                    <label htmlFor="hero-name" className="mb-1 block text-sm font-semibold text-[#1a2036]">
                      Full Name *
                    </label>
                    <input
                      id="hero-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="hero-phone" className="mb-1 block text-sm font-semibold text-[#1a2036]">
                      Phone Number *
                    </label>
                    <input
                      id="hero-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                      placeholder="(720) 555-0123"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label htmlFor="hero-email" className="mb-1 block text-sm font-semibold text-[#1a2036]">
                      Email *
                    </label>
                    <input
                      id="hero-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="hero-zipcode" className="mb-1 block text-sm font-semibold text-[#1a2036]">
                      Zip Code *
                    </label>
                    <p className="mb-1 text-sm text-[#718096]">Enter your ZIP Code to check availability</p>
                    <div className="flex gap-2">
                      <input
                        id="hero-zipcode"
                        type="text"
                        required
                        pattern="[0-9]{5}"
                        maxLength={5}
                        value={form.zipCode}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, zipCode: e.target.value.replace(/\D/g, '') }))
                          setZipCheckResult(null)
                        }}
                        onBlur={() => form.zipCode.replace(/\D/g, '').length === 5 && runZipCheck()}
                        className="min-w-0 flex-1 rounded-md border-2 border-[#e2e8f0] px-3 py-2.5 text-[#1a2036] focus:border-[#1a2036] focus:outline-none focus:ring-2 focus:ring-[#1a2036]/20"
                        placeholder="12345"
                        autoComplete="postal-code"
                        inputMode="numeric"
                      />
                      <button
                        type="button"
                        onClick={runZipCheck}
                        disabled={zipCheckLoading || form.zipCode.replace(/\D/g, '').length < 5}
                        className="shrink-0 rounded-md bg-[#1a2036] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#252b47] disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Check availability"
                      >
                        {zipCheckLoading ? 'Checking...' : 'Check'}
                      </button>
                    </div>
                    {zipCheckResult && zipCheckResult !== 'checking' && (
                      <p className={`mt-1.5 text-sm font-medium ${zipCheckResult.inRange ? 'text-[#48bb78]' : 'text-red-600'}`} role="status">
                        {zipCheckResult.inRange
                          ? '✅ Great news! We serve your area.'
                          : "❌ Sorry, we don't currently serve this ZIP Code."}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full rounded-md bg-[#1a2036] py-3.5 font-semibold text-white transition hover:bg-[#252b47] disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Get My Free Estimate'}
                </button>

                <p className="form-disclaimer mt-3 text-center text-xs text-[#718096]">
                  ✓ No obligation · ✓ Free in-home consultation · ✓ Clear pricing, no hidden fees
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
