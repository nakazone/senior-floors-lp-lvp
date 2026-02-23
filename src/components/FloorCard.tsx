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
    <div className="group overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(26,32,54,0.1)] transition hover:shadow-[0_8px_30px_rgba(26,32,54,0.15)]">
      {/* Floor view: wide strip as if you're looking at the floor, with plank lines */}
      <div className="relative h-[140px] overflow-hidden bg-[#e8e6e1] md:h-[160px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt=""
          onError={onError}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Plank separators overlay - like real LVP planks */}
        <div className="absolute inset-0 flex" aria-hidden>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="w-0 flex-1 border-r-2 border-black/20 last:border-r-0"
              style={{ minWidth: 0 }}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-[#e2e8f0] p-4">
        <h3 className="font-semibold text-[#1a2036]">{product.name}</h3>
        <p className="mt-1 text-sm text-[#718096]">
          {product.thickness}mm · {product.wearLayer}mil · {product.color}
          {product.waterproof && ' · Waterproof'}
          {product.commercial && ' · Commercial'}
        </p>
        <p className="mt-2 text-lg font-semibold text-[#1a2036]">
          ${product.pricePerSqft.toFixed(2)}/sqft
        </p>
        <button
          type="button"
          onClick={() => onSelect?.(product)}
          className="mt-3 w-full rounded-lg bg-[#1a2036] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#252b47]"
        >
          Select This Floor
        </button>
      </div>
    </div>
  )
}
