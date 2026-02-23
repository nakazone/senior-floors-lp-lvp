import { prisma } from '@/lib/prisma'

export type CreateLeadInput = {
  name: string
  email: string
  phone: string
  zipCode: string
  sqft?: number
  productId?: string
  serviceType: 'material_only' | 'labor_only' | 'full_installation'
  photoUrl?: string
}

export async function createLead(data: CreateLeadInput) {
  return prisma.lead.create({
    data: {
      ...data,
      status: 'new',
    },
    include: { product: true },
  })
}

export async function getLeads(limit = 500) {
  return prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: { product: true },
  })
}
