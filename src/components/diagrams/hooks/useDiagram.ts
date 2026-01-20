'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

// PERFORMANCE: Dynamic import d3 only when component is used
// This saves ~500KB from the initial bundle
type D3Module = typeof import('d3')
let d3Module: D3Module | null = null

async function loadD3(): Promise<D3Module> {
  if (d3Module) return d3Module
  d3Module = await import('d3')
  return d3Module
}

interface UseDiagramOptions {
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

interface UseDiagramReturn {
  svgRef: React.RefObject<SVGSVGElement | null>
  svg: any | null
  dimensions: {
    width: number
    height: number
    innerWidth: number
    innerHeight: number
    margin: { top: number; right: number; bottom: number; left: number }
  }
  createGroup: (className: string) => any | null
  clear: () => void
  isLoading: boolean
}

export function useDiagram({
  width,
  height,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
}: UseDiagramOptions): UseDiagramReturn {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [d3, setD3] = useState<D3Module | null>(d3Module)
  const [isLoading, setIsLoading] = useState(!d3Module)

  // Load d3 dynamically on mount
  useEffect(() => {
    let isMounted = true

    const init = async () => {
      const d3Lib = await loadD3()
      if (isMounted) {
        setD3(d3Lib)
        setIsLoading(false)
      }
    }

    init()

    return () => {
      isMounted = false
    }
  }, [])

  const getSvg = useCallback(() => {
    if (!svgRef.current || !d3) return null
    return d3.select(svgRef.current)
  }, [d3])

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
    isLoading,
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
