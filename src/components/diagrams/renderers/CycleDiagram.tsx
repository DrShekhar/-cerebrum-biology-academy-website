'use client'

import { DiagramRendererProps } from '@/types/interactive-diagram'
import { biologyColors } from '../hooks/useDiagram'

const NODE_STYLE_COLORS: Record<string, string> = {
  primary: '#4169E1',
  secondary: '#6B7280',
  highlight: '#FF4500',
  faded: '#D1D5DB',
  danger: '#DC2626',
  success: '#16A34A',
}

export function CycleDiagram({
  diagram,
  activeNode,
  highlightedNodes,
  highlightedEdges,
  onNodeHover,
  onNodeClick,
  width = 600,
  height = 500,
}: DiagramRendererProps) {
  const cx = width / 2
  const cy = height / 2
  const radius = Math.min(width, height) * 0.34
  const nodeCount = diagram.nodes.length
  const nodeRadius = Math.max(28, Math.min(44, 180 / nodeCount))

  const getNodePosition = (index: number) => {
    const angle = (index / nodeCount) * Math.PI * 2 - Math.PI / 2
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    }
  }

  const isHighlighted = (id: string) => highlightedNodes?.includes(id) ?? false
  const isEdgeHighlighted = (from: string, to: string) =>
    highlightedEdges?.includes(`${from}->${to}`) ?? false

  const getArrowPath = (fromIdx: number, toIdx: number) => {
    const from = getNodePosition(fromIdx)
    const to = getNodePosition(toIdx)

    const dx = to.x - from.x
    const dy = to.y - from.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const nx = dx / dist
    const ny = dy / dist

    const startX = from.x + nx * (nodeRadius + 4)
    const startY = from.y + ny * (nodeRadius + 4)
    const endX = to.x - nx * (nodeRadius + 8)
    const endY = to.y - ny * (nodeRadius + 8)

    const midX = (startX + endX) / 2
    const midY = (startY + endY) / 2
    const perpX = -ny * 20
    const perpY = nx * 20

    return {
      path: `M ${startX} ${startY} Q ${midX + perpX} ${midY + perpY} ${endX} ${endY}`,
      endX,
      endY,
      angle: Math.atan2(endY - (midY + perpY), endX - (midX + perpX)),
    }
  }

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ maxWidth: width }}
    >
      <defs>
        <marker id="cycle-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill={biologyColors.leaderLine} />
        </marker>
        <marker
          id="cycle-arrow-active"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <path d="M 0 0 L 8 3 L 0 6 Z" fill={biologyColors.highlight} />
        </marker>
        <filter id="cycle-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="cycle-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>

      {diagram.edges?.map((edge, i) => {
        const fromIdx = diagram.nodes.findIndex((n) => n.id === edge.from)
        const toIdx = diagram.nodes.findIndex((n) => n.id === edge.to)
        if (fromIdx === -1 || toIdx === -1) return null

        const arrow = getArrowPath(fromIdx, toIdx)
        const edgeActive =
          isEdgeHighlighted(edge.from, edge.to) ||
          isHighlighted(edge.from) ||
          isHighlighted(edge.to)

        return (
          <g key={`edge-${i}`}>
            <path
              d={arrow.path}
              fill="none"
              stroke={edgeActive ? biologyColors.highlight : edge.color || '#9CA3AF'}
              strokeWidth={edgeActive ? 2.5 : 1.5}
              markerEnd={edgeActive ? 'url(#cycle-arrow-active)' : 'url(#cycle-arrow)'}
              opacity={highlightedNodes && !edgeActive ? 0.3 : 1}
            />
            {edge.label && (
              <text
                x={(getNodePosition(fromIdx).x + getNodePosition(toIdx).x) / 2}
                y={(getNodePosition(fromIdx).y + getNodePosition(toIdx).y) / 2 - 8}
                textAnchor="middle"
                fontSize={9}
                fill={edgeActive ? biologyColors.highlight : '#6B7280'}
                fontFamily="system-ui, -apple-system, sans-serif"
                style={{ textShadow: '0 0 3px white, 0 0 3px white' }}
              >
                {edge.label}
              </text>
            )}
          </g>
        )
      })}

      {!diagram.edges &&
        diagram.nodes.map((_, i) => {
          const nextIdx = (i + 1) % nodeCount
          const arrow = getArrowPath(i, nextIdx)
          const nodeActive = isHighlighted(diagram.nodes[i].id)
          const nextActive = isHighlighted(diagram.nodes[nextIdx].id)
          const edgeActive = nodeActive || nextActive

          return (
            <path
              key={`auto-edge-${i}`}
              d={arrow.path}
              fill="none"
              stroke={edgeActive ? biologyColors.highlight : '#9CA3AF'}
              strokeWidth={edgeActive ? 2.5 : 1.5}
              markerEnd={edgeActive ? 'url(#cycle-arrow-active)' : 'url(#cycle-arrow)'}
              opacity={highlightedNodes && !edgeActive ? 0.3 : 1}
            />
          )
        })}

      {diagram.nodes.map((node, i) => {
        const pos = getNodePosition(i)
        const active = activeNode === node.id
        const highlighted = isHighlighted(node.id)
        const dimmed = highlightedNodes && !highlighted
        const nodeColor =
          node.color || (node.style ? NODE_STYLE_COLORS[node.style] : NODE_STYLE_COLORS.primary)

        return (
          <g
            key={node.id}
            onMouseEnter={() => onNodeHover(node.id)}
            onMouseLeave={() => onNodeHover(null)}
            onClick={() => onNodeClick?.(node.id)}
            style={{ cursor: 'pointer' }}
            filter={active || highlighted ? 'url(#cycle-glow)' : 'url(#cycle-shadow)'}
            opacity={dimmed ? 0.35 : 1}
          >
            <circle
              cx={pos.x}
              cy={pos.y}
              r={active || highlighted ? nodeRadius + 3 : nodeRadius}
              fill={active || highlighted ? nodeColor : `${nodeColor}E6`}
              stroke={active ? biologyColors.highlight : highlighted ? '#FFFFFF' : `${nodeColor}80`}
              strokeWidth={active || highlighted ? 3 : 1.5}
            />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={Math.min(11, (nodeRadius * 1.6) / Math.max(1, node.label.length / 8))}
              fontWeight={600}
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {node.label.length > 14 ? (
                <>
                  <tspan x={pos.x} dy="-0.5em">
                    {node.label.slice(0, Math.ceil(node.label.length / 2))}
                  </tspan>
                  <tspan x={pos.x} dy="1.1em">
                    {node.label.slice(Math.ceil(node.label.length / 2))}
                  </tspan>
                </>
              ) : (
                node.label
              )}
            </text>
          </g>
        )
      })}

      {diagram.annotations?.map((ann, i) => (
        <text
          key={`ann-${i}`}
          x={ann.position.x * width}
          y={ann.position.y * height}
          textAnchor="middle"
          fontSize={ann.fontSize || 11}
          fill="#6B7280"
          fontStyle="italic"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {ann.text}
        </text>
      ))}
    </svg>
  )
}
