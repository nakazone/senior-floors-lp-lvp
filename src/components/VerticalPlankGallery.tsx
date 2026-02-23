'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { LVPProduct } from '@/data/lvpProducts'

export interface VerticalPlankGalleryProps {
  products: LVPProduct[]
  onSelect?: (product: LVPProduct) => void
}

const FALLBACK_IMAGE = '/assets/lvp.png'

export function VerticalPlankGallery({ products, onSelect }: VerticalPlankGalleryProps) {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  if (!products.length) return null

  return (
    <section
      id="plank-gallery"
      className="relative flex h-screen w-full overflow-hidden"
      aria-label="Galeria de pisos em formato de tábuas"
    >
      {products.map((product) => (
        <PlankColumn
          key={product.id}
          product={product}
          imgSrc={imgErrors[product.id] ? FALLBACK_IMAGE : product.imageUrl}
          onImageError={() => setImgErrors((e) => ({ ...e, [product.id]: true }))}
          onSelect={onSelect}
        />
      ))}
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
      {/* Tábua: imagem em altura total, sem espaço */}
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
        {/* Linhas horizontais sutis (segmentos da tábua) */}
        <div className="absolute inset-0 flex flex-col opacity-60" aria-hidden>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              className="flex-1 border-b border-black/20 last:border-b-0"
              style={{ minHeight: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Overlay no hover: nome + preço + botão */}
      <div
        className={`absolute inset-0 bg-[#1a2036]/80 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 px-2 ${
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
