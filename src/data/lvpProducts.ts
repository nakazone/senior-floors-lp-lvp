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
  /** Shown in detail view when user clicks "Select This Floor" (e.g. room photo). Falls back to imageUrl. */
  roomImageUrl?: string
  /** If set, detail view shows scrollable gallery with these images (e.g. [plank, room]). Otherwise uses imageUrl + roomImageUrl. */
  galleryImages?: string[]
  /** Optional extra specs shown in detail view (e.g. SKU, plank size, installation). */
  specs?: Array<{ label: string; value: string }>
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
    imageUrl: '/assets/lvp1.png',
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
  {
    id: 'lvp5-floor',
    name: 'Premium Plank',
    description: 'Elegant LVP with natural variation, ideal for living spaces',
    thickness: 8,
    wearLayer: 22,
    color: 'Natural',
    pricePerSqft: 4.25,
    waterproof: true,
    commercial: false,
    imageUrl: '/assets/lvp5.png',
    roomImageUrl: '/assets/lvp5Room.png',
    specs: [
      { label: 'Thickness', value: '8MM' },
      { label: 'SKU', value: 'S801312-H' },
      { label: 'Material Type', value: 'SPC Flooring' },
      { label: 'Plank Size', value: '9″ x 60″' },
      { label: 'Total Thickness', value: '(6.5 + 1.5)mm' },
      { label: 'Plank Repeat', value: '38.8SF (AB) (EIR)' },
      { label: 'Wear Layer', value: '22mil' },
      { label: 'Installation', value: 'Uniclic/Floating' },
      { label: 'Sqft/box', value: '14.79 sqft/box' },
      { label: 'Pieces/box', value: '4pcs/box' },
    ],
  },
  {
    id: 'arthur',
    name: 'Arthur',
    description: 'Classic Arthur style LVP, versatile for any room',
    thickness: 6,
    wearLayer: 20,
    color: 'Arthur',
    pricePerSqft: 4.0,
    waterproof: true,
    commercial: false,
    imageUrl: '/assets/arthurRoom.png',
    roomImageUrl: '/assets/arthurRoom.png',
    galleryImages: ['/assets/arthur.png', '/assets/arthurRoom.png'],
  },
]
