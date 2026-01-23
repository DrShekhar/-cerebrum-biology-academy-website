'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Download, Share2, Expand, Minimize } from 'lucide-react'
import { GalleryItemData } from './GalleryCard'

interface GalleryLightboxProps {
  items: GalleryItemData[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const currentItem = items[currentIndex]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') navigatePrev()
      if (e.key === 'ArrowRight') navigateNext()
      if (e.key === 'f') toggleFullscreen()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, items.length])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const navigatePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1)
    }
  }, [currentIndex, onNavigate])

  const navigateNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1)
    }
  }, [currentIndex, items.length, onNavigate])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return

    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateNext()
      } else {
        navigatePrev()
      }
    }

    setTouchStart(null)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentItem.title,
          text: currentItem.description || 'Check out this image from Cerebrum Biology Academy',
          url: window.location.href,
        })
      } catch {
        // User cancelled or error
      }
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = currentItem.url
    link.download = `${currentItem.title.replace(/\s+/g, '-').toLowerCase()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Top Bar */}
        <div className="absolute left-0 right-0 top-0 z-40 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-4">
          <div className="text-white">
            <h2 className="text-lg font-semibold">{currentItem.title}</h2>
            <p className="text-sm text-white/70">
              {currentIndex + 1} of {items.length}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Share"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={handleDownload}
              className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Download"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Expand className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={navigatePrev}
            className="absolute left-4 z-40 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        {currentIndex < items.length - 1 && (
          <button
            onClick={navigateNext}
            className="absolute right-4 z-40 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}

        {/* Main Image */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`relative h-full w-full ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          {currentItem.type === 'VIDEO' ? (
            <div className="flex h-full w-full items-center justify-center p-16">
              <video
                src={currentItem.url}
                controls
                autoPlay
                className="max-h-full max-w-full rounded-lg"
                poster={currentItem.thumbnailUrl || undefined}
              />
            </div>
          ) : (
            <div className="relative h-full w-full p-8 md:p-16">
              <Image
                src={currentItem.url}
                alt={currentItem.title}
                fill
                className={`object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                sizes="100vw"
                priority
              />
            </div>
          )}
        </motion.div>

        {/* Bottom Bar - Description */}
        {currentItem.description && (
          <div className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <p className="mx-auto max-w-2xl text-center text-sm md:text-base">
              {currentItem.description}
            </p>
            {currentItem.eventDate && (
              <p className="mt-2 text-center text-xs text-white/60">
                {new Date(currentItem.eventDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>
        )}

        {/* Thumbnail Strip */}
        <div className="absolute bottom-20 left-0 right-0 z-40 px-4">
          <div className="mx-auto flex max-w-3xl justify-center gap-2 overflow-x-auto py-2">
            {items.map((item, index) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate(index)
                }}
                className={`relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-black'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                {item.thumbnailUrl ? (
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
