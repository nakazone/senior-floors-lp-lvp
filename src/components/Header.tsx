'use client'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a2036] text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#" className="text-xl font-bold tracking-tight">
          Senior Floors
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#benefits" className="text-white/90 hover:text-white">Benefits</a>
          <a href="#catalog" className="text-white/90 hover:text-white">LVP Options</a>
          <a href="#calculator" className="text-white/90 hover:text-white">Estimate</a>
          <a href="#contact" className="text-white/90 hover:text-white">Get Quote</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="rounded-lg bg-[#d6b598] px-4 py-2 text-sm font-semibold text-[#1a2036] hover:bg-[#e0c4a8]">
            Get Free Estimate
          </a>
          <a href="tel:+17207519813" className="rounded-lg border border-white/30 px-4 py-2 text-sm font-medium hover:bg-white/10">
            Call Now
          </a>
        </div>
      </div>
    </header>
  )
}
