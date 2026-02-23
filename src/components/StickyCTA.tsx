'use client'

export function StickyCTA() {
  return (
    <>
      <div className="fixed bottom-4 left-4 z-40 md:left-6">
        <a
          href="tel:+17207519813"
          className="flex items-center gap-2 rounded-full bg-[#48bb78] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#38a169] md:px-5"
        >
          Call Now
        </a>
      </div>
      <div className="fixed bottom-4 right-4 z-40 md:right-6">
        <a
          href="#contact"
          className="rounded-full bg-[#1a2036] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#252b47] md:px-5"
        >
          Get Free Estimate
        </a>
      </div>
    </>
  )
}
