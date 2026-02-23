export function Hero() {
  return (
    <section id="hero" className="relative bg-[#1a2036] pt-28 pb-20 text-white md:pt-36 md:pb-28">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="mb-4 inline-block rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
          Licensed & Insured
        </div>
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Premium LVP Flooring Installed Fast & Professionally
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
          High-quality Luxury Vinyl Plank + Expert Installation. Free Estimate in 24h.
        </p>
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex rounded-lg bg-[#d6b598] px-6 py-3 text-base font-semibold text-[#1a2036] shadow-lg hover:bg-[#e0c4a8]"
          >
            Get My Free Estimate
          </a>
          <a
            href="#catalog"
            className="inline-flex rounded-lg border-2 border-white/40 bg-transparent px-6 py-3 text-base font-semibold hover:bg-white/10"
          >
            View LVP Options
          </a>
        </div>
        <p className="text-sm text-white/70">✓ 5-Star Rated · ✓ Satisfaction Guarantee</p>
      </div>
    </section>
  )
}
