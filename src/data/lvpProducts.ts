/**
 * Catálogo LVP estático – imagens da pasta SK Flooring.
 * Galeria: imagem "Plank" de cada pasta. Descrição: Room primeiro, depois a outra imagem.
 */

const SK_BASE = '/assets/SK Flooring'

function skProduct(
  folderName: string,
  plankFileName: string,
  roomFileName: string,
  sampleFileName: string,
  overrides: Partial<{
    id: string
    name: string
    description: string
    color: string
    thickness: number
    wearLayer: number
    pricePerSqft: number
  }> = {}
) {
  const base = `${SK_BASE}/${folderName}`
  const name = folderName
  const id = folderName.toLowerCase().replace(/\s+/g, '-')
  return {
    id: overrides.id ?? id,
    name: overrides.name ?? name,
    description: overrides.description ?? `${name} LVP from SK Flooring`,
    thickness: overrides.thickness ?? 8,
    wearLayer: overrides.wearLayer ?? 20,
    color: overrides.color ?? name,
    pricePerSqft: overrides.pricePerSqft ?? 4.0,
    waterproof: true,
    commercial: false,
    imageUrl: `${base}/${plankFileName}`,
    gallerySlides: [
      { src: `${base}/${roomFileName}`, label: `Room with ${name} installed` },
      { src: `${base}/${sampleFileName}`, label: `${name} LVP Sample` },
    ],
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
  }
}

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
  roomImageUrl?: string
  galleryImages?: string[]
  gallerySlides?: Array<{ src: string; label: string }>
  specs?: Array<{ label: string; value: string }>
}

export const LVP_PRODUCTS: LVPProduct[] = [
  skProduct('Arthur', 'Arthur - Plank.png', 'Arthur - Room.png', 'Arthur.png'),
  skProduct('Buchanan', 'Buchanan - Plank.png', 'Buchanan - Room.png', 'Buchanan.png'),
  skProduct('Coolidge', 'Coolidge - Plank.png', 'Coolidge - Room.png', 'Coolidge.png'),
  skProduct('Eisenhower', 'Eisenhower - Plank.png', 'Eisenhower - Room.png', 'Eisenhower.png'),
  skProduct('Hayes', 'Hayes - Plank.png', 'Hayes - Room.png', 'Hayes.png'),
  skProduct('Monroe', 'Monroe - Plank.png', 'Monroe - Room.png', 'Monroe.png'),
  skProduct('Roosevelt', 'Roosevelt-Plank.png', 'Roosevelt - Room.png', 'Roosevelt.png'),
  skProduct('Vanburen', 'Vanburen-Plank.png', 'Vanburen - Room.png', 'Vanburen.png'),
]
