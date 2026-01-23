'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, Star } from 'lucide-react'

export interface GalleryItemData {
  id: string
  type: 'PHOTO' | 'VIDEO'
  title: string
  description: string | null
  category: string
  tags: string[]
  featured: boolean
  eventDate: string | null
  url: string
  thumbnailUrl: string | null
  blurHash: string | null
  aspectRatio: string
  width: number | null
  height: number | null
  durationSeconds: number | null
  srcSet?: string
  sizes?: string
  blurDataUrl?: string
}

interface GalleryCardProps {
  item: GalleryItemData
  onClick: () => void
  priority?: boolean
}

export function GalleryCard({ item, onClick, priority = false }: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const aspectRatio = item.aspectRatio || '4:3'
  const [w, h] = aspectRatio.split(':').map(Number)
  const paddingBottom = `${(h / w) * 100}%`

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ paddingBottom }}>
        {/* Blur Placeholder */}
        {!isLoaded && !hasError && item.blurDataUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.blurDataUrl})`, filter: 'blur(20px)' }}
          />
        )}

        {/* Loading Skeleton */}
        {!isLoaded && !hasError && !item.blurDataUrl && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300" />
        )}

        {/* Main Image */}
        {item.thumbnailUrl && !hasError ? (
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            sizes={item.sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image</span>
          </div>
        )}

        {/* Video Play Indicator */}
        {item.type === 'VIDEO' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/60 p-4 backdrop-blur-sm transition-transform group-hover:scale-110">
              <Play className="h-8 w-8 text-white" fill="currentColor" />
            </div>
            {/* Duration Badge */}
            {item.durationSeconds && (
              <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                {formatDuration(item.durationSeconds)}
              </div>
            )}
          </div>
        )}

        {/* Featured Badge */}
        {item.featured && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-white shadow-lg">
            <Star className="h-3 w-3" fill="currentColor" />
            Featured
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="truncate font-semibold text-gray-900 group-hover:text-[#4a5d4a]">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">{item.description}</p>
        )}
        {item.eventDate && (
          <p className="mt-1 text-xs text-gray-400">
            {new Date(item.eventDate).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
    </motion.div>
  )
}
