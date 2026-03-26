'use client'

import { memo, useId } from 'react'
import { DiagramRendererProps } from '@/types/interactive-diagram'
import { biologyColors } from '../hooks/useDiagram'
import {
  NODE_STYLE_COLORS,
  DIMMED_OPACITY,
  EDGE_DIMMED_OPACITY,
  EDGE_COLOR_DEFAULT,
} from './constants'

const NODE_WIDTH = 150
const NODE_HEIGHT = 48
const NODE_RX = 10

function FlowchartDiagramInner({
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

  if (diagram.nodes.length === 0) return null

  const isHighlighted = (id: string) => highlightedNodes?.includes(id) ?? false
  const isEdgeHighlighted = (from: string, to: string) =>
    highlightedEdges?.includes(`${from}->${to}`) ?? false

  const scaleX = (x: number) =>
    Math.max(
      NODE_WIDTH / 2,
      Math.min(width - NODE_WIDTH / 2, x * (width - NODE_WIDTH) + NODE_WIDTH / 2)
    )
  const scaleY = (y: number) =>
    Math.max(
      NODE_HEIGHT / 2 + 10,
      Math.min(
        height - NODE_HEIGHT / 2 - 10,
        y * (height - NODE_HEIGHT - 20) + NODE_HEIGHT / 2 + 10
      )
    )

  const getEdgePath = (fromNode: (typeof diagram.nodes)[0], toNode: (typeof diagram.nodes)[0]) => {
    const fx = scaleX(fromNode.position.x)
    const fy = scaleY(fromNode.position.y)
    const tx = scaleX(toNode.position.x)
    const ty = scaleY(toNode.position.y)

    const dy = ty - fy
    const dx = tx - fx

    if (Math.abs(dy) > Math.abs(dx)) {
      const startY = dy > 0 ? fy + NODE_HEIGHT / 2 : fy - NODE_HEIGHT / 2
      const endY = dy > 0 ? ty - NODE_HEIGHT / 2 - 6 : ty + NODE_HEIGHT / 2 + 6
      const midY = (startY + endY) / 2
      return `M ${fx} ${startY} C ${fx} ${midY}, ${tx} ${midY}, ${tx} ${endY}`
    } else {
      const startX = dx > 0 ? fx + NODE_WIDTH / 2 : fx - NODE_WIDTH / 2
      const endX = dx > 0 ? tx - NODE_WIDTH / 2 - 6 : tx + NODE_WIDTH / 2 + 6
      const midX = (startX + endX) / 2
      return `M ${startX} ${fy} C ${midX} ${fy}, ${midX} ${ty}, ${endX} ${ty}`
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
        <marker
          id={`${uid}-inhibit`}
          markerWidth="8"
          markerHeight="8"
          refX="4"
          refY="4"
          orient="auto"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke={biologyColors.leaderLine} strokeWidth="2" />
        </marker>
        <filter id={`${uid}-shadow`}>
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
        </filter>
        <filter id={`${uid}-glow`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
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
        const fromNode = diagram.nodes.find((n) => n.id === edge.from)
        const toNode = diagram.nodes.find((n) => n.id === edge.to)
        if (!fromNode || !toNode) return null

        const edgeActive =
          isEdgeHighlighted(edge.from, edge.to) ||
          isHighlighted(edge.from) ||
          isHighlighted(edge.to)
        const path = getEdgePath(fromNode, toNode)
        const markerEnd =
          edge.type === 'inhibit'
            ? `url(#${uid}-inhibit)`
            : edgeActive
              ? `url(#${uid}-arrow-active)`
              : `url(#${uid}-arrow)`

        return (
          <g key={`edge-${i}`}>
            <path
              d={path}
              fill="none"
              stroke={edgeActive ? biologyColors.highlight : edge.color || EDGE_COLOR_DEFAULT}
              strokeWidth={edgeActive ? 2.5 : 1.5}
              strokeDasharray={edge.type === 'dashed' ? '6,4' : 'none'}
              markerEnd={markerEnd}
              opacity={highlightedNodes && !edgeActive ? EDGE_DIMMED_OPACITY : 1}
            />
            {edge.label && (
              <text
                x={(scaleX(fromNode.position.x) + scaleX(toNode.position.x)) / 2}
                y={(scaleY(fromNode.position.y) + scaleY(toNode.position.y)) / 2 - 6}
                textAnchor="middle"
                fontSize={9}
                fill={edgeActive ? biologyColors.highlight : '#6B7280'}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight={500}
                filter={`url(#${uid}-text-bg)`}
              >
                {edge.label}
              </text>
            )}
          </g>
        )
      })}

      {diagram.nodes.map((node) => {
        const x = scaleX(node.position.x)
        const y = scaleY(node.position.y)
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
            <rect
              x={x - NODE_WIDTH / 2}
              y={y - NODE_HEIGHT / 2}
              width={NODE_WIDTH}
              height={NODE_HEIGHT}
              rx={NODE_RX}
              fill={active || highlighted ? nodeColor : `${nodeColor}E6`}
              stroke={active ? biologyColors.highlight : highlighted ? '#FFFFFF' : `${nodeColor}80`}
              strokeWidth={active || highlighted ? 3 : 1.5}
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fontWeight={600}
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {node.label.length > 20 ? (
                <>
                  <tspan x={x} dy="-0.5em">
                    {node.label.slice(0, node.label.lastIndexOf(' ', 20) || 20)}
                  </tspan>
                  <tspan x={x} dy="1.1em">
                    {node.label.slice((node.label.lastIndexOf(' ', 20) || 20) + 1)}
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

export const FlowchartDiagram = memo(FlowchartDiagramInner)
