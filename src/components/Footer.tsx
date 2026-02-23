'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#1a2036] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {/* Column 1: Logo + description + trust + certificate - same as LP */}
          <div className="flex flex-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://senior-floors.com/assets/SeniorFloors.png"
              alt="Senior Floors"
              className="mb-4 h-[70px] w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <p className="mb-4 text-sm leading-relaxed text-white/80">
              Elegant, durable flooring installed with precision and care. Denver&apos;s trusted hardwood flooring
              experts serving medium to high-end homes across the metro area.
            </p>
            <div className="mb-4 flex flex-wrap gap-2" role="list">
              <span className="rounded bg-white/15 px-3 py-1.5 text-xs font-medium" role="listitem">
                Licensed
              </span>
              <span className="rounded bg-white/15 px-3 py-1.5 text-xs font-medium" role="listitem">
                Insured
              </span>
              <span className="rounded bg-white/15 px-3 py-1.5 text-xs font-medium" role="listitem">
                10+ Years Experience
              </span>
            </div>
            <div className="inline-block rounded-lg border border-white/20 bg-white/10 px-4 py-2">
              <div className="text-center text-sm text-[#d6b598]">★★★★★ Google Reviews</div>
              <div className="text-center text-xs font-semibold uppercase tracking-wide text-white/95">
                Hardwood Flooring Specialists
              </div>
            </div>
          </div>

          {/* Column 2: Our Services - LVP-focused */}
          <div className="flex flex-col">
            <h4 className="mb-4 text-lg font-semibold text-white">Our Services</h4>
            <ul className="list-none space-y-2 p-0 text-[0.95rem] text-white/80">
              <li>LVP Installation</li>
              <li>Material + Labor Packages</li>
              <li>Luxury Vinyl Plank (LVP)</li>
              <li>Free In-Home Estimates</li>
              <li>Residential & Commercial</li>
            </ul>
          </div>

          {/* Column 3: Contact - same as LP */}
          <div className="flex flex-col">
            <h4 className="mb-4 text-lg font-semibold text-white">Contact Us</h4>
            <div className="flex flex-col gap-3 text-left text-[0.95rem] text-white/80">
              <p>
                <strong className="block text-white">Phone:</strong>
                <a href="tel:+17207519813" className="text-[#d6b598] no-underline hover:underline">
                  (720) 751-9813
                </a>
              </p>
              <p>
                <strong className="block text-white">Email:</strong>
                <a href="mailto:contact@senior-floors.com" className="text-[#d6b598] no-underline hover:underline">
                  contact@senior-floors.com
                </a>
              </p>
              <p>
                <strong className="block text-white">Service Areas:</strong>
                Denver, Cherry Creek, Greenwood Village, Lakewood, Morrison, DTC, & Metro Area
              </p>
            </div>
          </div>
        </div>

        {/* Footer bottom - same as LP */}
        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/80">
          <p>© {new Date().getFullYear()} Senior Floors. All rights reserved.</p>
          <p className="mt-2 text-xs text-white/70">
            <Link href="/admin" className="text-inherit hover:text-[#d6b598] hover:underline">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
