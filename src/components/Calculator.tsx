'use client'

import { useEffect, useState } from 'react'

type Product = { id: string; name: string; pricePerSqft: number } | null

export function Calculator({
  selectedProduct,
  onServiceTypeChange,
}: {
  selectedProduct: Product
  onServiceTypeChange?: (type: 'material_only' | 'labor_only' | 'full_installation') => void
}) {
  const [sqft, setSqft] = useState<string>('')
  const [laborRate, setLaborRate] = useState(2.5)
  const [serviceType, setServiceType] = useState<'material_only' | 'labor_only' | 'full_installation'>('full_installation')

  useEffect(() => {
    fetch('/api/calculator/labor-rate')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && typeof d.data.laborRatePerSqft === 'number') setLaborRate(d.data.laborRatePerSqft)
      })
      .catch(() => {})
  }, [])

  const s = parseFloat(sqft) || 0
  const materialCost = selectedProduct ? s * selectedProduct.pricePerSqft : 0
  const laborCost = s * laborRate
  const total =
    serviceType === 'material_only'
      ? materialCost
      : serviceType === 'labor_only'
        ? laborCost
        : materialCost + laborCost

  const handleType = (t: 'material_only' | 'labor_only' | 'full_installation') => {
    setServiceType(t)
    onServiceTypeChange?.(t)
  }

  return (
    <section id="calculator" className="bg-[#f7f8fc] py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="mb-2 text-center text-3xl font-bold text-[#1a2036] md:text-4xl">
          Price Calculator
        </h2>
        <p className="mx-auto mb-8 text-center text-[#4a5568]">
          Enter your square footage and see your estimate.
        </p>
        <div className="rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(26,32,54,0.1)]">
          <label className="block text-sm font-medium text-[#1a2036]">Square Footage</label>
          <input
            type="number"
            min={1}
            value={sqft}
            onChange={(e) => updateSqft(e.target.value)}
            placeholder="e.g. 500"
            className="mt-1 w-full rounded-lg border border-[#e2e8f0] px-4 py-2"
          />
          {selectedProduct && (
            <p className="mt-2 text-sm text-[#718096]">Product: {selectedProduct.name}</p>
          )}
          <div className="mt-4">
            <label className="block text-sm font-medium text-[#1a2036]">Service</label>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleType('material_only')}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  serviceType === 'material_only' ? 'bg-[#1a2036] text-white' : 'bg-[#e2e8f0] text-[#1a2036]'
                }`}
              >
                Material only
              </button>
              <button
                type="button"
                onClick={() => handleType('labor_only')}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  serviceType === 'labor_only' ? 'bg-[#1a2036] text-white' : 'bg-[#e2e8f0] text-[#1a2036]'
                }`}
              >
                Labor only
              </button>
              <button
                type="button"
                onClick={() => handleType('full_installation')}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  serviceType === 'full_installation' ? 'bg-[#1a2036] text-white' : 'bg-[#e2e8f0] text-[#1a2036]'
                }`}
              >
                Full installation
              </button>
            </div>
          </div>
          <div className="mt-6 border-t border-[#e2e8f0] pt-4">
            {selectedProduct && serviceType !== 'labor_only' && (
              <p className="text-[#4a5568]">
                Material: {s.toFixed(0)} sqft × ${selectedProduct.pricePerSqft.toFixed(2)} = $
                {materialCost.toFixed(2)}
              </p>
            )}
            {(serviceType === 'labor_only' || serviceType === 'full_installation') && (
              <p className="text-[#4a5568]">
                Labor: {s.toFixed(0)} sqft × ${laborRate.toFixed(2)} = ${laborCost.toFixed(2)}
              </p>
            )}
            <p className="mt-2 text-xl font-bold text-[#1a2036]">Total: ${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
