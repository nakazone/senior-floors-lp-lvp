'use client'

import { useState } from 'react'
import type { LVPProduct } from '@/data/lvpProducts'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { WhyTrustUs } from '@/components/WhyTrustUs'
import { Benefits } from '@/components/Benefits'
import { VerticalPlankGallery } from '@/components/VerticalPlankGallery'
import { LVP_PRODUCTS_BY_COLOR } from '@/data/lvpProducts'
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

        <section
          id="gallery-planks"
          className="relative min-h-[calc(100vh-var(--header-height))] snap-start scroll-mt-[var(--header-height)] md:min-h-0"
          aria-label="LVP Catalog gallery"
        >
          {/* Mobile: header em overlay para galeria full screen. Desktop: bloco normal acima da galeria */}
          <div
            className="absolute left-0 right-0 top-0 z-10 w-full px-3 py-2 md:static md:z-auto md:block md:w-full md:bg-gradient-to-b md:from-[#f0f4ff] md:to-white md:px-4 md:py-0 md:pb-10 md:pt-8 md:pb-14 md:pt-12"
            style={{
              background: 'linear-gradient(to bottom, rgba(240,244,255,0.97) 0%, rgba(255,255,255,0.95) 60%, transparent)',
            }}
          >
            <div className="mx-auto max-w-2xl text-center md:max-w-2xl">
              <span className="mb-1 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1a2036]/80 md:mb-2 md:text-xs md:tracking-[0.2em]">
                Flooring collection
              </span>
              <h2 className="text-xl font-bold tracking-tight text-[#1a2036] md:text-4xl lg:text-[2.75rem]">
                LVP Catalog
              </h2>
              <p className="mx-auto mt-1 hidden max-w-lg text-sm leading-relaxed text-[#4a5568] md:mt-4 md:block md:text-lg">
                Meet our best sellers or request a visit to see all our LVP options.
              </p>
              <a
                href="#contact"
                className="mt-2 inline-block rounded-lg bg-[#1a2036] px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-[#252b47] md:mt-6 md:rounded-xl md:px-6 md:py-3 md:text-sm md:shadow-lg md:shadow-xl"
              >
                Request a visit
              </a>
            </div>
          </div>
          <VerticalPlankGallery
            products={LVP_PRODUCTS_BY_COLOR}
            onSelect={handleSelectFloor}
            onGetQuote={handleGetQuote}
            noTopMargin
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
