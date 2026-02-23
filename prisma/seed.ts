import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

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

  // Optional: seed one LVP product for demo
  const count = await prisma.lVPProduct.count()
  if (count === 0) {
    await prisma.lVPProduct.create({
      data: {
        name: 'Classic Oak',
        description: 'Warm oak look, residential',
        thickness: 6,
        wearLayer: 12,
        color: 'Oak',
        pricePerSqft: 3.5,
        waterproof: true,
        commercial: false,
        imageUrl: 'https://placehold.co/400x300/f7f8fc/4a5568?text=Oak',
        active: true,
      },
    })
    console.log('Sample LVP product created')
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
