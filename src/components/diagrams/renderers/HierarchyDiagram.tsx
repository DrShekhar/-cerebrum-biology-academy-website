'use client'

import { memo, useId } from 'react'
import { DiagramRendererProps } from '@/types/interactive-diagram'
import { biologyColors } from '../hooks/useDiagram'
import { NODE_STYLE_COLORS, DIMMED_OPACITY, EDGE_DIMMED_OPACITY } from './constants'

const BOX_WIDTH = 120
const BOX_HEIGHT = 36
const BOX_RX = 6

function HierarchyDiagramInner({
  diagram,
  activeNode,
  highlightedNodes,
  highlightedEdges,
  onNodeHover,
  onNodeClick,
  width = 700,
  height = 500,
}: DiagramRendererProps) {
  const uid = useId().replace(/:/g, '')

  if (diagram.nodes.length === 0) return null

  const isHighlighted = (id: string) => highlightedNodes?.includes(id) ?? false

  const scaleX = (x: number) =>
    Math.max(
      BOX_WIDTH / 2,
      Math.min(width - BOX_WIDTH / 2, x * (width - BOX_WIDTH) + BOX_WIDTH / 2)
    )
  const scaleY = (y: number) =>
    Math.max(
      BOX_HEIGHT / 2 + 10,
      Math.min(height - BOX_HEIGHT / 2 - 10, y * (height - BOX_HEIGHT - 20) + BOX_HEIGHT / 2 + 10)
    )

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
        <filter id={`${uid}-shadow`}>
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1" />
        </filter>
        <filter id={`${uid}-glow`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {diagram.edges?.map((edge, i) => {
        const fromNode = diagram.nodes.find((n) => n.id === edge.from)
        const toNode = diagram.nodes.find((n) => n.id === edge.to)
        if (!fromNode || !toNode) return null

        const fx = scaleX(fromNode.position.x)
        const fy = scaleY(fromNode.position.y) + BOX_HEIGHT / 2
        const tx = scaleX(toNode.position.x)
        const ty = scaleY(toNode.position.y) - BOX_HEIGHT / 2

        const midY = (fy + ty) / 2
        const edgeActive =
          highlightedEdges?.includes(`${edge.from}->${edge.to}`) ||
          isHighlighted(edge.from) ||
          isHighlighted(edge.to)

        return (
          <path
            key={`edge-${i}`}
            d={`M ${fx} ${fy} L ${fx} ${midY} L ${tx} ${midY} L ${tx} ${ty}`}
            fill="none"
            stroke={edgeActive ? biologyColors.highlight : edge.color || '#CBD5E1'}
            strokeWidth={edgeActive ? 2 : 1.5}
            opacity={highlightedNodes && !edgeActive ? EDGE_DIMMED_OPACITY : 1}
          />
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
        const boxW = node.size ? node.size * 8 : BOX_WIDTH

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
              x={x - boxW / 2}
              y={y - BOX_HEIGHT / 2}
              width={boxW}
              height={BOX_HEIGHT}
              rx={BOX_RX}
              fill={active || highlighted ? nodeColor : `${nodeColor}E6`}
              stroke={active ? biologyColors.highlight : highlighted ? '#FFFFFF' : `${nodeColor}80`}
              strokeWidth={active || highlighted ? 2.5 : 1}
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={10}
              fontWeight={600}
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {node.label}
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

export const HierarchyDiagram = memo(HierarchyDiagramInner)
