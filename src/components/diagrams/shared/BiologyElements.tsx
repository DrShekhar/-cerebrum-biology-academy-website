'use client'

import { motion } from 'framer-motion'
import { biologyColors } from '../hooks/useDiagram'

interface CellProps {
  x: number
  y: number
  width: number
  height: number
  type?: 'parenchyma' | 'collenchyma' | 'sclerenchyma' | 'xylem' | 'phloem'
  isHighlighted?: boolean
  onClick?: () => void
  showNucleus?: boolean
  showVacuole?: boolean
  wallThickness?: number
  delay?: number
}

export function Cell({
  x,
  y,
  width,
  height,
  type = 'parenchyma',
  isHighlighted = false,
  onClick,
  showNucleus = true,
  showVacuole = true,
  wallThickness = 2,
  delay = 0,
}: CellProps) {
  const getColors = () => {
    switch (type) {
      case 'collenchyma':
        return {
          wall: biologyColors.thickenedWall,
          cytoplasm: biologyColors.cytoplasm,
          vacuole: biologyColors.vacuole,
        }
      case 'sclerenchyma':
        return {
          wall: biologyColors.thickenedWall,
          cytoplasm: biologyColors.lumen,
          vacuole: 'transparent',
        }
      case 'xylem':
        return {
          wall: biologyColors.xylem,
          cytoplasm: biologyColors.lumen,
          vacuole: 'transparent',
        }
      case 'phloem':
        return {
          wall: biologyColors.phloem,
          cytoplasm: biologyColors.cytoplasm,
          vacuole: biologyColors.vacuole,
        }
      default:
        return {
          wall: biologyColors.cellWall,
          cytoplasm: biologyColors.cytoplasm,
          vacuole: biologyColors.vacuole,
        }
    }
  }

  const colors = getColors()
  const cx = x + width / 2
  const cy = y + height / 2

  return (
    <motion.g
      className="cell"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={4}
        fill={colors.cytoplasm}
        stroke={colors.wall}
        strokeWidth={isHighlighted ? wallThickness + 1 : wallThickness}
      />

      {showVacuole && type !== 'sclerenchyma' && type !== 'xylem' && (
        <ellipse
          cx={cx}
          cy={cy}
          rx={width * 0.3}
          ry={height * 0.25}
          fill={colors.vacuole}
          stroke="#ddd"
          strokeWidth={0.5}
        />
      )}

      {showNucleus && type !== 'sclerenchyma' && type !== 'xylem' && (
        <circle
          cx={cx - width * 0.15}
          cy={cy - height * 0.1}
          r={width * 0.1}
          fill={biologyColors.nucleus}
        />
      )}
    </motion.g>
  )
}

interface TissueLayerProps {
  x: number
  y: number
  width: number
  height: number
  type:
    | 'epidermis'
    | 'cortex'
    | 'endodermis'
    | 'pericycle'
    | 'xylem'
    | 'phloem'
    | 'pith'
    | 'vascularBundle'
  label?: string
  isHighlighted?: boolean
  onClick?: () => void
  delay?: number
}

export function TissueLayer({
  x,
  y,
  width,
  height,
  type,
  label,
  isHighlighted = false,
  onClick,
  delay = 0,
}: TissueLayerProps) {
  const color = biologyColors[type] || biologyColors.cortex

  return (
    <motion.g
      className="tissue-layer"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        stroke={isHighlighted ? biologyColors.highlight : '#666'}
        strokeWidth={isHighlighted ? 2 : 1}
      />

      {label && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10}
          fill={biologyColors.labelText}
          fontWeight={500}
        >
          {label}
        </text>
      )}
    </motion.g>
  )
}

interface VascularBundleProps {
  cx: number
  cy: number
  radius: number
  showXylem?: boolean
  showPhloem?: boolean
  showCambium?: boolean
  isHighlighted?: boolean
  delay?: number
}

export function VascularBundle({
  cx,
  cy,
  radius,
  showXylem = true,
  showPhloem = true,
  showCambium = false,
  isHighlighted = false,
  delay = 0,
}: VascularBundleProps) {
  return (
    <motion.g
      className="vascular-bundle"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={biologyColors.vascularBundle}
        stroke={isHighlighted ? biologyColors.highlight : '#666'}
        strokeWidth={isHighlighted ? 2 : 1}
      />

      {showXylem && (
        <>
          <circle cx={cx} cy={cy - radius * 0.3} r={radius * 0.15} fill={biologyColors.xylem} />
          <circle cx={cx - radius * 0.2} cy={cy} r={radius * 0.12} fill={biologyColors.xylem} />
          <circle cx={cx + radius * 0.2} cy={cy} r={radius * 0.1} fill={biologyColors.xylem} />
        </>
      )}

      {showPhloem && (
        <>
          <circle cx={cx} cy={cy + radius * 0.4} r={radius * 0.2} fill={biologyColors.phloem} />
          <circle
            cx={cx - radius * 0.3}
            cy={cy + radius * 0.3}
            r={radius * 0.1}
            fill={biologyColors.phloem}
          />
          <circle
            cx={cx + radius * 0.3}
            cy={cy + radius * 0.3}
            r={radius * 0.1}
            fill={biologyColors.phloem}
          />
        </>
      )}

      {showCambium && (
        <ellipse
          cx={cx}
          cy={cy + radius * 0.15}
          rx={radius * 0.6}
          ry={radius * 0.08}
          fill="none"
          stroke="#228B22"
          strokeWidth={2}
          strokeDasharray="3,2"
        />
      )}
    </motion.g>
  )
}

interface MeristemZoneProps {
  x: number
  y: number
  width: number
  height: number
  zone: 'rootCap' | 'quiescentCenter' | 'procambium' | 'groundMeristem' | 'protoderm'
  label?: string
  isHighlighted?: boolean
  delay?: number
}

export function MeristemZone({
  x,
  y,
  width,
  height,
  zone,
  label,
  isHighlighted = false,
  delay = 0,
}: MeristemZoneProps) {
  const color = biologyColors[zone] || biologyColors.groundMeristem

  return (
    <motion.g
      className="meristem-zone"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={zone === 'rootCap' ? height / 2 : 2}
        fill={color}
        stroke={isHighlighted ? biologyColors.highlight : '#888'}
        strokeWidth={isHighlighted ? 2 : 1}
      />

      {label && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={9}
          fill={biologyColors.labelText}
          fontWeight={500}
        >
          {label}
        </text>
      )}
    </motion.g>
  )
}
