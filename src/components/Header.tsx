'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '#benefits', label: 'Benefits' },
  { href: '#catalog', label: 'LVP Options' },
  { href: '#contact', label: 'Get Quote' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-[#1a2036] shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-[all_0.3s_ease]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-1 items-center justify-between gap-4 py-4 md:py-4">
          {/* Logo - same as LP */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/SeniorFloors.png"
                alt="Senior Floors"
                className="h-[70px] w-auto object-contain md:h-[90px]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const next = target.nextElementSibling as HTMLElement | null
                  if (next) next.classList.remove('hidden')
                }}
              />
              <span className="hidden text-xl font-bold tracking-tight text-white">
                Senior Floors
              </span>
            </a>
          </div>

          {/* Nav - center on desktop, same as LP */}
          <nav
            className={`absolute left-0 right-0 top-full flex-1 flex-col bg-[#1a2036] md:static md:flex md:flex-row md:items-center md:justify-center md:gap-8 ${
              mobileOpen ? 'flex' : 'hidden'
            }`}
          >
            <ul className="flex list-none flex-col gap-4 px-4 py-4 md:flex-row md:gap-8 md:p-0">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[0.95rem] font-medium text-white/90 transition-colors hover:text-white md:py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header CTA - same as LP (gold + outline), both visible on mobile with smaller padding */}
          <div className="flex flex-shrink-0 items-center gap-2 md:gap-4">
            <a
              href="#contact"
              className="whitespace-nowrap rounded-md bg-[#d6b598] px-3 py-2 text-sm font-semibold text-[#1a2036] shadow transition hover:bg-[#e0c4a8] hover:shadow-lg md:px-5 md:py-2.5 md:text-base"
            >
              Get Free Estimate
            </a>
            <a
              href="tel:+17207519813"
              className="whitespace-nowrap rounded-md border border-white/30 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:px-5 md:py-2.5 md:text-base"
            >
              Call Now
            </a>
            <button
              type="button"
              className="flex flex-col gap-1 rounded p-2 md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className="block h-0.5 w-6 rounded bg-white" />
              <span className="block h-0.5 w-6 rounded bg-white" />
              <span className="block h-0.5 w-6 rounded bg-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
