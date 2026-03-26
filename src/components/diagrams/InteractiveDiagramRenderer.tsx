'use client'

import { useState, useCallback, Component, ReactNode } from 'react'
import {
  AnyDiagramData,
  InteractiveDiagramData,
  ComparisonDiagramData,
} from '@/types/interactive-diagram'
import { DiagramContainer } from './shared/DiagramContainer'
import { CycleDiagram } from './renderers/CycleDiagram'
import { FlowchartDiagram } from './renderers/FlowchartDiagram'
import { LabeledDiagram } from './renderers/LabeledDiagram'
import { HierarchyDiagram } from './renderers/HierarchyDiagram'
import { ComparisonDiagram } from './renderers/ComparisonDiagram'

class DiagramErrorBoundary extends Component<
  { children: ReactNode; title: string },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; title: string }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center">
          <p className="text-red-800 font-medium">Failed to render diagram: {this.props.title}</p>
          <p className="text-red-600 text-sm mt-1">
            The diagram data may be malformed. Try regenerating it.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

const RENDERERS: Record<
  string,
  React.ComponentType<{
    diagram: InteractiveDiagramData
    activeNode: string | null
    highlightedNodes?: string[]
    highlightedEdges?: string[]
    onNodeHover: (id: string | null) => void
    onNodeClick?: (id: string) => void
    width?: number
    height?: number
  }>
> = {
  cycle: CycleDiagram,
  flowchart: FlowchartDiagram,
  sequence: FlowchartDiagram,
  'labeled-diagram': LabeledDiagram,
  hierarchy: HierarchyDiagram,
}

interface InteractiveDiagramRendererProps {
  diagram: AnyDiagramData
  className?: string
  width?: number
  height?: number
}

export function InteractiveDiagramRenderer({
  diagram,
  className = '',
  width,
  height,
}: InteractiveDiagramRendererProps) {
  const [currentStep, setCurrentStep] = useState<number | null>(null)
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  if (!diagram || !diagram.type || !diagram.title) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-yellow-800">
        Invalid diagram data. Missing required fields (type, title).
      </div>
    )
  }

  const isComparison = diagram.type === 'comparison' && 'left' in diagram

  const hasNodes = isComparison
    ? (diagram as ComparisonDiagramData).left.nodes.length > 0 ||
      (diagram as ComparisonDiagramData).right.nodes.length > 0
    : 'nodes' in diagram && (diagram as InteractiveDiagramData).nodes.length > 0

  if (!hasNodes) {
    return (
      <DiagramContainer title={diagram.title} subtitle={diagram.subtitle} className={className}>
        <div className="p-6 text-center text-slate-500 text-sm">
          No data available for this diagram.
        </div>
      </DiagramContainer>
    )
  }

  const steps = diagram.steps
  const totalSteps = steps?.length || 0

  const highlightedNodes =
    currentStep !== null && steps?.[currentStep] ? steps[currentStep].highlightNodes : undefined

  const highlightedEdges =
    currentStep !== null && steps?.[currentStep] ? steps[currentStep].highlightEdges : undefined

  const handleNodeHover = useCallback((id: string | null) => {
    setActiveNode(id)
  }, [])

  const handleNodeClick = useCallback((id: string) => {
    setSelectedNode((prev) => (prev === id ? null : id))
  }, [])

  const goToStep = useCallback(
    (step: number | null) => {
      if (step === null) {
        setCurrentStep(null)
        return
      }
      setCurrentStep(Math.max(0, Math.min(totalSteps - 1, step)))
    },
    [totalSteps]
  )

  const allNodes = isComparison
    ? [
        ...(diagram as ComparisonDiagramData).left.nodes,
        ...(diagram as ComparisonDiagramData).right.nodes,
      ]
    : (diagram as InteractiveDiagramData).nodes

  const displayNodeId = selectedNode || activeNode
  const infoNode = displayNodeId ? allNodes.find((n) => n.id === displayNodeId) : null

  return (
    <DiagramErrorBoundary title={diagram.title}>
      <DiagramContainer title={diagram.title} subtitle={diagram.subtitle} className={className}>
        {isComparison ? (
          <ComparisonDiagram
            diagram={diagram as ComparisonDiagramData}
            activeNode={activeNode}
            highlightedNodes={highlightedNodes}
            onNodeHover={handleNodeHover}
            onNodeClick={handleNodeClick}
            width={width}
            height={height}
          />
        ) : (
          (() => {
            const Renderer = RENDERERS[diagram.type]
            if (!Renderer)
              return (
                <p className="text-red-500 text-sm p-4">Unsupported diagram type: {diagram.type}</p>
              )
            return (
              <Renderer
                diagram={diagram as InteractiveDiagramData}
                activeNode={activeNode}
                highlightedNodes={highlightedNodes}
                highlightedEdges={highlightedEdges}
                onNodeHover={handleNodeHover}
                onNodeClick={handleNodeClick}
                width={width}
                height={height}
              />
            )
          })()
        )}

        {infoNode && (
          <div
            className={`mt-3 p-3 rounded-lg border text-sm animate-fadeInUp ${
              selectedNode ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className={`font-semibold ${selectedNode ? 'text-green-900' : 'text-blue-900'}`}>
                {infoNode.label}
              </p>
              {selectedNode && (
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-xs text-slate-500 hover:text-slate-700"
                  aria-label="Dismiss"
                >
                  Dismiss
                </button>
              )}
            </div>
            <p className={`mt-1 ${selectedNode ? 'text-green-700' : 'text-blue-700'}`}>
              {infoNode.description}
            </p>
          </div>
        )}

        {totalSteps > 0 && (
          <div className="mt-4 border-t pt-3">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => goToStep(currentStep === null ? 0 : currentStep - 1)}
                disabled={currentStep !== null && currentStep <= 0}
                className="px-3 py-1.5 text-xs font-medium bg-slate-200 hover:bg-slate-300 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label={currentStep === null ? 'Start walkthrough' : 'Previous step'}
              >
                {currentStep === null ? 'Start' : 'Prev'}
              </button>

              <div className="flex-1 flex items-center gap-1">
                {steps!.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToStep(i)}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      currentStep === i
                        ? 'bg-blue-600'
                        : currentStep !== null && i < currentStep
                          ? 'bg-blue-300'
                          : 'bg-slate-200'
                    }`}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => goToStep(currentStep === null ? 0 : currentStep + 1)}
                disabled={currentStep !== null && currentStep >= totalSteps - 1}
                className="px-3 py-1.5 text-xs font-medium bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next step"
              >
                Next
              </button>

              {currentStep !== null && (
                <button
                  onClick={() => goToStep(null)}
                  className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded-md text-slate-600"
                  aria-label="Reset walkthrough"
                >
                  Reset
                </button>
              )}
            </div>

            {currentStep !== null && steps![currentStep] && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs font-semibold text-amber-800">
                  Step {steps![currentStep].stepNumber} of {totalSteps}
                </p>
                <p className="text-sm text-amber-900 mt-1">{steps![currentStep].explanation}</p>
              </div>
            )}
          </div>
        )}
      </DiagramContainer>
    </DiagramErrorBoundary>
  )
}
