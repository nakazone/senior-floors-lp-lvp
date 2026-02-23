'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Benefits } from '@/components/Benefits'
import { Catalog } from '@/components/Catalog'
import { Calculator } from '@/components/Calculator'
import { LeadForm } from '@/components/LeadForm'
import { SocialProof } from '@/components/SocialProof'
import { StickyCTA } from '@/components/StickyCTA'

type Product = {
  id: string
  name: string
  pricePerSqft: number
  thickness?: number
  wearLayer?: number
  color?: string
  imageUrl?: string
} | null

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(null)
  const [serviceType, setServiceType] = useState<'material_only' | 'labor_only' | 'full_installation'>('full_installation')
  const [sqft, setSqft] = useState('')

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Benefits />
        <Catalog
          onSelect={(p) => setSelectedProduct({ id: p.id, name: p.name, pricePerSqft: p.pricePerSqft, thickness: p.thickness, wearLayer: p.wearLayer, color: p.color, imageUrl: p.imageUrl })}
        />
        <Calculator
          selectedProduct={selectedProduct}
          onServiceTypeChange={setServiceType}
          onSqftChange={(v) => setSqft(v)}
        />
        <LeadForm
          selectedProduct={selectedProduct}
          serviceType={serviceType}
          sqft={sqft}
        />
        <SocialProof />
      </main>
      <StickyCTA />
      <ExitIntentPopup />
    </>
  )
}
