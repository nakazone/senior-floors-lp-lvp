'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { LVPProduct } from '@/data/lvpProducts'

export interface VerticalPlankGalleryProps {
  products: LVPProduct[]
  onSelect?: (product: LVPProduct) => void
  onGetQuote?: (product: LVPProduct) => void
}

const FALLBACK_IMAGE = '/assets/lvp1.png'

export function VerticalPlankGallery({ products, onSelect, onGetQuote }: VerticalPlankGalleryProps) {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})
  const [selectedForDetail, setSelectedForDetail] = useState<LVPProduct | null>(null)

  const handleSelectFloor = (product: LVPProduct) => {
    onSelect?.(product)
    setSelectedForDetail(product)
  }

  const handleBack = () => setSelectedForDetail(null)

  const handleGetQuote = (product: LVPProduct) => {
    onGetQuote?.(product)
    setSelectedForDetail(null)
  }

  if (!products.length) return null

  return (
    <section
      id="plank-gallery"
      className="relative w-full overflow-hidden snap-start snap-always"
      style={{
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
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
              onGetQuote={handleGetQuote}
            />
          </motion.div>
        )}
      </AnimatePresence>
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
      className="group relative flex min-w-0 flex-1 overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
          onClick={() => onSelect?.(product)}
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
  onGetQuote,
}: {
  product: LVPProduct
  onBack: () => void
  onGetQuote: (p: LVPProduct) => void
}) {
  const [imgSrc, setImgSrc] = useState(product.imageUrl)

  return (
    <>
      <div className="relative flex-1 min-h-[40vh] md:min-h-0 md:h-full">
        <div className="absolute inset-0 relative">
          <Image
            src={imgSrc || FALLBACK_IMAGE}
            alt={product.name}
            fill
            sizes="100vw"
            className="object-contain object-center"
            priority
            onError={() => setImgSrc(FALLBACK_IMAGE)}
          />
        </div>
      </div>
      <div className="flex min-h-0 shrink-0 flex-col justify-between overflow-y-auto bg-[#1a2036] p-6 text-white md:w-[380px] md:max-w-[90vw]">
        <div className="shrink-0">
          <h2 className="text-2xl font-bold md:text-3xl">{product.name}</h2>
          {product.description && (
            <p className="mt-2 text-white/80">{product.description}</p>
          )}
          <dl className="mt-6 space-y-2 text-sm">
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
          </dl>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onGetQuote(product)}
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
