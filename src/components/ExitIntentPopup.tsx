'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'senior_floors_exit_intent_shown'

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor leaves from top (user going to close tab / address bar)
      if (e.clientY <= 0) {
        setOpen(true)
        sessionStorage.setItem(STORAGE_KEY, '1')
        document.removeEventListener('mouseout', handleMouseLeave)
      }
    }

    document.addEventListener('mouseout', handleMouseLeave)
    return () => document.removeEventListener('mouseout', handleMouseLeave)
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="relative max-w-md rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 text-[#718096] hover:text-[#1a2036]"
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-xl font-bold text-[#1a2036]">Wait — Get 10% Off Your Estimate</h3>
        <p className="mt-2 text-sm text-[#4a5568]">
          Get a free in-home estimate and we&apos;ll apply 10% off your installation when you mention this offer.
        </p>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-4 block w-full rounded-lg bg-[#1a2036] py-3 text-center font-semibold text-white hover:bg-[#252b47]"
        >
          Get My Free Estimate
        </a>
      </div>
    </div>
  )
}
