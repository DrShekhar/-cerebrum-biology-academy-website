'use client'

import { useState } from 'react'
import { DiagramContainer } from '../shared/DiagramContainer'
import { DiagramLabel } from '../shared/DiagramLabel'
import { biologyColors } from '../hooks/useDiagram'

interface RootMeristemProps {
  width?: number
  height?: number
  interactive?: boolean
  showLabels?: boolean
  className?: string
}

const ZONES = [
  {
    id: 'rootCap',
    name: 'Root Cap',
    description: 'Protects the root tip as it grows through soil',
  },
  {
    id: 'quiescentCenter',
    name: 'Quiescent Center',
    description: 'Region of slowly dividing cells that replenishes meristem',
  },
  {
    id: 'protoderm',
    name: 'Protoderm',
    description: 'Gives rise to epidermis (outermost layer)',
  },
  {
    id: 'procambium',
    name: 'Procambium',
    description: 'Develops into vascular tissue (xylem and phloem)',
  },
  {
    id: 'groundMeristem',
    name: 'Ground Meristem',
    description: 'Forms cortex and pith (ground tissue)',
  },
  {
    id: 'centralCylinder',
    name: 'Central Cylinder',
    description: 'Contains vascular tissues surrounded by pericycle',
  },
  {
    id: 'cortex',
    name: 'Cortex',
    description: 'Storage tissue between epidermis and vascular cylinder',
  },
]

