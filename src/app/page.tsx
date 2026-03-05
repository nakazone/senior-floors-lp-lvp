'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { LVPProduct } from '@/data/lvpProducts'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { WhyTrustUs } from '@/components/WhyTrustUs'
import { Benefits } from '@/components/Benefits'
import { VerticalPlankGallery } from '@/components/VerticalPlankGallery'
import { LVPSelector } from '@/components/LVPSelector'
import { Showroom3DErrorBoundary } from '@/components/Showroom3DErrorBoundary'
import { LVP_PRODUCTS } from '@/data/lvpProducts'
import { LVP_FLOORS, DEFAULT_LVP_TEXTURE } from '@/lib/lvpTextures'

const LVPShowroom3D = dynamic(
  () => import('@/components/LVPShowroom3D').then((mod) => ({ default: mod.LVPShowroom3D })),
  { ssr: false, loading: () => <div className="flex aspect-[3/2] w-full max-w-4xl items-center justify-center rounded-xl bg-neutral-800 text-neutral-400">Loading 3D viewer...</div> }
)
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
  const [showroomTexture, setShowroomTexture] = useState(DEFAULT_LVP_TEXTURE)

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

        {/* 3D LVP Showroom — superfície vertical, troca de textura em tempo real */}
        <section
          id="showroom-3d"
          className="w-full scroll-mt-[var(--header-height)] bg-neutral-900 py-16 text-white md:py-24"
          aria-labelledby="showroom-3d-title"
        >
          <div className="mx-auto max-w-5xl px-4">
            <h2
              id="showroom-3d-title"
              className="text-center text-2xl font-bold md:text-3xl"
            >
              3D Floor Viewer
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-neutral-300">
              Rotate and zoom to explore the texture. Choose a style below.
            </p>
            <div className="mx-auto mt-8 flex justify-center">
              <Showroom3DErrorBoundary
                fallbackTexture={showroomTexture}
                fallbackUi={null}
              >
                <LVPShowroom3D
                  selectedTexture={showroomTexture}
                  onWebGLFail={() => {}}
                />
              </Showroom3DErrorBoundary>
            </div>
            <div className="mt-10">
              <h3 className="text-center text-lg font-semibold text-white">
                Select Your LVP Style
              </h3>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <LVPSelector
                  floors={LVP_FLOORS}
                  selectedTexture={showroomTexture}
                  onSelect={setShowroomTexture}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const floor = LVP_FLOORS.find((f) => f.texture === showroomTexture)
                    if (floor?.productId) {
                      const product = LVP_PRODUCTS.find((p) => p.id === floor.productId)
                      if (product) {
                        handleSelectFloor(product)
                        handleGetQuote(product, undefined, undefined)
                      }
                    }
                  }}
                  className="rounded-xl bg-amber-500 px-8 py-3.5 font-bold text-[#1a2036] transition hover:bg-amber-400"
                >
                  Select This Floor & Get Quote
                </button>
              </div>
            </div>
          </div>
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
