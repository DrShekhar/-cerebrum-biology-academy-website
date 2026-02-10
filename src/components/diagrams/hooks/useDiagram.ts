'use client'

import { useRef, useCallback } from 'react'

// NOTE: d3 dependency removed - diagram components use plain SVG + React/Framer Motion
// The useDiagram hook provides SVG ref management, dimensions, and color palette

interface UseDiagramOptions {
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

interface UseDiagramReturn {
  svgRef: React.RefObject<SVGSVGElement | null>
  dimensions: {
    width: number
    height: number
    innerWidth: number
    innerHeight: number
    margin: { top: number; right: number; bottom: number; left: number }
  }
  clear: () => void
}

export function useDiagram({
  width,
  height,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
}: UseDiagramOptions): UseDiagramReturn {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const clear = useCallback(() => {
    if (svgRef.current) {
      while (svgRef.current.firstChild) {
        svgRef.current.removeChild(svgRef.current.firstChild)
      }
    }
  }, [])

  const dimensions = {
    width,
    height,
    innerWidth: width - margin.left - margin.right,
    innerHeight: height - margin.top - margin.bottom,
    margin,
  }

  return {
    svgRef,
    dimensions,
    clear,
  }
}

// Color palette for biology diagrams (NCERT-style)
export const biologyColors = {
  // Cell components
  cellWall: '#8B7355',
  cellMembrane: '#DEB887',
  cytoplasm: '#FFF8DC',
  nucleus: '#4169E1',
  vacuole: '#E6E6FA',
  chloroplast: '#228B22',
  mitochondria: '#FF6347',

  // Tissue types
  epidermis: '#F5DEB3',
  cortex: '#90EE90',
  endodermis: '#DDA0DD',
  pericycle: '#FFA07A',
  xylem: '#CD5C5C',
  phloem: '#98FB98',
  pith: '#FFFACD',
  vascularBundle: '#87CEEB',

  // Meristem regions
  rootCap: '#D2691E',
  quiescentCenter: '#FFD700',
  procambium: '#20B2AA',
  groundMeristem: '#98FB98',
  protoderm: '#F0E68C',

  // Sclerenchyma/Collenchyma
  thickenedWall: '#8B4513',
  lumen: '#FFFFFF',
  pits: '#A0522D',
  corners: '#6B8E23',

  // Labels and lines
  labelText: '#1a1a1a',
  leaderLine: '#666666',
  highlight: '#FF4500',
  background: '#FAFAFA',
}

// Standard label styles
export const labelStyles = {
  fontSize: 12,
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontWeight: 500,
}
