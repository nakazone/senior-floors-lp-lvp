import { prisma } from '@/lib/prisma'

export type LVPFilter = {
  color?: string
  thickness?: number
  minPrice?: number
  maxPrice?: number
  waterproof?: boolean
  commercial?: boolean
}

export async function getActiveProducts(filters?: LVPFilter) {
  const where: Record<string, unknown> = { active: true }
  if (filters?.color) where.color = { contains: filters.color, mode: 'insensitive' }
  if (filters?.thickness != null) where.thickness = filters.thickness
  if (filters?.waterproof != null) where.waterproof = filters.waterproof
  if (filters?.commercial != null) where.commercial = filters.commercial
  if (filters?.minPrice != null || filters?.maxPrice != null) {
    where.pricePerSqft = {}
    if (filters.minPrice != null) (where.pricePerSqft as Record<string, number>).gte = filters.minPrice
    if (filters.maxPrice != null) (where.pricePerSqft as Record<string, number>).lte = filters.maxPrice
  }
  return prisma.lVPProduct.findMany({
    where,
    orderBy: [{ pricePerSqft: 'asc' }, { name: 'asc' }],
  })
}

export async function getProductById(id: string) {
  return prisma.lVPProduct.findFirst({ where: { id, active: true } })
}
