'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { GalleryCard, GalleryItemData } from './GalleryCard'
import { GalleryLightbox } from './GalleryLightbox'

interface GalleryGridProps {
  items: GalleryItemData[]
  columns?: 2 | 3 | 4
}

export function GalleryGrid({ items, columns = 3 }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleItemClick = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const handleLightboxClose = () => {
    setLightboxOpen(false)
  }

  const handleNavigate = (index: number) => {
    setCurrentIndex(index)
  }

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 text-6xl">📷</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">No items found</h3>
        <p className="text-gray-500">
          Try adjusting your filters or check back later for new content.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => handleItemClick(index)}
              priority={index < 6}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <GalleryLightbox
          items={items}
          currentIndex={currentIndex}
          onClose={handleLightboxClose}
          onNavigate={handleNavigate}
        />
      )}
    </>
  )
}
