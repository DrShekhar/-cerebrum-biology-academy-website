'use client'

import { useState, useEffect } from 'react'
import { Loader2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface PDFViewerProps {
  fileUrl: string
  title: string
}

export default function PDFViewer({ fileUrl, title }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('.pdf-viewer-container')) {
        e.preventDefault()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')
      ) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const toggleFullscreen = () => {
    const container = document.querySelector('.pdf-viewer-container')
    if (!container) return

    if (!document.fullscreenElement) {
      container
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((error) => {
          console.warn('[PDFViewer] Fullscreen request failed:', error)
          setError('Fullscreen mode is not available in your browser')
        })
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((error) => {
          console.warn('[PDFViewer] Exit fullscreen failed:', error)
        })
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const embedUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`

  return (
    <div
      className="pdf-viewer-container relative bg-gray-900 rounded-xl overflow-hidden select-none"
      style={{ userSelect: 'none' }}
    >
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-gray-900/90 to-transparent p-4 flex items-center justify-between">
        <h2 className="text-white font-medium truncate pr-4">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
            title="Toggle fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-5">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-gray-400">Loading PDF...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-5">
          <div className="text-center p-8">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null)
                setIsLoading(true)
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div
        className="w-full"
        style={{
          height: isFullscreen ? '100vh' : '80vh',
          minHeight: '500px',
          pointerEvents: 'auto',
        }}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
      >
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          title={title}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setError('Failed to load PDF. Please try again.')
          }}
          style={{
            pointerEvents: 'auto',
          }}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm text-gray-400 text-xs px-4 py-2 rounded-full">
        PDF viewing only - Downloads disabled
      </div>
    </div>
  )
}
