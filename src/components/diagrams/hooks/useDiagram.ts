'use client'

import { useRef, useEffect, useCallback } from 'react'
import * as d3 from 'd3'

interface UseDiagramOptions {
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

interface UseDiagramReturn {
  svgRef: React.RefObject<SVGSVGElement | null>
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null
  dimensions: {
    width: number
    height: number
    innerWidth: number
    innerHeight: number
    margin: { top: number; right: number; bottom: number; left: number }
  }
  createGroup: (className: string) => d3.Selection<SVGGElement, unknown, null, undefined> | null
  clear: () => void
}

export function useDiagram({
  width,
  height,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
}: UseDiagramOptions): UseDiagramReturn {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const getSvg = useCallback(() => {
    if (!svgRef.current) return null
    return d3.select(svgRef.current)
  }, [])

  const createGroup = useCallback(
    (className: string) => {
      const svg = getSvg()
      if (!svg) return null

      svg.select(`.${className}`).remove()
      return svg
        .append('g')
        .attr('class', className)
        .attr('transform', `translate(${margin.left},${margin.top})`)
    },
    [getSvg, margin.left, margin.top]
  )

  const clear = useCallback(() => {
    const svg = getSvg()
    if (svg) {
      svg.selectAll('*').remove()
    }
  }, [getSvg])

  const dimensions = {
    width,
    height,
    innerWidth: width - margin.left - margin.right,
    innerHeight: height - margin.top - margin.bottom,
    margin,
  }

  return {
    svgRef,
    svg: getSvg(),
    dimensions,
    createGroup,
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
