// Shared components
export { DiagramContainer } from './shared/DiagramContainer'
export { DiagramLabel, LeaderLine } from './shared/DiagramLabel'
export { Cell, TissueLayer, VascularBundle, MeristemZone } from './shared/BiologyElements'

// Hooks
export { useDiagram, biologyColors, labelStyles } from './hooks/useDiagram'

// Biology diagrams
export { RootMeristem } from './biology/RootMeristem'
export { PlantTissues } from './biology/PlantTissues'
export { StemCrossSection } from './biology/StemCrossSection'

// Interactive diagram renderers
export { InteractiveDiagramRenderer } from './InteractiveDiagramRenderer'
export { CycleDiagram } from './renderers/CycleDiagram'
export { FlowchartDiagram } from './renderers/FlowchartDiagram'
export { LabeledDiagram } from './renderers/LabeledDiagram'
export { HierarchyDiagram } from './renderers/HierarchyDiagram'
export { ComparisonDiagram } from './renderers/ComparisonDiagram'
