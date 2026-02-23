/**
 * Catálogo LVP estático – sem banco de dados.
 * Edite este arquivo para adicionar ou alterar produtos.
 */

export type LVPProduct = {
  id: string
  name: string
  description: string | null
  thickness: number
  wearLayer: number
  color: string
  pricePerSqft: number
  waterproof: boolean
  commercial: boolean
  imageUrl: string
}

export const LVP_PRODUCTS: LVPProduct[] = [
  {
    id: 'classic-oak',
    name: 'Classic Oak',
    description: 'Warm oak look, residential',
    thickness: 6,
    wearLayer: 12,
    color: 'Oak',
    pricePerSqft: 3.5,
    waterproof: true,
    commercial: false,
    imageUrl: '/assets/lvp1.png',
  },
  {
    id: 'natural-walnut',
    name: 'Natural Walnut',
    description: 'Rich dark walnut, premium finish',
    thickness: 8,
    wearLayer: 20,
    color: 'Walnut',
    pricePerSqft: 4.25,
    waterproof: true,
    commercial: false,
    imageUrl: '/assets/lvp2.png',
  },
  {
    id: 'slate-gray',
    name: 'Slate Gray',
    description: 'Modern gray LVP, high traffic',
    thickness: 6,
    wearLayer: 12,
    color: 'Gray',
    pricePerSqft: 3.75,
    waterproof: true,
    commercial: true,
    imageUrl: '/assets/lvp1.png',
  },
  {
    id: 'hickory',
    name: 'Hickory',
    description: 'Light hickory with natural variation',
    thickness: 5,
    wearLayer: 12,
    color: 'Hickory',
    pricePerSqft: 3.25,
    waterproof: true,
    commercial: false,
    imageUrl: '/assets/lvp2.png',
  },
  {
    id: 'white-oak',
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
    id: 'barnwood',
    name: 'Barnwood',
    description: 'Rustic reclaimed barnwood style',
    thickness: 8,
    wearLayer: 20,
    color: 'Barnwood',
    pricePerSqft: 4.0,
    waterproof: true,
    commercial: true,
    imageUrl: '/assets/lvp2.png',
  },
  {
    id: 'coastal-pine',
    name: 'Coastal Pine',
    description: 'Light pine, coastal and airy',
    thickness: 5,
    wearLayer: 12,
    color: 'Pine',
    pricePerSqft: 2.95,
    waterproof: false,
    commercial: false,
    imageUrl: '/assets/lvp1.png',
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    description: 'Dark charcoal LVP, commercial grade',
    thickness: 8,
    wearLayer: 20,
    color: 'Charcoal',
    pricePerSqft: 4.75,
    waterproof: true,
    commercial: true,
    imageUrl: '/assets/lvp2.png',
  },
]
