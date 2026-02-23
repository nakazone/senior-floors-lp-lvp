'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { LVPProduct } from '@/data/lvpProducts'

const FALLBACK_IMAGE = '/assets/lvp1.png'

export interface FloorDetailModalProps {
  product: LVPProduct | null
  onClose: () => void
  onGetQuote: (product: LVPProduct) => void
}

export function FloorDetailModal({ product, onClose, onGetQuote }: FloorDetailModalProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)

  useEffect(() => {
    if (product) setImgSrc(product.imageUrl)
  }, [product])

  useEffect(() => {
    if (!product) return
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop - click to close */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />

          {/* Conteúdo: foto fullscreen + painel de informações */}
          <motion.div
            className="relative flex h-full w-full flex-col md:flex-row"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Foto em tela cheia (esquerda / topo no mobile) */}
            <div className="relative flex-1 min-h-[40vh] md:min-h-0 md:h-full">
              <div className="absolute inset-0 relative">
                <Image
                  src={imgSrc || product.imageUrl || FALLBACK_IMAGE}
                  alt={product.name}
                  fill
                  sizes="100vw"
                  className="object-contain object-center"
                  priority
                  onError={() => setImgSrc(FALLBACK_IMAGE)}
                />
              </div>
            </div>

            {/* Painel de informações */}
            <div className="flex shrink-0 flex-col justify-between bg-[#1a2036] p-6 text-white md:w-[380px] md:max-w-[90vw]">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">{product.name}</h2>
                {product.description && (
                  <p className="mt-2 text-white/80">{product.description}</p>
                )}
                <dl className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-white/60">Thickness</dt>
                    <dd className="font-medium">{product.thickness}mm</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/60">Wear layer</dt>
                    <dd className="font-medium">{product.wearLayer} mil</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/60">Color</dt>
                    <dd className="font-medium">{product.color}</dd>
                  </div>
                  {product.waterproof && (
                    <div className="flex justify-between">
                      <dt className="text-white/60">Waterproof</dt>
                      <dd className="font-medium text-emerald-400">Yes</dd>
                    </div>
                  )}
                  {product.commercial && (
                    <div className="flex justify-between">
                      <dt className="text-white/60">Grade</dt>
                      <dd className="font-medium text-amber-400">Commercial</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-white/20 pt-3 mt-3">
                    <dt className="text-white/60">Price</dt>
                    <dd className="text-xl font-bold">${product.pricePerSqft.toFixed(2)}/sqft</dd>
                  </div>
                </dl>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => onGetQuote(product)}
                  className="w-full rounded-xl bg-amber-500 py-3.5 font-semibold text-[#1a2036] transition hover:bg-amber-400"
                >
                  Get Quote
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-xl border border-white/30 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>

          {/* Botão X no canto */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
