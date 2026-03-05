'use client'

export function WhyTrustUs() {
  return (
    <section id="why-trust" className="bg-[#f7f8fc] px-4 pb-4 pt-16 md:pt-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Why Trust - same structure as first LP */}
        <h2 className="section-title mb-2 text-center text-2xl font-bold text-[#1a2036] md:text-3xl">
          Why Denver Homeowners Choose Senior Floors
        </h2>
        <p className="section-subtitle mx-auto mb-8 max-w-[700px] text-center text-lg text-[#4a5568]">
          Denver&apos;s most trusted hardwood flooring company — licensed, insured, and 5-star rated by homeowners across the metro area.
        </p>
        <div className="trust-content mx-auto max-w-[800px] text-center">
          <p className="text-lg leading-[1.8] text-[#4a5568]">
            Whether you&apos;re refinishing existing hardwood floors in your Cherry Creek home, installing new luxury vinyl plank in Greenwood Village, or restoring damaged floors in Lakewood, Senior Floors delivers flawless results. As Denver&apos;s premier flooring contractor, we specialize in hardwood installation, refinishing, sanding, and luxury vinyl plank installation. Our expert craftsmanship, premium materials, and attention to detail transform your floors while increasing your home&apos;s value. Serving Denver, Cherry Creek, Greenwood Village, Lakewood, Morrison, and surrounding Colorado communities.
          </p>
        </div>

        {/* 5-Star Rated + Testimonials - exactly like first LP */}
        <div className="rating-header mt-12 mb-8 text-center">
          <div className="rating-stars-minimal mb-1 text-[1.1rem] tracking-[0.1em] text-[#d6b598]">
            ★★★★★
          </div>
          <p className="rating-text-minimal mb-0.5 mt-0 text-[0.85rem] text-[#4a5568]">
            Average rating from verified homeowners
          </p>
          <h2 className="section-title mb-2 mt-0 text-center text-2xl font-bold text-[#1a2036] md:text-3xl">
            5-Star Rated Flooring Company
          </h2>
          <a
            href="https://share.google/hLQEgyVnPVm99mozg"
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-link mt-2 inline-block text-[0.95rem] font-semibold text-[#1a2036] transition hover:text-[#252b47] hover:underline"
          >
            Read all reviews on Google →
          </a>
        </div>

        <div className="testimonials-grid grid grid-cols-1 gap-8 md:grid-cols-1">
          <div className="testimonial-card rounded-lg bg-white p-6 shadow-[0_2px_10px_rgba(26,32,54,0.1)]">
            <div className="stars mb-4 text-[1.25rem] text-[#d6b598]">★★★★★</div>
            <p className="testimonial-text mb-4 italic text-[#1a2036]">
              &quot;Senior Floors exceeded our expectations. The team was professional, clean, and organized throughout the entire installation. Our new hardwood floors look absolutely stunning!&quot;
            </p>
            <p className="testimonial-author text-[0.9rem] font-semibold text-[#1a2036]">
              — Sarah M., Homeowner
            </p>
          </div>
          <div className="testimonial-card rounded-lg bg-white p-6 shadow-[0_2px_10px_rgba(26,32,54,0.1)]">
            <div className="stars mb-4 text-[1.25rem] text-[#d6b598]">★★★★★</div>
            <p className="testimonial-text mb-4 italic text-[#1a2036]">
              &quot;Outstanding quality workmanship and reliability. They helped us choose the perfect luxury vinyl plank for our kitchen, and the installation was flawless. Highly recommend!&quot;
            </p>
            <p className="testimonial-author text-[0.9rem] font-semibold text-[#1a2036]">
              — James R., Homeowner
            </p>
          </div>
          <div className="testimonial-card rounded-lg bg-white p-6 shadow-[0_2px_10px_rgba(26,32,54,0.1)]">
            <div className="stars mb-4 text-[1.25rem] text-[#d6b598]">★★★★★</div>
            <p className="testimonial-text mb-4 italic text-[#1a2036]">
              &quot;From consultation to completion, the experience was excellent. Clear communication, transparent pricing, and beautiful results. Couldn&apos;t be happier with our new floors!&quot;
            </p>
            <p className="testimonial-author text-[0.9rem] font-semibold text-[#1a2036]">
              — Maria L., Homeowner
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
