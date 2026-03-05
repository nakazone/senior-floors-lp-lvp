'use client'

import { useState } from 'react'
import type { LVPProduct } from '@/data/lvpProducts'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { WhyTrustUs } from '@/components/WhyTrustUs'
import { Benefits } from '@/components/Benefits'
import { VerticalPlankGallery } from '@/components/VerticalPlankGallery'
import { LVPGallery } from '@/components/LVPGallery'
import { LVP_PRODUCTS } from '@/data/lvpProducts'
import { ContactSection } from '@/components/ContactSection'
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

  const handleSelectFloor = (p: LVPProduct) => {
    setSelectedProduct({ id: p.id, name: p.name, pricePerSqft: p.pricePerSqft, thickness: p.thickness, wearLayer: p.wearLayer, color: p.color, imageUrl: p.imageUrl })
  }

  const handleGetQuote = (
    p: LVPProduct,
    sqftFromGallery?: string,
    serviceTypeFromGallery?: 'material_only' | 'labor_only' | 'full_installation'
  ) => {
    setSelectedProduct({ id: p.id, name: p.name, pricePerSqft: p.pricePerSqft, thickness: p.thickness, wearLayer: p.wearLayer, color: p.color, imageUrl: p.imageUrl })
    if (sqftFromGallery !== undefined) setSqft(sqftFromGallery)
    if (serviceTypeFromGallery !== undefined) setServiceType(serviceTypeFromGallery)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <WhyTrustUs />
        <Benefits />

        {/* Nova seção: galeria fullscreen vertical para comparar formato */}
        <section
          id="gallery-fullscreen"
          className="relative scroll-mt-[var(--header-height)]"
          aria-labelledby="gallery-fullscreen-title"
        >
          <div
            className="absolute left-0 right-0 z-10 px-4 pt-4 text-center md:pt-6"
            style={{ top: 'var(--header-height)' }}
          >
            <h2
              id="gallery-fullscreen-title"
              className="text-xl font-bold text-white drop-shadow-lg md:text-2xl"
            >
              Compare: fullscreen vertical gallery
            </h2>
            <p className="mx-auto mt-1 max-w-md text-sm text-white/90 drop-shadow md:text-base">
              Scroll to explore each floor — then see the plank layout below
            </p>
          </div>
          <LVPGallery
            products={LVP_PRODUCTS}
            onSelect={handleSelectFloor}
            onGetQuote={(p) => handleGetQuote(p, undefined, undefined)}
          />
        </section>

        <section id="gallery-planks" className="relative scroll-mt-[var(--header-height)]" aria-label="Plank layout gallery">
          <div
            className="absolute left-0 right-0 z-10 px-4 pt-4 text-center md:pt-6"
            style={{ top: 'var(--header-height)' }}
          >
            <h2 className="text-xl font-bold text-[#1a2036] md:text-2xl">
              Compare: horizontal plank gallery
            </h2>
            <p className="mx-auto mt-1 max-w-md text-sm text-[#4a5568] md:text-base">
              Click a floor to see details, calculator & quote
            </p>
          </div>
          <VerticalPlankGallery
            products={LVP_PRODUCTS}
            onSelect={handleSelectFloor}
            onGetQuote={handleGetQuote}
          />
        </section>
        <ContactSection
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
