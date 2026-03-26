'use client'

import { memo, useState, useId } from 'react'
import { ComparisonDiagramData } from '@/types/interactive-diagram'
import { biologyColors } from '../hooks/useDiagram'
import { NODE_STYLE_COLORS, DIMMED_OPACITY, BORDER_COLOR } from './constants'

interface ComparisonDiagramProps {
  diagram: ComparisonDiagramData
  activeNode: string | null
  highlightedNodes?: string[]
  onNodeHover: (id: string | null) => void
  onNodeClick?: (id: string) => void
  width?: number
  height?: number
}

function ComparisonDiagramInner({
  diagram,
  activeNode,
  highlightedNodes,
  onNodeHover,
  onNodeClick,
  width = 700,
  height = 500,
}: ComparisonDiagramProps) {
  const uid = useId().replace(/:/g, '')
  const [hoveredDiff, setHoveredDiff] = useState<number | null>(null)
  const halfWidth = width / 2 - 20
  const isHighlighted = (id: string) => highlightedNodes?.includes(id) ?? false

  const renderSide = (
    side: ComparisonDiagramData['left'],
    offsetX: number,
    sideWidth: number,
    sideLabel: 'left' | 'right'
  ) => {
    if (side.nodes.length === 0) return null

    return (
      <g>
        <text
          x={offsetX + sideWidth / 2}
          y={30}
          textAnchor="middle"
          fontSize={15}
          fontWeight={700}
          fill={biologyColors.labelText}
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {side.title}
        </text>
        <line
          x1={offsetX + 20}
          y1={42}
          x2={offsetX + sideWidth - 20}
          y2={42}
          stroke={BORDER_COLOR}
          strokeWidth={1}
        />

        {side.edges?.map((edge, i) => {
          const fromNode = side.nodes.find((n) => n.id === edge.from)
          const toNode = side.nodes.find((n) => n.id === edge.to)
          if (!fromNode || !toNode) return null

          const fx = offsetX + fromNode.position.x * sideWidth
          const fy = fromNode.position.y * (height - 60) + 50
          const tx = offsetX + toNode.position.x * sideWidth
          const ty = toNode.position.y * (height - 60) + 50

          return (
            <line
              key={`${sideLabel}-edge-${i}`}
              x1={fx}
              y1={fy}
              x2={tx}
              y2={ty}
              stroke={edge.color || '#D1D5DB'}
              strokeWidth={1}
              strokeDasharray={edge.type === 'dashed' ? '4,3' : 'none'}
              opacity={0.4}
            />
          )
        })}

        {side.nodes.map((node) => {
          const x = offsetX + node.position.x * sideWidth
          const y = node.position.y * (height - 60) + 50
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
              opacity={dimmed ? DIMMED_OPACITY : 1}
            >
              <rect
                x={x - 60}
                y={y - 18}
                width={120}
                height={36}
                rx={8}
                fill={active || highlighted ? nodeColor : `${nodeColor}E6`}
                stroke={
                  active ? biologyColors.highlight : highlighted ? '#FFFFFF' : `${nodeColor}80`
                }
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
      </g>
    )
  }

  return (
    <div>
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

        <line
          x1={width / 2}
          y1={10}
          x2={width / 2}
          y2={height - 10}
          stroke={BORDER_COLOR}
          strokeWidth={2}
          strokeDasharray="8,4"
        />

        {renderSide(diagram.left, 10, halfWidth, 'left')}
        {renderSide(diagram.right, width / 2 + 10, halfWidth, 'right')}

        <text
          x={width / 2}
          y={height - 5}
          textAnchor="middle"
          fontSize={9}
          fill="#9CA3AF"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          VS
        </text>
      </svg>

      {diagram.differences && diagram.differences.length > 0 && (
        <div className="mt-3 border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-3 py-2 text-left font-semibold text-slate-700">
                  {diagram.left.title}
                </th>
                <th className="px-3 py-2 text-left font-semibold text-slate-700">
                  {diagram.right.title}
                </th>
              </tr>
            </thead>
            <tbody>
              {diagram.differences.map((diff, i) => (
                <tr
                  key={i}
                  className={`border-t ${hoveredDiff === i ? 'bg-blue-50' : ''}`}
                  onMouseEnter={() => setHoveredDiff(i)}
                  onMouseLeave={() => setHoveredDiff(null)}
                >
                  <td className="px-3 py-2 text-slate-600">{diff.left}</td>
                  <td className="px-3 py-2 text-slate-600">{diff.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {diagram.sharedFeatures && diagram.sharedFeatures.length > 0 && (
        <div className="mt-2 p-3 bg-green-50 rounded-lg">
          <p className="text-xs font-semibold text-green-800 mb-1">Shared Features:</p>
          <ul className="text-xs text-green-700 space-y-0.5">
            {diagram.sharedFeatures.map((f, i) => (
              <li key={i}>- {f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const ComparisonDiagram = memo(ComparisonDiagramInner)
