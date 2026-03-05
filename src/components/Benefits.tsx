import Image from 'next/image'

const items = [
  { title: '100% Waterproof', icon: '/assets/water.png', alt: 'Waterproof' },
  { title: 'Scratch Resistant', icon: '/assets/scratch.png', alt: 'Scratch resistant' },
  { title: 'Pet Friendly', icon: '/assets/pet.png', alt: 'Pet friendly' },
  { title: 'Affordable Alternative to Hardwood', icon: '/assets/money.png', alt: 'Affordable' },
  { title: 'Fast Installation', icon: '/assets/fast.png', alt: 'Fast installation' },
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
              <h3 className="font-semibold text-[#1a2036]">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
