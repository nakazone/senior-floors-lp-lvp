'use client'

import { useState } from 'react'
import type { LVPProduct } from '@/data/lvpProducts'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { WhyTrustUs } from '@/components/WhyTrustUs'
import { Benefits } from '@/components/Benefits'
import { VerticalPlankGallery } from '@/components/VerticalPlankGallery'
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

        <section id="gallery-planks" className="relative scroll-mt-[var(--header-height)]" aria-label="Our LVPs gallery">
          <div
            className="relative w-full bg-gradient-to-b from-[#f0f4ff] to-white px-4 pb-10 pt-8 md:pb-14 md:pt-12"
            style={{ paddingTop: 'max(var(--header-height), 2rem)' }}
          >
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#1a2036]/70">
                Flooring collection
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#1a2036] md:text-4xl lg:text-[2.75rem]">
                Our LVPs
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-[#4a5568] md:mt-4 md:text-lg">
                Meet our best sellers or request a visit to see all our LVP options.
              </p>
              <a
                href="#contact"
                className="mt-6 inline-block rounded-xl bg-[#1a2036] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#252b47] hover:shadow-xl"
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
