import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Texture images (Unsplash - free to use, good for LVP/wood look)
const FLOOR_SAMPLES = [
  {
    name: 'Classic Oak',
    description: 'Warm oak look, residential',
    thickness: 6,
    wearLayer: 12,
    color: 'Oak',
    pricePerSqft: 3.5,
    waterproof: true,
    commercial: false,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    name: 'Natural Walnut',
    description: 'Rich dark walnut, premium finish',
    thickness: 8,
    wearLayer: 20,
    color: 'Walnut',
    pricePerSqft: 4.25,
    waterproof: true,
    commercial: false,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d4ed19c43f3?w=800&q=80',
  },
  {
    name: 'Slate Gray',
    description: 'Modern gray LVP, high traffic',
    thickness: 6,
    wearLayer: 12,
    color: 'Gray',
    pricePerSqft: 3.75,
    waterproof: true,
    commercial: true,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    name: 'Hickory',
    description: 'Light hickory with natural variation',
    thickness: 5,
    wearLayer: 12,
    color: 'Hickory',
    pricePerSqft: 3.25,
    waterproof: true,
    commercial: false,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    name: 'White Oak',
    description: 'Clean white oak, Scandinavian look',
    thickness: 6,
    wearLayer: 20,
    color: 'White Oak',
    pricePerSqft: 4.5,
    waterproof: true,
    commercial: false,
    imageUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80',
  },
  {
    name: 'Barnwood',
    description: 'Rustic reclaimed barnwood style',
    thickness: 8,
    wearLayer: 20,
    color: 'Barnwood',
    pricePerSqft: 4.0,
    waterproof: true,
    commercial: true,
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  },
  {
    name: 'Coastal Pine',
    description: 'Light pine, coastal and airy',
    thickness: 5,
    wearLayer: 12,
    color: 'Pine',
    pricePerSqft: 2.95,
    waterproof: false,
    commercial: false,
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
  },
  {
    name: 'Charcoal',
    description: 'Dark charcoal LVP, commercial grade',
    thickness: 8,
    wearLayer: 20,
    color: 'Charcoal',
    pricePerSqft: 4.75,
    waterproof: true,
    commercial: true,
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  },
]

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@seniorfloors.com'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const hash = await bcrypt.hash(password, 10)
  await prisma.adminUser.upsert({
    where: { email },
    create: { email, password: hash },
    update: {},
  })
  console.log('Admin user ready:', email)

  // Ensure all 8 LVP floor models exist (create only if missing)
  let created = 0
  for (const sample of FLOOR_SAMPLES) {
    const existing = await prisma.lVPProduct.findFirst({ where: { name: sample.name } })
    if (!existing) {
      await prisma.lVPProduct.create({
        data: {
          name: sample.name,
          description: sample.description,
          thickness: sample.thickness,
          wearLayer: sample.wearLayer,
          color: sample.color,
          pricePerSqft: sample.pricePerSqft,
          waterproof: sample.waterproof,
          commercial: sample.commercial,
          imageUrl: sample.imageUrl,
          active: true,
        },
      })
      created++
    }
  }
  if (created > 0) console.log(`${created} LVP floor model(s) created. Total samples: ${FLOOR_SAMPLES.length}.`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
