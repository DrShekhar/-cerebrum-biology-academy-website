'use client'

import { useState } from 'react'
import { DiagramContainer } from '../shared/DiagramContainer'
import { DiagramLabel } from '../shared/DiagramLabel'
import { biologyColors } from '../hooks/useDiagram'

interface StemCrossSectionProps {
  width?: number
  height?: number
  interactive?: boolean
  showLabels?: boolean
  stemType?: 'dicot' | 'monocot' | 'both'
  className?: string
}

const STEM_INFO = {
  dicot: {
    epidermis: 'Single layer of cells with cuticle',
    hypodermis: 'Collenchymatous, provides flexible support',
    cortex: 'Parenchymatous cells for storage',
    endodermis: 'Innermost layer of cortex with starch sheath',
    pericycle: 'Semi-lunar patches of sclerenchyma',
    vascularBundle: 'Arranged in a ring, open type with cambium',
    pith: 'Central region of parenchyma cells',
  },
  monocot: {
    epidermis: 'Single layer with thick cuticle',
    hypodermis: 'Sclerenchymatous, provides rigid support',
    groundTissue: 'No differentiation into cortex and pith',
    vascularBundle: 'Scattered throughout, closed type (no cambium)',
  },
}

export function StemCrossSection({
  width = 900,
  height = 500,
  interactive = true,
  showLabels = true,
  stemType = 'both',
  className = '',
}: StemCrossSectionProps) {
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null)
  const [selectedPart, setSelectedPart] = useState<{ type: string; part: string } | null>(null)

  const diagramWidth = stemType === 'both' ? 380 : 500
  const gap = 80
  const dicotX = stemType === 'both' ? 60 : (width - diagramWidth) / 2
  const monocotX = stemType === 'both' ? dicotX + diagramWidth + gap : (width - diagramWidth) / 2

  const centerY = height / 2 + 20
  const radius = diagramWidth / 2 - 20

  const renderDicotStem = (cx: number, cy: number, r: number) => {
    const vascularBundleCount = 8
    const vbRadius = r * 0.6
    const vbSize = 25

    return (
      <g
        className="dicot-stem"
      >
        {/* Title */}
        <text
          x={cx}
          y={30}
          textAnchor="middle"
          fontSize={18}
          fontWeight="bold"
          fill={biologyColors.labelText}
        >
          Dicot Stem (T.S.)
        </text>

        {/* Epidermis (outermost) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={biologyColors.epidermis}
          strokeWidth={6}
          opacity={highlightedPart === 'dicot-epidermis' ? 1 : 0.9}
          onMouseEnter={() => interactive && setHighlightedPart('dicot-epidermis')}
          onMouseLeave={() => interactive && setHighlightedPart(null)}
          onClick={() => interactive && setSelectedPart({ type: 'dicot', part: 'epidermis' })}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        />

        {/* Hypodermis */}
        <circle
          cx={cx}
          cy={cy}
          r={r - 8}
          fill="none"
          stroke={biologyColors.cortex}
          strokeWidth={12}
          opacity={highlightedPart === 'dicot-hypodermis' ? 1 : 0.8}
          onMouseEnter={() => interactive && setHighlightedPart('dicot-hypodermis')}
          onMouseLeave={() => interactive && setHighlightedPart(null)}
          onClick={() => interactive && setSelectedPart({ type: 'dicot', part: 'hypodermis' })}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        />

        {/* Cortex */}
        <circle
          cx={cx}
          cy={cy}
          r={r - 25}
          fill={biologyColors.cortex}
          stroke="#aaa"
          strokeWidth={1}
          opacity={highlightedPart === 'dicot-cortex' ? 1 : 0.9}
          onMouseEnter={() => interactive && setHighlightedPart('dicot-cortex')}
          onMouseLeave={() => interactive && setHighlightedPart(null)}
          onClick={() => interactive && setSelectedPart({ type: 'dicot', part: 'cortex' })}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        />

        {/* Endodermis ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r * 0.68}
          fill="none"
          stroke={biologyColors.endodermis}
          strokeWidth={4}
          strokeDasharray="8,4"
          opacity={highlightedPart === 'dicot-endodermis' ? 1 : 0.8}
        />

        {/* Pith (center) */}
        <circle
          cx={cx}
          cy={cy}
          r={r * 0.4}
          fill={biologyColors.pith}
          stroke="#ccc"
          strokeWidth={1}
          opacity={highlightedPart === 'dicot-pith' ? 1 : 0.9}
          onMouseEnter={() => interactive && setHighlightedPart('dicot-pith')}
          onMouseLeave={() => interactive && setHighlightedPart(null)}
          onClick={() => interactive && setSelectedPart({ type: 'dicot', part: 'pith' })}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        />

        {/* Vascular bundles in a ring */}
        {Array.from({ length: vascularBundleCount }).map((_, i) => {
          const angle = ((i * 360) / vascularBundleCount - 90) * (Math.PI / 180)
          const vbX = cx + Math.cos(angle) * vbRadius
          const vbY = cy + Math.sin(angle) * vbRadius

          return (
            <g
              key={`vb-dicot-${i}`}
            >
              {/* Bundle sheath / Pericycle patch */}
              <ellipse
                cx={vbX}
                cy={vbY}
                rx={vbSize + 5}
                ry={vbSize + 8}
                fill={biologyColors.pericycle}
                opacity={0.5}
              />

              {/* Vascular bundle */}
              <ellipse
                cx={vbX}
                cy={vbY}
                rx={vbSize}
                ry={vbSize + 3}
                fill={biologyColors.vascularBundle}
                stroke="#666"
                strokeWidth={1}
                opacity={highlightedPart === 'dicot-vascular' ? 1 : 0.9}
                onMouseEnter={() => interactive && setHighlightedPart('dicot-vascular')}
                onMouseLeave={() => interactive && setHighlightedPart(null)}
                onClick={() =>
                  interactive && setSelectedPart({ type: 'dicot', part: 'vascularBundle' })
                }
                style={{ cursor: interactive ? 'pointer' : 'default' }}
              />

              {/* Xylem (inner, towards center) */}
              <circle
                cx={vbX + Math.cos(angle) * 8}
                cy={vbY + Math.sin(angle) * 8}
                r={8}
                fill={biologyColors.xylem}
              />
              <circle
                cx={vbX + Math.cos(angle) * 5}
                cy={vbY + Math.sin(angle) * 5}
                r={5}
                fill={biologyColors.xylem}
              />

              {/* Phloem (outer, towards periphery) */}
              <circle
                cx={vbX - Math.cos(angle) * 10}
                cy={vbY - Math.sin(angle) * 10}
                r={6}
                fill={biologyColors.phloem}
              />
              <circle
                cx={vbX - Math.cos(angle) * 8 + 5}
                cy={vbY - Math.sin(angle) * 8}
                r={4}
                fill={biologyColors.phloem}
              />
            </g>
          )
        })}

        {/* Labels */}
        {showLabels && (
          <>
            <DiagramLabel
              text="Epidermis"
              position={{ x: cx + r + 15, y: cy - r + 30 }}
              anchor={{ x: cx + r - 3, y: cy - r + 50 }}
              side="right"
              fontSize={10}
              isHighlighted={highlightedPart === 'dicot-epidermis'}
            />
            <DiagramLabel
              text="Cortex"
              position={{ x: cx + r + 15, y: cy - 40 }}
              anchor={{ x: cx + r - 30, y: cy - 40 }}
              side="right"
              fontSize={10}
              isHighlighted={highlightedPart === 'dicot-cortex'}
            />
            <DiagramLabel
              text="Vascular Bundle"
              position={{ x: cx + r + 15, y: cy + 20 }}
              anchor={{ x: cx + r * 0.6 + 25, y: cy }}
              side="right"
              fontSize={10}
              isHighlighted={highlightedPart === 'dicot-vascular'}
            />
            <DiagramLabel
              text="Pith"
              position={{ x: cx + r + 15, y: cy + 80 }}
              anchor={{ x: cx + r * 0.35, y: cy + 20 }}
              side="right"
              fontSize={10}
              isHighlighted={highlightedPart === 'dicot-pith'}
            />
            <DiagramLabel
              text="Endodermis"
              position={{ x: cx - r - 15, y: cy - 60 }}
              anchor={{ x: cx - r * 0.65, y: cy - 30 }}
              side="left"
              fontSize={10}
            />
            <DiagramLabel
              text="Phloem"
              position={{ x: cx - r - 15, y: cy }}
              anchor={{ x: cx - r * 0.6 - 15, y: cy + 10 }}
              side="left"
              fontSize={10}
            />
            <DiagramLabel
              text="Xylem"
              position={{ x: cx - r - 15, y: cy + 40 }}
              anchor={{ x: cx - r * 0.6 + 5, y: cy + 5 }}
              side="left"
              fontSize={10}
            />
          </>
        )}
      </g>
    )
  }

  const renderMonocotStem = (cx: number, cy: number, r: number) => {
    const vascularBundlePositions = [
      { x: 0, y: 0, size: 18 },
      { x: 0.3, y: -0.35, size: 16 },
      { x: -0.35, y: -0.25, size: 14 },
      { x: 0.4, y: 0.2, size: 15 },
      { x: -0.3, y: 0.35, size: 16 },
      { x: 0.15, y: 0.45, size: 14 },
      { x: -0.15, y: -0.5, size: 13 },
      { x: 0.5, y: -0.1, size: 14 },
      { x: -0.5, y: 0.05, size: 15 },
      { x: 0.25, y: -0.55, size: 12 },
      { x: -0.45, y: -0.4, size: 13 },
      { x: 0.55, y: 0.35, size: 12 },
      { x: -0.2, y: 0.55, size: 13 },
      { x: 0.6, y: -0.35, size: 11 },
      { x: -0.6, y: 0.3, size: 12 },
    ]

    return (
      <g
        className="monocot-stem"
      >
        {/* Title */}
        <text
          x={cx}
          y={30}
          textAnchor="middle"
          fontSize={18}
          fontWeight="bold"
          fill={biologyColors.labelText}
        >
          Monocot Stem (T.S.)
        </text>

        {/* Epidermis (outermost) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={biologyColors.epidermis}
          strokeWidth={6}
          opacity={highlightedPart === 'monocot-epidermis' ? 1 : 0.9}
          onMouseEnter={() => interactive && setHighlightedPart('monocot-epidermis')}
          onMouseLeave={() => interactive && setHighlightedPart(null)}
          onClick={() => interactive && setSelectedPart({ type: 'monocot', part: 'epidermis' })}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        />

        {/* Hypodermis (sclerenchymatous in monocot) */}
        <circle
          cx={cx}
          cy={cy}
          r={r - 8}
          fill="none"
          stroke={biologyColors.thickenedWall}
          strokeWidth={10}
          opacity={highlightedPart === 'monocot-hypodermis' ? 1 : 0.7}
          onMouseEnter={() => interactive && setHighlightedPart('monocot-hypodermis')}
          onMouseLeave={() => interactive && setHighlightedPart(null)}
          onClick={() => interactive && setSelectedPart({ type: 'monocot', part: 'hypodermis' })}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        />

        {/* Ground tissue (no distinct cortex/pith) */}
        <circle
          cx={cx}
          cy={cy}
          r={r - 20}
          fill={biologyColors.groundMeristem}
          stroke="#aaa"
          strokeWidth={1}
          opacity={highlightedPart === 'monocot-ground' ? 1 : 0.9}
          onMouseEnter={() => interactive && setHighlightedPart('monocot-ground')}
          onMouseLeave={() => interactive && setHighlightedPart(null)}
          onClick={() => interactive && setSelectedPart({ type: 'monocot', part: 'groundTissue' })}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        />

        {/* Scattered vascular bundles */}
        {vascularBundlePositions.map((pos, i) => {
          const vbX = cx + pos.x * r * 0.75
          const vbY = cy + pos.y * r * 0.75

          return (
            <g
              key={`vb-monocot-${i}`}
            >
              {/* Bundle sheath */}
              <circle
                cx={vbX}
                cy={vbY}
                r={pos.size + 4}
                fill={biologyColors.pericycle}
                opacity={0.4}
              />

              {/* Vascular bundle */}
              <circle
                cx={vbX}
                cy={vbY}
                r={pos.size}
                fill={biologyColors.vascularBundle}
                stroke="#666"
                strokeWidth={1}
                opacity={highlightedPart === 'monocot-vascular' ? 1 : 0.9}
                onMouseEnter={() => interactive && setHighlightedPart('monocot-vascular')}
                onMouseLeave={() => interactive && setHighlightedPart(null)}
                onClick={() =>
                  interactive && setSelectedPart({ type: 'monocot', part: 'vascularBundle' })
                }
                style={{ cursor: interactive ? 'pointer' : 'default' }}
              />

              {/* Xylem vessels (Y-shaped pattern) */}
              <circle
                cx={vbX}
                cy={vbY + pos.size * 0.3}
                r={pos.size * 0.25}
                fill={biologyColors.xylem}
              />
              <circle
                cx={vbX - pos.size * 0.25}
                cy={vbY - pos.size * 0.1}
                r={pos.size * 0.18}
                fill={biologyColors.xylem}
              />
              <circle
                cx={vbX + pos.size * 0.25}
                cy={vbY - pos.size * 0.1}
                r={pos.size * 0.15}
                fill={biologyColors.xylem}
              />

              {/* Phloem */}
              <circle
                cx={vbX}
                cy={vbY - pos.size * 0.4}
                r={pos.size * 0.2}
                fill={biologyColors.phloem}
              />
            </g>
          )
        })}

        {/* Labels */}
        {showLabels && (
          <>
            <DiagramLabel
              text="Epidermis"
              position={{ x: cx + r + 15, y: cy - r + 30 }}
              anchor={{ x: cx + r - 3, y: cy - r + 50 }}
              side="right"
              fontSize={10}
              isHighlighted={highlightedPart === 'monocot-epidermis'}
            />
            <DiagramLabel
              text="Hypodermis (Sclerenchymatous)"
              position={{ x: cx + r + 15, y: cy - 60 }}
              anchor={{ x: cx + r - 15, y: cy - 60 }}
              side="right"
              fontSize={10}
              isHighlighted={highlightedPart === 'monocot-hypodermis'}
            />
            <DiagramLabel
              text="Ground Tissue"
              position={{ x: cx + r + 15, y: cy }}
              anchor={{ x: cx + r - 40, y: cy }}
              side="right"
              fontSize={10}
              isHighlighted={highlightedPart === 'monocot-ground'}
            />
            <DiagramLabel
              text="Scattered Vascular Bundles"
              position={{ x: cx + r + 15, y: cy + 60 }}
              anchor={{ x: cx + r * 0.5, y: cy + 30 }}
              side="right"
              fontSize={10}
              isHighlighted={highlightedPart === 'monocot-vascular'}
            />
            <DiagramLabel
              text="Bundle Sheath"
              position={{ x: cx - r - 15, y: cy - 40 }}
              anchor={{ x: cx - r * 0.4, y: cy - 60 }}
              side="left"
              fontSize={10}
            />
            <DiagramLabel
              text="Xylem"
              position={{ x: cx - r - 15, y: cy + 20 }}
              anchor={{ x: cx - 20, y: cy + 20 }}
              side="left"
              fontSize={10}
            />
            <DiagramLabel
              text="Phloem"
              position={{ x: cx - r - 15, y: cy + 60 }}
              anchor={{ x: cx - 15, y: cy - 10 }}
              side="left"
              fontSize={10}
            />
          </>
        )}
      </g>
    )
  }

  return (
    <DiagramContainer
      title={`Stem Cross Section - ${stemType === 'both' ? 'Dicot vs Monocot' : stemType === 'dicot' ? 'Dicot' : 'Monocot'}`}
      subtitle="Transverse section showing internal anatomy"
      className={className}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
        {(stemType === 'both' || stemType === 'dicot') &&
          renderDicotStem(dicotX + diagramWidth / 2, centerY, radius)}
        {(stemType === 'both' || stemType === 'monocot') &&
          renderMonocotStem(monocotX + diagramWidth / 2, centerY, radius)}
      </svg>

      {/* Info Panel */}
      {selectedPart && (
        <div
          className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 animate-fadeInUp"
        >
          <h4 className="font-bold text-green-800 mb-1 capitalize">
            {selectedPart.part.replace(/([A-Z])/g, ' $1').trim()} ({selectedPart.type})
          </h4>
          <p className="text-sm text-green-700">
            {
              STEM_INFO[selectedPart.type as keyof typeof STEM_INFO]?.[
                selectedPart.part as keyof typeof STEM_INFO.dicot
              ]
            }
          </p>
        </div>
      )}
    </DiagramContainer>
  )
}
