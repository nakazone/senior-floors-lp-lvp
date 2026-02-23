'use client'

import { useMemo, useState } from 'react'
import { FloorCard } from '@/components/FloorCard'
import { LVP_PRODUCTS, type LVPProduct } from '@/data/lvpProducts'

export function Catalog({ onSelect }: { onSelect?: (product: LVPProduct) => void }) {
  const [color, setColor] = useState('')
  const [thickness, setThickness] = useState('')
  const [waterproof, setWaterproof] = useState<string>('')
  const [commercial, setCommercial] = useState<string>('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const products = useMemo(() => {
    return LVP_PRODUCTS.filter((p) => {
      if (color && !p.color.toLowerCase().includes(color.trim().toLowerCase())) return false
      if (thickness && p.thickness !== parseFloat(thickness)) return false
      if (waterproof === 'yes' && !p.waterproof) return false
      if (waterproof === 'no' && p.waterproof) return false
      if (commercial === 'yes' && !p.commercial) return false
      if (commercial === 'no' && p.commercial) return false
      const min = minPrice ? parseFloat(minPrice) : null
      const max = maxPrice ? parseFloat(maxPrice) : null
      if (min != null && !Number.isNaN(min) && p.pricePerSqft < min) return false
      if (max != null && !Number.isNaN(max) && p.pricePerSqft > max) return false
      return true
    })
  }, [color, thickness, waterproof, commercial, minPrice, maxPrice])

  return (
    <section id="catalog" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-2 text-center text-3xl font-bold text-[#1a2036] md:text-4xl">
          View Our Floors
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-[#4a5568]">
          Browse LVP options as you would see them on your floor. Select one to get your estimate.
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

        {products.length === 0 ? (
          <p className="text-center text-[#718096]">No products match the filters.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <FloorCard key={p.id} product={p} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