export function RootMeristem({
  width = 500,
  height = 600,
  interactive = true,
  showLabels = true,
  className = '',
}: RootMeristemProps) {
  const [highlightedZone, setHighlightedZone] = useState<string | null>(null)
  const [selectedZone, setSelectedZone] = useState<string | null>(null)

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(selectedZone === zoneId ? null : zoneId)
  }

  const getZoneInfo = (zoneId: string) => {
    return ZONES.find((z) => z.id === zoneId)
  }

  const cx = width / 2
  const baseY = 100

  return (
    <DiagramContainer
      title="Root Apical Meristem (L.S.)"
      subtitle="Longitudinal Section showing meristematic zones"
      className={className}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
        <defs>
          <linearGradient id="rootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={biologyColors.cortex} />
            <stop offset="100%" stopColor={biologyColors.groundMeristem} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        <g
          className="root-meristem"
        >
          {/* Main root body - outer layer (Epidermis/Cortex) */}
          <path
            d={`
              M ${cx - 80} ${baseY}
              L ${cx - 80} ${baseY + 300}
              Q ${cx - 80} ${baseY + 380} ${cx - 60} ${baseY + 420}
              Q ${cx} ${baseY + 480} ${cx + 60} ${baseY + 420}
              Q ${cx + 80} ${baseY + 380} ${cx + 80} ${baseY + 300}
              L ${cx + 80} ${baseY}
              Z
            `}
            fill={biologyColors.cortex}
            stroke="#888"
            strokeWidth={2}
            filter="url(#shadow)"
          />

          {/* Central Cylinder */}
          <path
            d={`
              M ${cx - 40} ${baseY}
              L ${cx - 40} ${baseY + 320}
              Q ${cx - 40} ${baseY + 380} ${cx - 25} ${baseY + 400}
              Q ${cx} ${baseY + 420} ${cx + 25} ${baseY + 400}
              Q ${cx + 40} ${baseY + 380} ${cx + 40} ${baseY + 320}
              L ${cx + 40} ${baseY}
              Z
            `}
            fill={biologyColors.procambium}
            stroke="#666"
            strokeWidth={1.5}
            opacity={highlightedZone === 'centralCylinder' ? 1 : 0.9}
            onClick={() => interactive && handleZoneClick('centralCylinder')}
            onMouseEnter={() => interactive && setHighlightedZone('centralCylinder')}
            onMouseLeave={() => interactive && setHighlightedZone(null)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          />

          {/* Protoderm layer (thin outer line) */}
          <path
            d={`
              M ${cx - 82} ${baseY + 200}
              L ${cx - 82} ${baseY + 300}
              Q ${cx - 82} ${baseY + 385} ${cx - 62} ${baseY + 425}
              Q ${cx} ${baseY + 485} ${cx + 62} ${baseY + 425}
              Q ${cx + 82} ${baseY + 385} ${cx + 82} ${baseY + 300}
              L ${cx + 82} ${baseY + 200}
            `}
            fill="none"
            stroke={biologyColors.protoderm}
            strokeWidth={4}
            opacity={highlightedZone === 'protoderm' ? 1 : 0.8}
            onClick={() => interactive && handleZoneClick('protoderm')}
            onMouseEnter={() => interactive && setHighlightedZone('protoderm')}
            onMouseLeave={() => interactive && setHighlightedZone(null)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          />

          {/* Quiescent Center */}
          <ellipse
            cx={cx}
            cy={baseY + 400}
            rx={20}
            ry={15}
            fill={biologyColors.quiescentCenter}
            stroke="#888"
            strokeWidth={1}
            opacity={highlightedZone === 'quiescentCenter' ? 1 : 0.9}
            onClick={() => interactive && handleZoneClick('quiescentCenter')}
            onMouseEnter={() => interactive && setHighlightedZone('quiescentCenter')}
            onMouseLeave={() => interactive && setHighlightedZone(null)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          />

          {/* Root Cap */}
          <path
            d={`
              M ${cx - 65} ${baseY + 430}
              Q ${cx - 65} ${baseY + 470} ${cx} ${baseY + 500}
              Q ${cx + 65} ${baseY + 470} ${cx + 65} ${baseY + 430}
              Q ${cx + 40} ${baseY + 445} ${cx} ${baseY + 450}
              Q ${cx - 40} ${baseY + 445} ${cx - 65} ${baseY + 430}
            `}
            fill={biologyColors.rootCap}
            stroke="#666"
            strokeWidth={1.5}
            opacity={highlightedZone === 'rootCap' ? 1 : 0.9}
            onClick={() => interactive && handleZoneClick('rootCap')}
            onMouseEnter={() => interactive && setHighlightedZone('rootCap')}
            onMouseLeave={() => interactive && setHighlightedZone(null)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          />

          {/* Ground Meristem zone indicator */}
          <rect
            x={cx - 78}
            y={baseY + 280}
            width={35}
            height={80}
            fill={biologyColors.groundMeristem}
            opacity={highlightedZone === 'groundMeristem' ? 0.8 : 0.5}
            onClick={() => interactive && handleZoneClick('groundMeristem')}
            onMouseEnter={() => interactive && setHighlightedZone('groundMeristem')}
            onMouseLeave={() => interactive && setHighlightedZone(null)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
            rx={2}
          />
          <rect
            x={cx + 43}
            y={baseY + 280}
            width={35}
            height={80}
            fill={biologyColors.groundMeristem}
            opacity={highlightedZone === 'groundMeristem' ? 0.8 : 0.5}
            rx={2}
          />

          {/* Procambium zone in central cylinder */}
          <rect
            x={cx - 35}
            y={baseY + 320}
            width={70}
            height={60}
            fill={biologyColors.procambium}
            opacity={highlightedZone === 'procambium' ? 0.9 : 0.7}
            onClick={() => interactive && handleZoneClick('procambium')}
            onMouseEnter={() => interactive && setHighlightedZone('procambium')}
            onMouseLeave={() => interactive && setHighlightedZone(null)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
            rx={3}
          />

          {/* Cell pattern overlay */}
          <g className="cell-pattern" opacity={0.3}>
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1={cx - 75}
                y1={baseY + 150 + i * 25}
                x2={cx + 75}
                y2={baseY + 150 + i * 25}
                stroke="#666"
                strokeWidth={0.5}
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={cx - 60 + i * 24}
                y1={baseY + 100}
                x2={cx - 60 + i * 24}
                y2={baseY + 350}
                stroke="#666"
                strokeWidth={0.5}
              />
            ))}
          </g>

          {/* Labels */}
          {showLabels && (
            <g className="labels">
              <DiagramLabel
                text="Epidermis"
                position={{ x: width - 60, y: baseY + 150 }}
                anchor={{ x: cx + 82, y: baseY + 150 }}
                side="right"
                isHighlighted={highlightedZone === 'protoderm'}
              />
              <DiagramLabel
                text="Cortex"
                position={{ x: width - 60, y: baseY + 220 }}
                anchor={{ x: cx + 60, y: baseY + 220 }}
                side="right"
                isHighlighted={highlightedZone === 'cortex'}
              />
              <DiagramLabel
                text="Central Cylinder"
                position={{ x: width - 60, y: baseY + 290 }}
                anchor={{ x: cx + 40, y: baseY + 290 }}
                side="right"
                isHighlighted={highlightedZone === 'centralCylinder'}
              />
              <DiagramLabel
                text="Procambium"
                position={{ x: 40, y: baseY + 340 }}
                anchor={{ x: cx - 35, y: baseY + 340 }}
                side="left"
                isHighlighted={highlightedZone === 'procambium'}
              />
              <DiagramLabel
                text="Ground Meristem"
                position={{ x: 40, y: baseY + 300 }}
                anchor={{ x: cx - 50, y: baseY + 300 }}
                side="left"
                isHighlighted={highlightedZone === 'groundMeristem'}
              />
              <DiagramLabel
                text="Protoderm"
                position={{ x: 40, y: baseY + 260 }}
                anchor={{ x: cx - 78, y: baseY + 260 }}
                side="left"
                isHighlighted={highlightedZone === 'protoderm'}
              />
              <DiagramLabel
                text="Quiescent Center"
                position={{ x: width - 60, y: baseY + 400 }}
                anchor={{ x: cx + 20, y: baseY + 400 }}
                side="right"
                isHighlighted={highlightedZone === 'quiescentCenter'}
              />
              <DiagramLabel
                text="Root Cap"
                position={{ x: cx, y: baseY + 530 }}
                anchor={{ x: cx, y: baseY + 500 }}
                side="bottom"
                isHighlighted={highlightedZone === 'rootCap'}
              />
            </g>
          )}
        </g>
      </svg>

      {/* Info Panel */}
      {selectedZone && (
        <div
          className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fadeInUp"
        >
          <h4 className="font-bold text-blue-800 mb-1">{getZoneInfo(selectedZone)?.name}</h4>
          <p className="text-sm text-blue-700">{getZoneInfo(selectedZone)?.description}</p>
        </div>
      )}
    </DiagramContainer>
  )
}
