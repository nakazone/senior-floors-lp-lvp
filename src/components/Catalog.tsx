'use client'

import { useEffect, useState } from 'react'

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

export function Catalog({ onSelect }: { onSelect?: (product: Product) => void }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState('')
  const [waterproof, setWaterproof] = useState<string>('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    const params = new URLSearchParams()
    if (color) params.set('color', color)
    if (waterproof === 'yes') params.set('waterproof', 'true')
    if (waterproof === 'no') params.set('waterproof', 'false')
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    setLoading(true)
    fetch(`/api/lvp?${params}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProducts(d.data)
      })
      .finally(() => setLoading(false))
  }, [color, thickness, waterproof, commercial, minPrice, maxPrice])

  return (
    <section id="catalog" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-2 text-center text-3xl font-bold text-[#1a2036] md:text-4xl">
          LVP Catalog
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-[#4a5568]">
          Choose your floor. Filter by color, price, and more.
        </p>

        <div className="mb-8 flex flex-wrap gap-4 rounded-xl bg-[#f7f8fc] p-4">
          <input
            type="text"
            placeholder="Color (e.g. Oak, Gray)"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="rounded-lg border border-[#e2e8f0] px-3 py-2 text-sm"
          />
          <select
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className="rounded-lg border border-[#e2e8f0] px-3 py-2 text-sm"
            title="Thickness (mm)"
          >
            <option value="">Thickness: All</option>
            <option value="5">5mm</option>
            <option value="6">6mm</option>
            <option value="8">8mm</option>
            <option value="10">10mm</option>
          </select>
          <select
            value={waterproof}
            onChange={(e) => setWaterproof(e.target.value)}
            className="rounded-lg border border-[#e2e8f0] px-3 py-2 text-sm"
          >
            <option value="">Waterproof: All</option>
            <option value="yes">Waterproof</option>
            <option value="no">Not waterproof</option>
          </select>
          <select
            value={commercial}
            onChange={(e) => setCommercial(e.target.value)}
            className="rounded-lg border border-[#e2e8f0] px-3 py-2 text-sm"
          >
            <option value="">Grade: All</option>
            <option value="yes">Commercial</option>
            <option value="no">Residential</option>
          </select>
          <input
            type="number"
            placeholder="Min $/sqft"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-24 rounded-lg border border-[#e2e8f0] px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max $/sqft"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-24 rounded-lg border border-[#e2e8f0] px-3 py-2 text-sm"
          />
        </div>

        {loading ? (
          <p className="text-center text-[#718096]">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-[#718096]">No products match. Add products in Admin.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(26,32,54,0.1)] transition hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#f0f2f8]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/f7f8fc/4a5568?text=LVP'
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#1a2036]">{p.name}</h3>
                  <p className="mt-1 text-sm text-[#718096]">
                    {p.thickness}mm · {p.wearLayer}mil · {p.color}
                    {p.waterproof && ' · Waterproof'}
                    {p.commercial && ' · Commercial'}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#1a2036]">
                    ${p.pricePerSqft.toFixed(2)}/sqft
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelect?.(p)}
                    className="mt-3 w-full rounded-lg bg-[#1a2036] px-4 py-2 text-sm font-semibold text-white hover:bg-[#252b47]"
                  >
                    Select This Floor
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
