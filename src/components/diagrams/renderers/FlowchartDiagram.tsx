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

const NODE_WIDTH = 150
const NODE_HEIGHT = 48
const NODE_RX = 10

export function FlowchartDiagram({
  diagram,
  activeNode,
  highlightedNodes,
  highlightedEdges,
  onNodeHover,
  onNodeClick,
  width = 600,
  height = 500,
}: DiagramRendererProps) {
  const isHighlighted = (id: string) => highlightedNodes?.includes(id) ?? false
  const isEdgeHighlighted = (from: string, to: string) =>
    highlightedEdges?.includes(`${from}->${to}`) ?? false

  const scaleX = (x: number) => x * (width - NODE_WIDTH) + NODE_WIDTH / 2
  const scaleY = (y: number) => y * (height - NODE_HEIGHT - 20) + NODE_HEIGHT / 2 + 10

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
    >
      <defs>
        <marker id="flow-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill={biologyColors.leaderLine} />
        </marker>
        <marker
          id="flow-arrow-active"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <path d="M 0 0 L 8 3 L 0 6 Z" fill={biologyColors.highlight} />
        </marker>
        <marker id="flow-inhibit" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <line x1="0" y1="0" x2="0" y2="8" stroke={biologyColors.leaderLine} strokeWidth="2" />
        </marker>
        <filter id="flow-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
        </filter>
        <filter id="flow-glow">
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

        const edgeActive =
          isEdgeHighlighted(edge.from, edge.to) ||
          isHighlighted(edge.from) ||
          isHighlighted(edge.to)
        const path = getEdgePath(fromNode, toNode)
        const markerEnd =
          edge.type === 'inhibit'
            ? 'url(#flow-inhibit)'
            : edgeActive
              ? 'url(#flow-arrow-active)'
              : 'url(#flow-arrow)'

        return (
          <g key={`edge-${i}`}>
            <path
              d={path}
              fill="none"
              stroke={edgeActive ? biologyColors.highlight : edge.color || '#9CA3AF'}
              strokeWidth={edgeActive ? 2.5 : 1.5}
              strokeDasharray={edge.type === 'dashed' ? '6,4' : 'none'}
              markerEnd={markerEnd}
              opacity={highlightedNodes && !edgeActive ? 0.25 : 1}
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
                style={{ textShadow: '0 0 4px white, 0 0 4px white' }}
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
            onMouseEnter={() => onNodeHover(node.id)}
            onMouseLeave={() => onNodeHover(null)}
            onClick={() => onNodeClick?.(node.id)}
            style={{ cursor: 'pointer' }}
            filter={active || highlighted ? 'url(#flow-glow)' : 'url(#flow-shadow)'}
            opacity={dimmed ? 0.3 : 1}
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
                    {node.label.slice(0, Math.ceil(node.label.length / 2))}
                  </tspan>
                  <tspan x={x} dy="1.1em">
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
