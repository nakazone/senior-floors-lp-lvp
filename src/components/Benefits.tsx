import Image from 'next/image'

const items = [
  {
    title: '100% Waterproof',
    subtitle: "Built to Handle Life's Messes",
    description:
      "LVP flooring is completely waterproof, making it perfect for kitchens, bathrooms, basements, and busy households. Spills, moisture, and humidity won't damage the floor, giving you peace of mind and long-lasting durability in any room of your home.",
    icon: '/assets/water.png',
    alt: 'Waterproof',
  },
  {
    title: 'Scratch Resistant',
    subtitle: 'Made to Withstand Everyday Wear',
    description:
      'Luxury Vinyl Plank is designed with a durable wear layer that protects against scratches, dents, and daily foot traffic. Whether you have kids running around or heavy furniture in your home, LVP keeps its beautiful appearance for years.',
    icon: '/assets/scratch.png',
    alt: 'Scratch resistant',
  },
  {
    title: 'Pet Friendly',
    subtitle: 'Perfect for Homes with Pets',
    description:
      "If you have dogs or cats, LVP is one of the best flooring choices available. It resists scratches from claws, is easy to clean, and doesn't absorb odors or stains. That means your home stays looking great—even with furry friends around.",
    icon: '/assets/pet.png',
    alt: 'Pet friendly',
  },
  {
    title: 'Affordable Alternative to Hardwood',
    subtitle: 'Get the Look of Hardwood Without the High Cost',
    description:
      'LVP beautifully replicates the natural look of hardwood flooring but at a fraction of the price. You get the same elegant wood appearance, modern colors, and textures without the expensive material cost and maintenance required by traditional hardwood floors.',
    icon: '/assets/money.png',
    alt: 'Affordable',
  },
  {
    title: 'Fast Installation',
    subtitle: 'Upgrade Your Floors in Just Days',
    description:
      "Unlike traditional flooring that can take weeks to install, LVP is designed for fast and efficient installation. In many cases, our team can transform your floors in just a few days, minimizing disruption to your home while delivering stunning results.",
    icon: '/assets/fast.png',
    alt: 'Fast installation',
  },
  {
    title: 'Easy Maintenance',
    subtitle: 'Beautiful Floors with Minimal Effort',
    description:
      'LVP flooring requires very little maintenance to keep it looking new. Simple sweeping and occasional mopping are enough to maintain its appearance. No sanding, refinishing, or special treatments are required—making it a perfect solution for busy households.',
    icon: '/assets/fast.png',
    alt: 'Easy maintenance',
  },
]

export function Benefits() {
  return (
    <section id="benefits" className="bg-[#f7f8fc] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-2 text-center text-3xl font-bold text-[#1a2036] md:text-4xl">
          Benefits of LVP
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-[#4a5568]">
          Why homeowners choose Luxury Vinyl Plank flooring.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(26,32,54,0.1)] transition hover:shadow-[0_4px_20px_rgba(26,32,54,0.15)]"
            >
              {/* Ícone com fundo azul – mesmo padrão da primeira LP (service-icon) */}
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl p-4 shadow-[0_2px_10px_rgba(26,32,54,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(26,32,54,0.15)]"
                style={{
                  background: 'linear-gradient(135deg, #1a2036 0%, #252b47 100%)',
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={48}
                  height={48}
                  className="object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[#1a2036]">{item.title}</h3>
                {item.subtitle && (
                  <p className="mt-1 text-sm font-medium text-[#252b47]">{item.subtitle}</p>
                )}
                {item.description && (
                  <p className="mt-2 text-sm leading-relaxed text-[#4a5568]">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
