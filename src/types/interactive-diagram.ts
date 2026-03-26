export type DiagramType =
  | 'cycle'
  | 'flowchart'
  | 'labeled-diagram'
  | 'comparison'
  | 'hierarchy'
  | 'sequence'

export type NodeStyle = 'primary' | 'secondary' | 'highlight' | 'faded' | 'danger' | 'success'

export type EdgeType = 'arrow' | 'bidirectional' | 'dashed' | 'inhibit'

export interface DiagramNode {
  id: string
  label: string
  description: string
  position: { x: number; y: number }
  style?: NodeStyle
  color?: string
  size?: number
  group?: string
}

export interface DiagramEdge {
  from: string
  to: string
  label?: string
  type?: EdgeType
  color?: string
}

export interface DiagramStep {
  stepNumber: number
  highlightNodes: string[]
  highlightEdges?: string[]
  explanation: string
}

export interface DiagramAnnotation {
  text: string
  position: { x: number; y: number }
  fontSize?: number
}

export interface InteractiveDiagramData {
  type: DiagramType
  title: string
  subtitle?: string
  nodes: DiagramNode[]
  edges?: DiagramEdge[]
  annotations?: DiagramAnnotation[]
  steps?: DiagramStep[]
}

export interface ComparisonDiagramData {
  type: 'comparison'
  title: string
  subtitle?: string
  left: {
    title: string
    nodes: DiagramNode[]
    edges?: DiagramEdge[]
  }
  right: {
    title: string
    nodes: DiagramNode[]
    edges?: DiagramEdge[]
  }
  sharedFeatures?: string[]
  differences?: { left: string; right: string }[]
  steps?: DiagramStep[]
}

export type AnyDiagramData = InteractiveDiagramData | ComparisonDiagramData

export interface DiagramRendererProps {
  diagram: InteractiveDiagramData
  activeNode: string | null
  highlightedNodes?: string[]
  highlightedEdges?: string[]
  onNodeHover: (id: string | null) => void
  onNodeClick?: (id: string) => void
  width?: number
  height?: number
}
