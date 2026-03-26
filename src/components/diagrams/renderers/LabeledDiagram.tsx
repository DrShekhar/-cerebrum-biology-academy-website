'use client'

import { memo, useId } from 'react'
import { DiagramRendererProps } from '@/types/interactive-diagram'
import { biologyColors } from '../hooks/useDiagram'
import { NODE_STYLE_COLORS, DIMMED_OPACITY, EDGE_COLOR_DEFAULT } from './constants'

function LabeledDiagramInner({
  diagram,
  activeNode,
  highlightedNodes,
  onNodeHover,
  onNodeClick,
  width = 600,
  height = 500,
}: DiagramRendererProps) {
  const uid = useId().replace(/:/g, '')

  if (diagram.nodes.length === 0) return null

  const isHighlighted = (id: string) => highlightedNodes?.includes(id) ?? false

  const scaleX = (x: number) => Math.max(30, Math.min(width - 30, x * width))
  const scaleY = (y: number) => Math.max(20, Math.min(height - 20, y * height))

  const labelSide = (x: number) => (x > 0.5 ? 'right' : 'left')
  const labelX = (x: number) => (x > 0.5 ? width - 20 : 20)

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
        <filter id={`${uid}-glow`}>
          <feGaussianBlur stdDeviation="4" result="blur" />
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

        return (
          <line
            key={`edge-${i}`}
            x1={scaleX(fromNode.position.x)}
            y1={scaleY(fromNode.position.y)}
            x2={scaleX(toNode.position.x)}
            y2={scaleY(toNode.position.y)}
            stroke={edge.color || '#D1D5DB'}
            strokeWidth={1}
            strokeDasharray={edge.type === 'dashed' ? '4,3' : 'none'}
            opacity={0.5}
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
        const r = node.size || 14
        const side = labelSide(node.position.x)
        const lx = labelX(node.position.x)

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
            opacity={dimmed ? DIMMED_OPACITY : 1}
          >
            <circle
              cx={x}
              cy={y}
              r={active || highlighted ? r + 4 : r}
              fill={`${nodeColor}33`}
              stroke={active ? biologyColors.highlight : highlighted ? nodeColor : `${nodeColor}99`}
              strokeWidth={active || highlighted ? 2.5 : 1.5}
              filter={active || highlighted ? `url(#${uid}-glow)` : undefined}
            />
            <circle cx={x} cy={y} r={4} fill={nodeColor} />

            <line
              x1={x}
              y1={y}
              x2={lx + (side === 'right' ? -5 : 5)}
              y2={y}
              stroke={active ? biologyColors.highlight : EDGE_COLOR_DEFAULT}
              strokeWidth={active ? 1.5 : 1}
              strokeDasharray="3,2"
            />
            <circle
              cx={x}
              cy={y}
              r={3}
              fill={active ? biologyColors.highlight : biologyColors.leaderLine}
            />

            <text
              x={lx}
              y={y}
              textAnchor={side === 'right' ? 'end' : 'start'}
              dominantBaseline="central"
              fontSize={11}
              fontWeight={active || highlighted ? 700 : 500}
              fill={active ? biologyColors.highlight : biologyColors.labelText}
              fontFamily="system-ui, -apple-system, sans-serif"
              filter={`url(#${uid}-text-bg)`}
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

export const LabeledDiagram = memo(LabeledDiagramInner)
