'use client'

import Image from 'next/image'
import type { LVPFloorOption } from '@/lib/lvpTextures'

export interface LVPSelectorProps {
  floors: LVPFloorOption[]
  selectedTexture: string
  onSelect: (textureUrl: string) => void
}

export function LVPSelector({ floors, selectedTexture, onSelect }: LVPSelectorProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {floors.map((floor) => {
        const isSelected = selectedTexture === floor.texture
        return (
          <button
            key={floor.id}
            type="button"
            onClick={() => onSelect(floor.texture)}
            className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-24 ${
              isSelected
                ? 'border-amber-500 ring-2 ring-amber-500/50'
                : 'border-neutral-600 hover:border-neutral-500'
            }`}
            aria-label={`Select ${floor.name}`}
            aria-pressed={isSelected}
          >
            <span className="absolute inset-0">
              <Image
                src={floor.thumbnail}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            </span>
            <span className="absolute bottom-0 left-0 right-0 bg-black/70 py-0.5 text-center text-xs font-medium text-white">
              {floor.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
