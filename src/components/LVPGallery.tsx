'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import type { LVPProduct } from '@/data/lvpProducts'

export interface LVPGalleryProps {
  products: LVPProduct[]
  onSelect?: (product: LVPProduct) => void
}

const overlayStyle = {
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.4) 100%)',
}

export function LVPGallery({ products, onSelect }: LVPGalleryProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const updateActiveIndex = useCallback(() => {
    if (!containerRef.current || isScrolling) return
    const section = containerRef.current
    const scrollTop = section.scrollTop
    const slideHeight = window.innerHeight
    const index = Math.round(scrollTop / slideHeight)
    setActiveIndex(Math.min(index, products.length - 1))
  }, [products.length, isScrolling])

  useEffect(() => {
    const section = containerRef.current
    if (!section) return
    const handleScroll = () => {
      requestAnimationFrame(updateActiveIndex)
    }
    section.addEventListener('scroll', handleScroll, { passive: true })
    return () => section.removeEventListener('scroll', handleScroll)
  }, [updateActiveIndex])

  const goToSlide = (index: number) => {
    if (!containerRef.current) return
    setIsScrolling(true)
    const slideHeight = window.innerHeight
    containerRef.current.scrollTo({ top: index * slideHeight, behavior: 'smooth' })
    setActiveIndex(index)
    setTimeout(() => setIsScrolling(false), 800)
  }

  if (!products.length) return null

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
      style={{ height: '100vh' }}
    >
      {products.map((product, index) => (
        <Slide
          key={product.id}
          product={product}
          index={index}
          onSelect={onSelect}
        />
      ))}

      {/* Mini indicador lateral */}
      <nav
        className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex"
        aria-label="Product navigation"
      >
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => goToSlide(i)}
            className="group flex items-center gap-2 text-right"
            aria-label={`Go to ${p.name}`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'h-3 w-3 bg-white ring-2 ring-white/50'
                  : 'bg-white/60 hover:bg-white/90'
              }`}
            />
            <span
              className={`max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:max-w-[120px] group-hover:opacity-100 ${
                activeIndex === i ? 'max-w-[120px] opacity-100' : ''
              }`}
            >
              {p.color}
            </span>
          </button>
        ))}
      </nav>

      {/* Scroll indicator (só no primeiro slide) */}
      {activeIndex === 0 && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 md:bottom-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-white/90"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* CTA sticky mobile */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/20 bg-[#1a2036]/95 px-4 py-3 backdrop-blur-sm md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <a
          href="#contact"
          className="block w-full rounded-xl bg-amber-500 py-3.5 text-center text-sm font-bold text-[#1a2036] transition hover:bg-amber-400"
        >
          Get Free Estimate
        </a>
      </motion.div>
    </section>
  )
}

function Slide({
  product,
  index,
  onSelect,
}: {
  product: LVPProduct
  index: number
  onSelect?: (p: LVPProduct) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })

  return (
    <div
      ref={ref}
      className="group relative flex min-h-screen w-full shrink-0 snap-start snap-always items-end justify-start"
      style={{ minHeight: '100vh' }}
    >
      {/* Background: textura em formato vertical, com leve perspectiva */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            transform: 'perspective(1000px) rotateX(2deg)',
            transformOrigin: 'center center',
          }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={product.imageUrl}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            style={{ objectFit: 'cover' }}
            priority={index < 2}
          />
          {/* Brilho sutil no hover (textura) */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]"
            style={{
              backgroundImage: `url(${product.imageUrl})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '25% auto',
            }}
            aria-hidden
          />
        </motion.div>
        {/* Overlay escuro */}
        <div className="absolute inset-0" style={overlayStyle} aria-hidden />
      </div>

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 w-full max-w-6xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            {product.name}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              {product.thickness}mm
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              {product.wearLayer} mil wear layer
            </span>
            {product.waterproof && (
              <span className="rounded-full bg-emerald-500/80 px-3 py-1 text-sm font-medium text-white">
                Waterproof
              </span>
            )}
            {product.commercial && (
              <span className="rounded-full bg-amber-500/80 px-3 py-1 text-sm font-medium text-[#1a2036]">
                Commercial Grade
              </span>
            )}
          </div>
          <p className="mt-6 text-2xl font-semibold text-white md:text-3xl">
            ${product.pricePerSqft.toFixed(2)}/sqft
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={() => onSelect?.(product)}
              className="rounded-xl bg-white px-6 py-3.5 text-base font-bold text-[#1a2036] shadow-xl transition hover:bg-white/95"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Select This Floor
            </motion.button>
            <motion.a
              href="#contact"
              className="rounded-xl border-2 border-white bg-transparent px-6 py-3.5 text-base font-bold text-white transition hover:bg-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Calculate My Price
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
