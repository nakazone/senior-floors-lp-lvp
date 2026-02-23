import { prisma } from '@/lib/prisma'

const CONFIG_KEY_LABOR_RATE = 'labor_rate_per_sqft'

export async function getLaborRate(): Promise<number> {
  const row = await prisma.siteConfig.findUnique({
    where: { key: CONFIG_KEY_LABOR_RATE },
  })
  if (row) return parseFloat(row.value) || 0
  return 2.5 // default $2.5/sqft
}

export async function setLaborRate(rate: number) {
  return prisma.siteConfig.upsert({
    where: { key: CONFIG_KEY_LABOR_RATE },
    create: { key: CONFIG_KEY_LABOR_RATE, value: String(rate) },
    update: { value: String(rate) },
  })
}

export function calculateMaterial(sqft: number, pricePerSqft: number) {
  return Math.round(sqft * pricePerSqft * 100) / 100
}

export function calculateLabor(sqft: number, ratePerSqft: number) {
  return Math.round(sqft * ratePerSqft * 100) / 100
}
