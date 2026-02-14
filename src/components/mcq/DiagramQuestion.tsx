'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ZoomIn, ZoomOut, X, Maximize2 } from 'lucide-react'
import type { QuestionDiagram } from '@/lib/mcq/types'

interface DiagramQuestionProps {
  diagram: QuestionDiagram
  className?: string
}

export function DiagramQuestion({ diagram, className = '' }: DiagramQuestionProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  const { diagram: diagramData, position, caption, markedLabel, highlightedParts } = diagram

  // Get the image source - prefer fileUrl, fall back to svgContent as data URI
  const imageSrc =
    diagramData.fileUrl ||
    (diagramData.svgContent
      ? `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(diagramData.svgContent)))}`
      : null)

  if (!imageSrc) {
    return null
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
  }

  const positionClasses = {
    above: 'mb-4',
    below: 'mt-4',
    inline: 'my-2',
    side: 'float-right ml-4 mb-2 w-1/2',
  }

  return (
    <>
      {/* Main Diagram Container */}
      <div className={`${positionClasses[position]} ${className}`}>
        <div className="relative bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
          {/* Diagram Image */}
          <div className="relative cursor-pointer group" onClick={() => setIsZoomed(true)}>
            <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
              <Image
                src={imageSrc}
                alt={diagramData.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Marked Label Indicator */}
              {markedLabel && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                  Find: {markedLabel}
                </div>
              )}

              {/* Zoom Hint Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-3 py-1.5 rounded-full text-sm text-gray-700 flex items-center gap-1.5 shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                  Click to enlarge
                </div>
              </div>
            </div>
          </div>

          {/* Caption & Highlighted Parts */}
          {(caption || (highlightedParts && highlightedParts.length > 0)) && (
            <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
              {caption && <p className="text-sm text-gray-600 text-center">{caption}</p>}
              {highlightedParts && highlightedParts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center mt-1">
                  {highlightedParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full border border-yellow-200"
                    >
                      {part}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Labeled Parts Legend (if available and no markedLabel) */}
          {diagramData.labeledParts && diagramData.labeledParts.length > 0 && !markedLabel && (
            <div className="px-4 py-2 bg-blue-50 border-t border-blue-200">
              <p className="text-xs text-blue-600 font-medium mb-1">Labeled Parts:</p>
              <div className="flex flex-wrap gap-1.5">
                {diagramData.labeledParts.slice(0, 6).map((part, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-white text-blue-700 text-xs rounded border border-blue-200"
                  >
                    {part.label}: {part.name}
                  </span>
                ))}
                {diagramData.labeledParts.length > 6 && (
                  <span className="px-2 py-0.5 text-blue-500 text-xs">
                    +{diagramData.labeledParts.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setIsZoomed(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleZoomOut()
              }}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              disabled={zoomLevel <= 0.5}
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5 text-white" />
            </button>
            <span className="text-white text-sm font-medium min-w-[3rem] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleZoomIn()
              }}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              disabled={zoomLevel >= 3}
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Zoomed Image Container */}
          <div
            className="relative max-w-[90vw] max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease-out',
              }}
            >
              <Image
                src={imageSrc}
                alt={diagramData.name}
                width={800}
                height={600}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Diagram Name */}
          <div className="absolute top-4 left-4 text-white">
            <p className="text-lg font-medium">{diagramData.name}</p>
            {caption && <p className="text-sm text-white/70">{caption}</p>}
          </div>

          {/* Marked Label Indicator in Zoom Mode */}
          {markedLabel && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              Identify the part labeled: {markedLabel}
            </div>
          )}
        </div>
      )}
    </>
  )
}

// Export a simple diagram display for non-interactive use
export function DiagramDisplay({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`relative bg-gray-50 rounded-lg overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={400}
        height={300}
        className="object-contain w-full h-auto"
      />
    </div>
  )
}
