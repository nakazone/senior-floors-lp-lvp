'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Benefits } from '@/components/Benefits'
import { LVPGallery } from '@/components/LVPGallery'
import { LVP_PRODUCTS } from '@/data/lvpProducts'
import { LeadForm } from '@/components/LeadForm'
import { SocialProof } from '@/components/SocialProof'
import { StickyCTA } from '@/components/StickyCTA'
import { ExitIntentPopup } from '@/components/ExitIntentPopup'
import { Footer } from '@/components/Footer'

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
        <LVPGallery
          products={LVP_PRODUCTS}
          onSelect={(p) => setSelectedProduct({ id: p.id, name: p.name, pricePerSqft: p.pricePerSqft, thickness: p.thickness, wearLayer: p.wearLayer, color: p.color, imageUrl: p.imageUrl })}
        />
        <LeadForm
          selectedProduct={selectedProduct}
          serviceType={serviceType}
          sqft={sqft}
        />
        <SocialProof />
        <Footer />
      </main>
      <StickyCTA />
      <ExitIntentPopup />
    </>
  )
}
