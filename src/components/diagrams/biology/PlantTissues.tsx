'use client'

import { useState } from 'react'
import { DiagramContainer } from '../shared/DiagramContainer'
import { DiagramLabel } from '../shared/DiagramLabel'
import { biologyColors } from '../hooks/useDiagram'

interface PlantTissuesProps {
  width?: number
  height?: number
  interactive?: boolean
  showLabels?: boolean
  className?: string
}

const TISSUE_INFO = {
  collenchyma: {
    name: 'Collenchyma',
    description: 'Living cells with unevenly thickened walls, provides flexible support',
    features: ['Living at maturity', 'Thickened corners', 'Found in growing parts'],
  },
  sclerenchymaFiber: {
    name: 'Sclerenchyma Fiber',
    description: 'Long, narrow cells with uniformly thick walls, provides rigid support',
    features: ['Dead at maturity', 'Lignified walls', 'Elongated shape'],
  },
  sclerenchymaSclereid: {
    name: 'Sclereid (Stone Cell)',
    description: 'Isodiametric cells with thick walls and pits, found in hard parts',
    features: ['Dead at maturity', 'Thick secondary wall', 'Numerous pits'],
  },
}

export function PlantTissues({
  width = 800,
  height = 450,
  interactive = true,
  showLabels = true,
  className = '',
}: PlantTissuesProps) {
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null)
  const [selectedTissue, setSelectedTissue] = useState<string | null>(null)

  const cellWidth = 200
  const cellHeight = 280
  const gap = 60
  const startX = (width - (cellWidth * 3 + gap * 2)) / 2
  const startY = 60

  return (
    <DiagramContainer
      title="Simple Permanent Tissues - Sclerenchyma & Collenchyma"
      subtitle="Comparison of cell types providing mechanical support"
      className={className}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
        <defs>
          <pattern id="pits" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="2" fill={biologyColors.pits} />
          </pattern>
        </defs>

        {/* Collenchyma Cell */}
        <motion.g
          className="collenchyma"
        >
          <text
            x={startX + cellWidth / 2}
            y={startY - 15}
            textAnchor="middle"
            fontSize={16}
            fontWeight="bold"
            fill={biologyColors.labelText}
          >
            Collenchyma
          </text>

          {/* Outer cell boundary */}
          <rect
            x={startX}
            y={startY}
            width={cellWidth}
            height={cellHeight}
            fill={biologyColors.cytoplasm}
            stroke="#888"
            strokeWidth={2}
            rx={8}
            opacity={highlightedPart === 'collenchyma' ? 1 : 0.95}
            onClick={() => interactive && setSelectedTissue('collenchyma')}
            onMouseEnter={() => interactive && setHighlightedPart('collenchyma')}
            onMouseLeave={() => interactive && setHighlightedPart(null)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          />

          {/* Thickened corners (characteristic of collenchyma) */}
          {[
            { x: startX, y: startY },
            { x: startX + cellWidth - 30, y: startY },
            { x: startX, y: startY + cellHeight - 30 },
            { x: startX + cellWidth - 30, y: startY + cellHeight - 30 },
          ].map((pos, i) => (
            <motion.rect
              key={`corner-${i}`}
              x={pos.x}
              y={pos.y}
              width={30}
              height={30}
              fill={biologyColors.corners}
              rx={i < 2 ? 8 : 0}
            />
          ))}

          {/* Vacuole */}
          <motion.ellipse
            cx={startX + cellWidth / 2}
            cy={startY + cellHeight / 2 + 20}
            rx={70}
            ry={80}
            fill={biologyColors.vacuole}
            stroke="#ccc"
            strokeWidth={1}
          />

          {/* Nucleus */}
          <motion.circle
            cx={startX + cellWidth / 2 - 40}
            cy={startY + 60}
            r={25}
            fill={biologyColors.nucleus}
          />
          <circle cx={startX + cellWidth / 2 - 35} cy={startY + 55} r={8} fill="#2a4a8a" />

          {/* Cytoplasm thin layer */}
          <path
            d={`M ${startX + 35} ${startY + cellHeight - 40}
                Q ${startX + cellWidth / 2} ${startY + cellHeight - 60}
                ${startX + cellWidth - 35} ${startY + cellHeight - 40}`}
            fill="none"
            stroke={biologyColors.cellMembrane}
            strokeWidth={2}
            strokeDasharray="4,2"
          />

          {showLabels && (
            <>
              <DiagramLabel
                text="Thickened corners"
                position={{ x: startX - 10, y: startY + 30 }}
                anchor={{ x: startX + 15, y: startY + 15 }}
                side="left"
                fontSize={10}
              />
              <DiagramLabel
                text="Vacuole"
                position={{ x: startX + cellWidth + 10, y: startY + cellHeight / 2 + 20 }}
                anchor={{ x: startX + cellWidth / 2 + 60, y: startY + cellHeight / 2 + 20 }}
                side="right"
                fontSize={10}
              />
              <DiagramLabel
                text="Nucleus"
                position={{ x: startX - 10, y: startY + 60 }}
                anchor={{ x: startX + cellWidth / 2 - 60, y: startY + 60 }}
                side="left"
                fontSize={10}
              />
              <DiagramLabel
                text="Cell wall"
                position={{ x: startX + cellWidth + 10, y: startY + 100 }}
                anchor={{ x: startX + cellWidth, y: startY + 100 }}
                side="right"
                fontSize={10}
              />
            </>
          )}
        </motion.g>

        {/* Sclerenchyma Fiber */}
        <motion.g
          className="sclerenchyma-fiber"
        >
          <text
            x={startX + cellWidth + gap + cellWidth / 2}
            y={startY - 15}
            textAnchor="middle"
            fontSize={16}
            fontWeight="bold"
            fill={biologyColors.labelText}
          >
            Sclerenchyma (Fiber)
          </text>

          {/* Thick cell wall */}
          <rect
            x={startX + cellWidth + gap}
            y={startY}
            width={cellWidth}
            height={cellHeight}
            fill={biologyColors.thickenedWall}
            stroke="#5a3a1a"
            strokeWidth={3}
            rx={4}
            opacity={highlightedPart === 'fiber' ? 1 : 0.95}
            onClick={() => interactive && setSelectedTissue('sclerenchymaFiber')}
            onMouseEnter={() => interactive && setHighlightedPart('fiber')}
            onMouseLeave={() => interactive && setHighlightedPart(null)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          />

          {/* Narrow lumen (characteristic of fiber - elongated) */}
          <motion.rect
            x={startX + cellWidth + gap + 70}
            y={startY + 20}
            width={60}
            height={cellHeight - 40}
            fill={biologyColors.lumen}
            rx={4}
            style={{ transformOrigin: 'center top' }}
          />

          {/* Simple pits */}
          {[40, 100, 160, 220].map((yOffset, i) => (
            <motion.g key={`pit-fiber-${i}`}>
              <line
                x1={startX + cellWidth + gap + 55}
                y1={startY + yOffset}
                x2={startX + cellWidth + gap + 70}
                y2={startY + yOffset}
                stroke={biologyColors.pits}
                strokeWidth={2}
              />
              <line
                x1={startX + cellWidth + gap + cellWidth - 55}
                y1={startY + yOffset}
                x2={startX + cellWidth + gap + cellWidth - 70}
                y2={startY + yOffset}
                stroke={biologyColors.pits}
                strokeWidth={2}
              />
            </motion.g>
          ))}

          {showLabels && (
            <>
              <DiagramLabel
                text="Thick secondary wall"
                position={{ x: startX + cellWidth + gap - 10, y: startY + 50 }}
                anchor={{ x: startX + cellWidth + gap + 30, y: startY + 50 }}
                side="left"
                fontSize={10}
              />
              <DiagramLabel
                text="Narrow lumen"
                position={{ x: startX + cellWidth * 2 + gap + 10, y: startY + cellHeight / 2 }}
                anchor={{ x: startX + cellWidth + gap + 130, y: startY + cellHeight / 2 }}
                side="right"
                fontSize={10}
              />
              <DiagramLabel
                text="Pits"
                position={{ x: startX + cellWidth + gap - 10, y: startY + 160 }}
                anchor={{ x: startX + cellWidth + gap + 55, y: startY + 160 }}
                side="left"
                fontSize={10}
              />
            </>
          )}
        </motion.g>

        {/* Sclerenchyma Sclereid (Stone Cell) */}
        <motion.g
          className="sclerenchyma-sclereid"
        >
          <text
            x={startX + (cellWidth + gap) * 2 + cellWidth / 2}
            y={startY - 15}
            textAnchor="middle"
            fontSize={16}
            fontWeight="bold"
            fill={biologyColors.labelText}
          >
            Sclereid (Stone Cell)
          </text>

          {/* Isodiametric shape with very thick walls */}
          <rect
            x={startX + (cellWidth + gap) * 2}
            y={startY + 30}
            width={cellWidth}
            height={cellWidth}
            fill={biologyColors.thickenedWall}
            stroke="#5a3a1a"
            strokeWidth={4}
            rx={20}
            opacity={highlightedPart === 'sclereid' ? 1 : 0.95}
            onClick={() => interactive && setSelectedTissue('sclerenchymaSclereid')}
            onMouseEnter={() => interactive && setHighlightedPart('sclereid')}
            onMouseLeave={() => interactive && setHighlightedPart(null)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          />

          {/* Very small lumen */}
          <motion.circle
            cx={startX + (cellWidth + gap) * 2 + cellWidth / 2}
            cy={startY + 30 + cellWidth / 2}
            r={25}
            fill={biologyColors.lumen}
          />

          {/* Multiple branched pits radiating from lumen */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const cx = startX + (cellWidth + gap) * 2 + cellWidth / 2
            const cy = startY + 30 + cellWidth / 2
            const innerR = 25
            const outerR = 85

            return (
              <motion.line
                key={`pit-sclereid-${i}`}
                x1={cx + Math.cos(angle) * innerR}
                y1={cy + Math.sin(angle) * innerR}
                x2={cx + Math.cos(angle) * outerR}
                y2={cy + Math.sin(angle) * outerR}
                stroke={biologyColors.pits}
                strokeWidth={2}
              />
            )
          })}

          {/* Layered wall indication */}
          {[50, 65, 80].map((r, i) => (
            <motion.circle
              key={`layer-${i}`}
              cx={startX + (cellWidth + gap) * 2 + cellWidth / 2}
              cy={startY + 30 + cellWidth / 2}
              r={r}
              fill="none"
              stroke="#6a4a2a"
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.5}
            />
          ))}

          {showLabels && (
            <>
              <DiagramLabel
                text="Very thick wall"
                position={{ x: startX + (cellWidth + gap) * 2 - 10, y: startY + 80 }}
                anchor={{ x: startX + (cellWidth + gap) * 2 + 20, y: startY + 80 }}
                side="left"
                fontSize={10}
              />
              <DiagramLabel
                text="Small lumen"
                position={{
                  x: startX + (cellWidth + gap) * 2 + cellWidth + 10,
                  y: startY + 30 + cellWidth / 2,
                }}
                anchor={{
                  x: startX + (cellWidth + gap) * 2 + cellWidth / 2 + 25,
                  y: startY + 30 + cellWidth / 2,
                }}
                side="right"
                fontSize={10}
              />
              <DiagramLabel
                text="Branched pits"
                position={{ x: startX + (cellWidth + gap) * 2 + cellWidth + 10, y: startY + 180 }}
                anchor={{ x: startX + (cellWidth + gap) * 2 + cellWidth / 2 + 60, y: startY + 130 }}
                side="right"
                fontSize={10}
              />
              <DiagramLabel
                text="Layered secondary wall"
                position={{ x: startX + (cellWidth + gap) * 2 - 10, y: startY + 180 }}
                anchor={{ x: startX + (cellWidth + gap) * 2 + 35, y: startY + 150 }}
                side="left"
                fontSize={10}
              />
            </>
          )}
        </motion.g>
      </svg>

      {/* Info Panel */}
      {selectedTissue && TISSUE_INFO[selectedTissue as keyof typeof TISSUE_INFO] && (
        <div
          className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200 animate-fadeInUp"
        >
          <h4 className="font-bold text-amber-800 mb-2">
            {TISSUE_INFO[selectedTissue as keyof typeof TISSUE_INFO].name}
          </h4>
          <p className="text-sm text-amber-700 mb-2">
            {TISSUE_INFO[selectedTissue as keyof typeof TISSUE_INFO].description}
          </p>
          <ul className="text-xs text-amber-600 list-disc list-inside">
            {TISSUE_INFO[selectedTissue as keyof typeof TISSUE_INFO].features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}
    </DiagramContainer>
  )
}
