'use client'

interface Point {
  x: number
  y: number
}

interface DiagramLabelProps {
  text: string
  position: Point
  anchor?: Point
  side?: 'left' | 'right' | 'top' | 'bottom'
  isHighlighted?: boolean
  onClick?: () => void
  showLeaderLine?: boolean
  color?: string
  fontSize?: number
}

export function DiagramLabel({
  text,
  position,
  anchor,
  side = 'right',
  isHighlighted = false,
  onClick,
  showLeaderLine = true,
  color = '#1a1a1a',
  fontSize = 12,
}: DiagramLabelProps) {
  const textAnchor = side === 'left' ? 'end' : side === 'right' ? 'start' : 'middle'
  const dy = side === 'top' ? -8 : side === 'bottom' ? 16 : 4

  const labelX = side === 'left' ? position.x - 10 : side === 'right' ? position.x + 10 : position.x
  const labelY = position.y

  return (
    <g className="diagram-label" style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {showLeaderLine && anchor && (
        <motion.line
          x1={anchor.x}
          y1={anchor.y}
          x2={position.x}
          y2={position.y}
          stroke={isHighlighted ? '#FF4500' : '#666666'}
          strokeWidth={isHighlighted ? 1.5 : 1}
          strokeDasharray={isHighlighted ? 'none' : '2,2'}
        />
      )}

      {showLeaderLine && anchor && (
        <motion.circle
          cx={anchor.x}
          cy={anchor.y}
          r={isHighlighted ? 4 : 3}
          fill={isHighlighted ? '#FF4500' : '#666666'}
        />
      )}

      <motion.text
        x={labelX}
        y={labelY}
        dy={dy}
        textAnchor={textAnchor}
        fontSize={fontSize}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight={isHighlighted ? 600 : 500}
        fill={isHighlighted ? '#FF4500' : color}
        onClick={onClick}
        style={{
          textShadow: '0 0 3px white, 0 0 3px white, 0 0 3px white',
        }}
      >
        {text}
      </motion.text>
    </g>
  )
}

interface LeaderLineProps {
  start: Point
  end: Point
  color?: string
  dashed?: boolean
  animated?: boolean
}

export function LeaderLine({
  start,
  end,
  color = '#666666',
  dashed = true,
  animated = true,
}: LeaderLineProps) {
  const midX = (start.x + end.x) / 2

  const pathD = `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`

  return (
    <motion.path
      d={pathD}
      stroke={color}
      strokeWidth={1}
      fill="none"
      strokeDasharray={dashed ? '3,3' : 'none'}
    />
  )
}
