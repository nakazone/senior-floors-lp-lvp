const items = [
  { title: '100% Waterproof', icon: '💧' },
  { title: 'Scratch Resistant', icon: '🛡️' },
  { title: 'Pet Friendly', icon: '🐾' },
  { title: 'Affordable Alternative to Hardwood', icon: '💰' },
  { title: 'Fast Installation', icon: '⚡' },
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
              className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(26,32,54,0.1)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a2036] text-xl text-white">
                {item.icon}
              </span>
              <h3 className="font-semibold text-[#1a2036]">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
