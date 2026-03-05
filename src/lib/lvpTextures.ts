/**
 * LVP texture entries for 3D showroom.
 * texture = image path used on the plane (repeat).
 * thumbnail = same or path for selector thumbnails.
 * Optional: add oak-light.jpg, oak-natural.jpg, walnut-dark.jpg, gray-modern.jpg to public/lvp/ and use /lvp/ paths.
 */

export type LVPFloorOption = {
  id: string
  name: string
  texture: string
  thumbnail: string
  productId?: string
}

export const LVP_FLOORS: LVPFloorOption[] = [
  { id: 'oak-light', name: 'Oak Light', texture: '/assets/lvp1.png', thumbnail: '/assets/lvp1.png', productId: 'classic-oak' },
  { id: 'walnut', name: 'Natural Walnut', texture: '/assets/lvp2.png', thumbnail: '/assets/lvp2.png', productId: 'natural-walnut' },
  { id: 'gray', name: 'Slate Gray', texture: '/assets/lvp1.png', thumbnail: '/assets/lvp1.png', productId: 'slate-gray' },
  { id: 'premium', name: 'Premium Plank', texture: '/assets/lvp5.png', thumbnail: '/assets/lvp5.png', productId: 'lvp5-floor' },
  { id: 'arthur', name: 'Arthur', texture: '/assets/arthurPlank.png', thumbnail: '/assets/arthurPlank.png', productId: 'arthur' },
]

export const DEFAULT_LVP_TEXTURE = LVP_FLOORS[0].texture
