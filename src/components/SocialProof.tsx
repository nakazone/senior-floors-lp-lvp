export function SocialProof() {
  return (
    <section className="bg-[#f7f8fc] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Rating header – mesmo padrão da primeira LP */}
        <div className="mb-10 text-center">
          <p className="text-[#d6b598] text-lg tracking-widest" style={{ letterSpacing: '0.1em' }}>
            ★★★★★
          </p>
          <p className="mt-1 text-sm text-[#4a5568]">Average rating from verified homeowners</p>
          <h2 className="section-title mt-2 text-2xl font-bold text-[#1a2036] md:text-3xl">
            5-Star Rated LVP Flooring Company
          </h2>
          <a
            href="https://share.google/hLQEgyVnPVm99mozg"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-semibold text-[#1a2036] transition hover:text-[#252b47] hover:underline"
          >
            Read all reviews on Google →
          </a>
        </div>
        {/* Grid: 1 col mobile, 3 lado a lado no desktop */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <div className="testimonial-card rounded-lg bg-white p-6 shadow-[0_2px_10px_rgba(26,32,54,0.1)]">
            <p className="stars mb-3 text-[#d6b598] text-xl">★★★★★</p>
            <p className="testimonial-text mb-3 italic text-[#1a2036]">
              &quot;Senior Floors exceeded our expectations. The team was professional, clean, and organized throughout the entire LVP installation. Our new floors look absolutely stunning!&quot;
            </p>
            <p className="testimonial-author font-semibold text-[#1a2036] text-sm">
              — Sarah M., Homeowner
            </p>
          </div>
          <div className="testimonial-card rounded-lg bg-white p-6 shadow-[0_2px_10px_rgba(26,32,54,0.1)]">
            <p className="stars mb-3 text-[#d6b598] text-xl">★★★★★</p>
            <p className="testimonial-text mb-3 italic text-[#1a2036]">
              &quot;Outstanding quality workmanship. They helped us choose the perfect luxury vinyl plank for our kitchen, and the installation was flawless. Highly recommend!&quot;
            </p>
            <p className="testimonial-author font-semibold text-[#1a2036] text-sm">
              — James R., Homeowner
            </p>
          </div>
          <div className="testimonial-card rounded-lg bg-white p-6 shadow-[0_2px_10px_rgba(26,32,54,0.1)]">
            <p className="stars mb-3 text-[#d6b598] text-xl">★★★★★</p>
            <p className="testimonial-text mb-3 italic text-[#1a2036]">
              &quot;From consultation to completion, the experience was excellent. Clear communication, transparent pricing, and beautiful LVP results. Couldn&apos;t be happier!&quot;
            </p>
            <p className="testimonial-author font-semibold text-[#1a2036] text-sm">
              — Maria L., Homeowner
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
