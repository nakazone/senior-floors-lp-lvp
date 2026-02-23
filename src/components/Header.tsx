'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#benefits', label: 'Benefits' },
  { href: '#plank-gallery', label: 'LVP Options' },
  { href: '#contact', label: 'Get Quote' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollShadow, setScrollShadow] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrollShadow(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 767) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] bg-[#1a2036] transition-[all_0.3s_ease]"
      style={{
        boxShadow: scrollShadow ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 md:py-4">
          {/* Logo - mesmo tamanho da primeira LP: 55px mobile, 90px desktop */}
          <div className="order-1 flex-shrink-0 md:order-none">
            <a href="#hero" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/SeniorFloors.png"
                alt="Senior Floors"
                className="h-[55px] w-auto object-contain md:h-[90px]"
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

          {/* Nav - centralizado no desktop; no mobile: painel fixo com transição */}
          <nav
            className={`fixed left-0 right-0 top-[60px] z-[1001] flex w-full flex-col bg-[#1a2036] shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-[max-height_0.4s_ease,opacity_0.3s_ease] md:static md:top-auto md:flex md:flex-1 md:flex-row md:justify-center md:gap-8 md:overflow-visible md:shadow-none ${
              mobileOpen ? 'max-h-[350px] opacity-100' : 'max-h-0 overflow-hidden opacity-0 md:max-h-none md:opacity-100'
            }`}
          >
            <ul className="flex list-none flex-col gap-0 py-2 md:flex-row md:items-center md:gap-8 md:p-0">
              {navLinks.map(({ href, label }) => (
                <li key={href} className="w-full md:w-auto">
                  <a
                    href={href}
                    className="block border-b border-white/10 px-8 py-3 text-left text-[0.95rem] font-medium text-white transition hover:text-white md:relative md:inline-block md:border-0 md:py-2 md:px-0 md:after:absolute md:after:bottom-0 md:after:left-0 md:after:h-0.5 md:after:w-0 md:after:bg-[#d6b598] md:after:content-[''] md:after:transition-[width_0.3s_ease] md:hover:after:w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA - mesmo estilo da primeira LP: dois botões dourados, hover com translateY(-2px) */}
          <div className="order-3 ml-auto flex flex-shrink-0 flex-row items-center gap-2 md:order-none md:gap-4">
            <a
              href="#contact"
              className="inline-block whitespace-nowrap rounded-md bg-[#d6b598] px-4 py-2.5 text-sm font-semibold text-[#1a2036] shadow transition hover:bg-[#e0c4a8] hover:-translate-y-0.5 hover:shadow-lg md:px-7 md:py-3.5 md:text-base"
            >
              Get Free Estimate
            </a>
            <a
              href="tel:+17207519813"
              className="inline-block whitespace-nowrap rounded-md bg-[#d6b598] px-4 py-2.5 text-sm font-semibold text-[#1a2036] shadow transition hover:bg-[#e0c4a8] hover:-translate-y-0.5 hover:shadow-lg md:px-7 md:py-3.5 md:text-base"
            >
              Call Now
            </a>
            {/* Hamburger - mesma animação da primeira LP (X ao abrir) */}
            <button
              type="button"
              className="flex flex-col justify-center gap-[5px] rounded p-2 md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={`block h-[3px] w-[25px] rounded-[2px] bg-white transition-all duration-300 ${
                  mobileOpen ? 'translate-x-[8px] translate-y-[8px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[3px] w-[25px] rounded-[2px] bg-white transition-opacity duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-[3px] w-[25px] rounded-[2px] bg-white transition-all duration-300 ${
                  mobileOpen ? 'translate-x-[7px] -translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
