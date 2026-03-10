'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { LVPProduct } from '@/data/lvpProducts'
import { QuoteLightbox, type ServiceType } from '@/components/QuoteLightbox'

const DEFAULT_LABOR_RATE_PER_SQFT = 2.5

export type { ServiceType }

export interface VerticalPlankGalleryProps {
  products: LVPProduct[]
  onSelect?: (product: LVPProduct) => void
  onGetQuote?: (product: LVPProduct, sqft?: string, serviceType?: ServiceType) => void
  /** When true, no top margin (e.g. when a section header is above the gallery) */
  noTopMargin?: boolean
}

const FALLBACK_IMAGE = '/assets/lvp1.png'

type QuotePayload = {
  product: LVPProduct
  sqft: string
  serviceType: ServiceType
  estimateTotal: number | null
}

export function VerticalPlankGallery({ products, onSelect, onGetQuote, noTopMargin }: VerticalPlankGalleryProps) {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})
  const [selectedForDetail, setSelectedForDetail] = useState<LVPProduct | null>(null)
  const [quoteLightboxOpen, setQuoteLightboxOpen] = useState(false)
  const [quotePayload, setQuotePayload] = useState<QuotePayload | null>(null)

  const handleSelectFloor = (product: LVPProduct) => {
    onSelect?.(product)
    setSelectedForDetail(product)
  }

  const handleBack = () => setSelectedForDetail(null)

  const handleOpenQuoteLightbox = (product: LVPProduct, sqft: string, serviceType: ServiceType, estimateTotal: number | null) => {
    setQuotePayload({ product, sqft, serviceType, estimateTotal })
    setQuoteLightboxOpen(true)
  }

  const handleQuoteSuccess = () => {
    if (quotePayload) {
      onGetQuote?.(quotePayload.product, quotePayload.sqft, quotePayload.serviceType)
    }
    setQuoteLightboxOpen(false)
    setQuotePayload(null)
    setSelectedForDetail(null)
  }

  if (!products.length) return null

  return (
    <section
      id="plank-gallery"
      className="relative w-full overflow-hidden snap-start snap-always box-border"
      style={{
        height: 'calc(100vh - var(--header-height))',
        minHeight: 'calc(100vh - var(--header-height))',
        maxHeight: 'calc(100vh - var(--header-height))',
        margin: 0,
        marginTop: noTopMargin ? 0 : 'var(--header-height)',
        scrollMarginTop: 'var(--header-height)',
      }}
      aria-label="Galeria de pisos em formato de tábuas"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!selectedForDetail ? (
          <motion.div
            key="grid"
            className="absolute inset-0 flex"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {products.map((product) => (
              <PlankColumn
                key={product.id}
                product={product}
                imgSrc={imgErrors[product.id] ? FALLBACK_IMAGE : product.imageUrl}
                onImageError={() => setImgErrors((e) => ({ ...e, [product.id]: true }))}
                onSelect={handleSelectFloor}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            className="absolute inset-0 flex min-h-0 flex-col md:flex-row"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <DetailSlide
              product={selectedForDetail}
              onBack={handleBack}
              onOpenQuoteLightbox={handleOpenQuoteLightbox}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {quotePayload && (
        <QuoteLightbox
          isOpen={quoteLightboxOpen}
          onClose={() => { setQuoteLightboxOpen(false); setQuotePayload(null) }}
          onSuccess={handleQuoteSuccess}
          product={quotePayload.product}
          sqft={quotePayload.sqft}
          serviceType={quotePayload.serviceType}
          estimateTotal={quotePayload.estimateTotal}
        />
      )}
    </section>
  )
}

function PlankColumn({
  product,
  imgSrc,
  onImageError,
  onSelect,
}: {
  product: LVPProduct
  imgSrc: string
  onImageError: () => void
  onSelect?: (p: LVPProduct) => void
}) {
  const [hover, setHover] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      className="group relative flex min-w-0 flex-1 cursor-pointer overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onSelect?.(product)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.(product) } }}
    >
      <div className="relative h-full w-full">
        <Image
          src={imgSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 12.5vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          style={{ objectFit: 'cover' }}
          onError={onImageError}
        />
      </div>
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1a2036]/80 px-2 transition-opacity duration-300 ${
          hover ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-center text-lg font-bold text-white drop-shadow md:text-xl">
          {product.name}
        </h3>
        <p className="text-sm text-white/90">
          ${product.pricePerSqft.toFixed(2)}/sqft · {product.thickness}mm
        </p>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onSelect?.(product) }}
          className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#1a2036] transition hover:bg-white/90"
        >
          Select This Floor
        </button>
      </div>
    </div>
  )
}

function DetailSlide({
  product,
  onBack,
  onOpenQuoteLightbox,
}: {
  product: LVPProduct
  onBack: () => void
  onOpenQuoteLightbox: (product: LVPProduct, sqft: string, serviceType: ServiceType, estimateTotal: number | null) => void
}) {
  const gallerySlides = product.gallerySlides?.length
    ? product.gallerySlides
    : product.galleryImages?.length
      ? product.galleryImages.map((src, i) => ({ src, label: `Image ${i + 1}` }))
      : product.roomImageUrl
        ? [
            { src: product.imageUrl, label: 'Sample' },
            { src: product.roomImageUrl, label: 'Room' },
          ]
        : [{ src: product.imageUrl, label: product.name }]
  const hasGallery = gallerySlides.length > 1
  const [sqft, setSqft] = useState('')
  const [serviceType, setServiceType] = useState<ServiceType>('full_installation')
  const [laborRate, setLaborRate] = useState(DEFAULT_LABOR_RATE_PER_SQFT)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const goPrev = () => setGalleryIndex((i) => (i - 1 + gallerySlides.length) % gallerySlides.length)
  const goNext = () => setGalleryIndex((i) => (i + 1) % gallerySlides.length)
  const currentSlide = gallerySlides[galleryIndex]

  useEffect(() => {
    fetch('/api/calculator/labor-rate')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.data?.laborRatePerSqft != null) setLaborRate(Number(data.data.laborRatePerSqft))
      })
      .catch(() => {})
  }, [])

  const sqftNum = parseFloat(sqft)
  const validSqft = Number.isFinite(sqftNum) && sqftNum > 0
  const materialTotal = validSqft ? Math.round(sqftNum * product.pricePerSqft * 100) / 100 : null
  const laborTotal = validSqft ? Math.round(sqftNum * laborRate * 100) / 100 : null
  const fullTotal = materialTotal != null && laborTotal != null ? Math.round((materialTotal + laborTotal) * 100) / 100 : null
  const estimateTotal =
    serviceType === 'full_installation' ? fullTotal
    : serviceType === 'material_only' ? materialTotal
    : laborTotal

  return (
    <>
      <div className="relative flex-1 min-h-[40vh] md:min-h-0 md:h-full w-full overflow-hidden">
        <div className="absolute inset-0 flex flex-col bg-[#0f1320]">
          <div className="relative flex flex-1 min-h-0 items-center justify-center">
            <img
              key={currentSlide.src}
              src={currentSlide.src}
              alt={currentSlide.label}
              className="max-h-full max-w-full object-contain object-center"
              style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
              onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE }}
            />
            {hasGallery && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white shadow-lg transition hover:bg-black/70 md:left-4"
                  aria-label="Previous image"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white shadow-lg transition hover:bg-black/70 md:right-4"
                  aria-label="Next image"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <div className="shrink-0 border-t border-white/10 bg-black/20 py-3 text-center">
            <p className="text-sm font-medium text-white/95">{currentSlide.label}</p>
            {hasGallery && (
              <p className="mt-0.5 text-xs text-white/60">
                {galleryIndex + 1} / {gallerySlides.length}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex min-h-0 shrink-0 flex-col justify-between overflow-y-auto bg-[#1a2036] p-6 text-white md:w-[380px] md:max-w-[90vw]">
        <div className="shrink-0">
          <h2 className="text-2xl font-bold md:text-3xl">{product.name}</h2>
          {product.description && (
            <p className="mt-2 text-white/80">{product.description}</p>
          )}
          <dl className="mt-6 space-y-2 text-sm">
            {product.specs && product.specs.length > 0 ? (
              <>
                {product.specs.map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2">
                    <dt className="text-white/60 shrink-0">{label}</dt>
                    <dd className="font-medium text-right">{value}</dd>
                  </div>
                ))}
                <div className="mt-3 flex justify-between border-t border-white/20 pt-3">
                  <dt className="text-white/60">Price</dt>
                  <dd className="text-xl font-bold">${product.pricePerSqft.toFixed(2)}/sqft</dd>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <dt className="text-white/60">Thickness</dt>
                  <dd className="font-medium">{product.thickness}mm</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">Wear layer</dt>
                  <dd className="font-medium">{product.wearLayer} mil</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">Color</dt>
                  <dd className="font-medium">{product.color}</dd>
                </div>
                {product.waterproof && (
                  <div className="flex justify-between">
                    <dt className="text-white/60">Waterproof</dt>
                    <dd className="font-medium text-emerald-400">Yes</dd>
                  </div>
                )}
                {product.commercial && (
                  <div className="flex justify-between">
                    <dt className="text-white/60">Grade</dt>
                    <dd className="font-medium text-amber-400">Commercial</dd>
                  </div>
                )}
                <div className="mt-3 flex justify-between border-t border-white/20 pt-3">
                  <dt className="text-white/60">Price</dt>
                  <dd className="text-xl font-bold">${product.pricePerSqft.toFixed(2)}/sqft</dd>
                </div>
              </>
            )}
          </dl>

          {/* Calculator inside detail slide */}
          <div className="mt-6 rounded-lg border border-white/20 bg-white/5 p-4">
            <h3 className="mb-3 text-base font-semibold text-white">Estimate</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="detail-sqft" className="mb-1 block text-xs text-white/70">Square footage</label>
                <input
                  id="detail-sqft"
                  type="number"
                  min={1}
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
              <div>
                <label htmlFor="detail-service" className="mb-1 block text-xs text-white/70">Service</label>
                <select
                  id="detail-service"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                >
                  <option value="full_installation">Full installation (material + labor)</option>
                  <option value="material_only">Material only</option>
                  <option value="labor_only">Labor only</option>
                </select>
              </div>
              {validSqft && estimateTotal != null && (
                <div className="border-t border-white/20 pt-3">
                  {serviceType === 'full_installation' && materialTotal != null && laborTotal != null && (
                    <div className="mb-1 flex justify-between text-xs text-white/80">
                      <span>Material</span>
                      <span>${materialTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {serviceType === 'full_installation' && laborTotal != null && (
                    <div className="mb-1 flex justify-between text-xs text-white/80">
                      <span>Labor</span>
                      <span>${laborTotal.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-amber-400">
                    <span>Est. total</span>
                    <span>${estimateTotal.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onOpenQuoteLightbox(product, sqft, serviceType, estimateTotal)}
            className="w-full rounded-xl bg-amber-500 py-3.5 font-semibold text-[#1a2036] transition hover:bg-amber-400"
          >
            Get Quote
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-xl border border-white/30 py-3 font-medium text-white transition hover:bg-white/10"
          >
            Back to gallery
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={onBack}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 md:right-6 md:top-6"
        aria-label="Back to gallery"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </>
  )
}
