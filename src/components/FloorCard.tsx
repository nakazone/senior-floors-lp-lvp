'use client'

import { useState } from 'react'

type Product = {
  id: string
  name: string
  description: string | null
  thickness: number
  wearLayer: number
  color: string
  pricePerSqft: number
  waterproof: boolean
  commercial: boolean
  imageUrl: string
}

const FALLBACK_TEXTURE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'

export function FloorCard({ product, onSelect }: { product: Product; onSelect?: (p: Product) => void }) {
  const [imgSrc, setImgSrc] = useState(product.imageUrl)
  const onError = () => setImgSrc(FALLBACK_TEXTURE)

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(26,32,54,0.1)] transition hover:shadow-[0_8px_30px_rgba(26,32,54,0.15)]">
      {/* Vertical plank: narrow width, tall – como prancha instalada na vertical */}
      <div className="relative mx-auto w-full max-w-[140px] overflow-hidden bg-[#e8e6e1]">
        <div className="aspect-[7/24] w-full min-h-[180px] sm:min-h-[220px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt=""
            onError={onError}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          {/* Linhas horizontais sugerindo segmentos da prancha (comprimento) */}
          <div className="absolute inset-0 flex flex-col" aria-hidden>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="flex-1 border-b border-black/15 last:border-b-0"
                style={{ minHeight: 0 }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-[#e2e8f0] p-3">
        <h3 className="font-semibold text-[#1a2036] text-sm leading-tight">{product.name}</h3>
        <p className="mt-1 text-xs text-[#718096]">
          {product.thickness}mm · {product.wearLayer}mil · {product.color}
          {product.waterproof && ' · WP'}
          {product.commercial && ' · Comm'}
        </p>
        <p className="mt-2 text-base font-semibold text-[#1a2036]">
          ${product.pricePerSqft.toFixed(2)}/sqft
        </p>
        <button
          type="button"
          onClick={() => onSelect?.(product)}
          className="mt-3 w-full rounded-lg bg-[#1a2036] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#252b47]"
        >
          Select
        </button>
      </div>
    </div>
  )
}
