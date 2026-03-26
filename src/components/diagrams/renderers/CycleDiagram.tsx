'use client'

import { memo, useMemo, useId } from 'react'
import { DiagramRendererProps } from '@/types/interactive-diagram'
import { biologyColors } from '../hooks/useDiagram'
import {
  NODE_STYLE_COLORS,
  DIMMED_OPACITY,
  EDGE_DIMMED_OPACITY,
  EDGE_COLOR_DEFAULT,
} from './constants'

function CycleDiagramInner({
  diagram,
  activeNode,
  highlightedNodes,
  highlightedEdges,
  onNodeHover,
  onNodeClick,
  width = 600,
  height = 500,
}: DiagramRendererProps) {
  const uid = useId().replace(/:/g, '')

  const nodeCount = diagram.nodes.length
  if (nodeCount === 0) return null

  const cx = width / 2
  const cy = height / 2
  const radius = Math.min(width, height) * 0.34
  const nodeRadius = Math.max(28, Math.min(44, 180 / nodeCount))

  const nodePositions = useMemo(() => {
    return diagram.nodes.map((_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      }
    })
  }, [nodeCount, cx, cy, radius, diagram.nodes])

  const isHighlighted = (id: string) => highlightedNodes?.includes(id) ?? false
  const isEdgeHighlighted = (from: string, to: string) =>
    highlightedEdges?.includes(`${from}->${to}`) ?? false

  const getArrowPath = (fromIdx: number, toIdx: number) => {
    const from = nodePositions[fromIdx]
    const to = nodePositions[toIdx]

    const dx = to.x - from.x
    const dy = to.y - from.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist === 0) return null
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
    }
  }

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ maxWidth: width }}
      role="img"
      aria-label={diagram.title}
    >
      <title>{diagram.title}</title>
      <defs>
        <marker
          id={`${uid}-arrow`}
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <path d="M 0 0 L 8 3 L 0 6 Z" fill={biologyColors.leaderLine} />
        </marker>
        <marker
          id={`${uid}-arrow-active`}
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <path d="M 0 0 L 8 3 L 0 6 Z" fill={biologyColors.highlight} />
        </marker>
        <filter id={`${uid}-glow`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uid}-shadow`}>
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>
        <filter id={`${uid}-text-bg`}>
          <feFlood floodColor="white" floodOpacity="0.85" result="bg" />
          <feMerge>
            <feMergeNode in="bg" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {diagram.edges?.map((edge, i) => {
        const fromIdx = diagram.nodes.findIndex((n) => n.id === edge.from)
        const toIdx = diagram.nodes.findIndex((n) => n.id === edge.to)
        if (fromIdx === -1 || toIdx === -1) return null

        const arrow = getArrowPath(fromIdx, toIdx)
        if (!arrow) return null

        const edgeActive =
          isEdgeHighlighted(edge.from, edge.to) ||
          isHighlighted(edge.from) ||
          isHighlighted(edge.to)

        return (
          <g key={`edge-${i}`}>
            <path
              d={arrow.path}
              fill="none"
              stroke={edgeActive ? biologyColors.highlight : edge.color || EDGE_COLOR_DEFAULT}
              strokeWidth={edgeActive ? 2.5 : 1.5}
              markerEnd={edgeActive ? `url(#${uid}-arrow-active)` : `url(#${uid}-arrow)`}
              opacity={highlightedNodes && !edgeActive ? EDGE_DIMMED_OPACITY : 1}
            />
            {edge.label && (
              <text
                x={(nodePositions[fromIdx].x + nodePositions[toIdx].x) / 2}
                y={(nodePositions[fromIdx].y + nodePositions[toIdx].y) / 2 - 8}
                textAnchor="middle"
                fontSize={9}
                fill={edgeActive ? biologyColors.highlight : '#6B7280'}
                fontFamily="system-ui, -apple-system, sans-serif"
                filter={`url(#${uid}-text-bg)`}
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
          if (!arrow) return null

          const nodeActive = isHighlighted(diagram.nodes[i].id)
          const nextActive = isHighlighted(diagram.nodes[nextIdx].id)
          const edgeActive = nodeActive || nextActive

          return (
            <path
              key={`auto-edge-${i}`}
              d={arrow.path}
              fill="none"
              stroke={edgeActive ? biologyColors.highlight : EDGE_COLOR_DEFAULT}
              strokeWidth={edgeActive ? 2.5 : 1.5}
              markerEnd={edgeActive ? `url(#${uid}-arrow-active)` : `url(#${uid}-arrow)`}
              opacity={highlightedNodes && !edgeActive ? EDGE_DIMMED_OPACITY : 1}
            />
          )
        })}

      {diagram.nodes.map((node, i) => {
        const pos = nodePositions[i]
        const active = activeNode === node.id
        const highlighted = isHighlighted(node.id)
        const dimmed = highlightedNodes && !highlighted
        const nodeColor =
          node.color || (node.style ? NODE_STYLE_COLORS[node.style] : NODE_STYLE_COLORS.primary)

        return (
          <g
            key={node.id}
            role="button"
            tabIndex={0}
            aria-label={`${node.label}: ${node.description}`}
            onMouseEnter={() => onNodeHover(node.id)}
            onMouseLeave={() => onNodeHover(null)}
            onClick={() => onNodeClick?.(node.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onNodeClick?.(node.id)
              }
            }}
            style={{ cursor: 'pointer' }}
            filter={active || highlighted ? `url(#${uid}-glow)` : `url(#${uid}-shadow)`}
            opacity={dimmed ? DIMMED_OPACITY : 1}
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
                    {node.label.slice(
                      0,
                      node.label.lastIndexOf(' ', Math.ceil(node.label.length / 2)) ||
                        Math.ceil(node.label.length / 2)
                    )}
                  </tspan>
                  <tspan x={pos.x} dy="1.1em">
                    {node.label.slice(
                      node.label.lastIndexOf(' ', Math.ceil(node.label.length / 2)) + 1 ||
                        Math.ceil(node.label.length / 2)
                    )}
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

export const CycleDiagram = memo(CycleDiagramInner)
