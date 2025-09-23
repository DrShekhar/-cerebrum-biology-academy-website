/**
 * Visual Enhancement Engine
 * DALL-E integration, LaTeX rendering, 3D molecule visualization
 * Advanced biological content generation
 */

import OpenAI from 'openai'

interface VisualRequest {
  type: 'diagram' | 'molecule' | 'formula' | 'process_flow' | 'anatomy'
  content: string
  subject: string
  complexity: 'simple' | 'detailed' | 'advanced'
  style: 'educational' | 'scientific' | 'colorful' | 'monochrome'
  language: 'english' | 'hindi' | 'hinglish'
}

interface VisualResponse {
  type: string
  url?: string
  latex?: string
  molecule3d?: string
  svg?: string
  description: string
  cost: number
  timestamp: Date
}

interface MoleculeData {
  formula: string
  smiles: string
  bonds: Array<{ from: number; to: number; type: 'single' | 'double' | 'triple' }>
  atoms: Array<{ element: string; x: number; y: number; z: number }>
  properties: {
    molecularWeight: number
    boilingPoint?: number
    meltingPoint?: number
    solubility?: string
  }
}

export class VisualEnhancementEngine {
  private openai: OpenAI
  private moleculeDatabase: Map<string, MoleculeData> = new Map()

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    })
    this.initializeMoleculeDatabase()
  }

  /**
   * BIOLOGICAL DIAGRAM GENERATION using DALL-E
   */
  async generateBiologyDiagram(request: VisualRequest): Promise<VisualResponse> {
    const optimizedPrompt = this.createDiagramPrompt(request)

    try {
      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: optimizedPrompt,
        size: '1024x1024',
        quality: 'hd',
        style: request.style === 'scientific' ? 'natural' : 'vivid',
        n: 1,
      })

      return {
        type: 'diagram',
        url: response.data[0].url,
        description: `Biology diagram: ${request.content}`,
        cost: 0.04, // DALL-E 3 HD cost
        timestamp: new Date(),
      }
    } catch (error) {
      console.error('DALL-E diagram generation failed:', error)
      // Fallback to SVG generation
      return await this.generateSVGDiagram(request)
    }
  }

  /**
   * LATEX FORMULA RENDERING for chemical equations
   */
  async renderChemicalFormula(formula: string, context?: string): Promise<VisualResponse> {
    // Enhanced LaTeX with proper chemical notation
    const latexFormula = this.convertToChemicalLatex(formula)

    // Generate additional explanation if context provided
    let description = `Chemical formula: ${formula}`
    if (context) {
      description += ` - ${context}`
    }

    return {
      type: 'formula',
      latex: latexFormula,
      description,
      cost: 0, // LaTeX rendering is free
      timestamp: new Date(),
    }
  }

  /**
   * 3D MOLECULE VISUALIZATION
   */
  async generate3DMolecule(moleculeName: string): Promise<VisualResponse> {
    const moleculeData = this.getMoleculeData(moleculeName)

    if (!moleculeData) {
      throw new Error(`Molecule data not found for: ${moleculeName}`)
    }

    // Generate 3D visualization data in JSON format for Three.js
    const molecule3dData = {
      atoms: moleculeData.atoms,
      bonds: moleculeData.bonds,
      properties: moleculeData.properties,
      camera: {
        position: [0, 0, 20],
        rotation: [0, 0, 0],
      },
      lighting: {
        ambient: 0.4,
        directional: {
          color: '#ffffff',
          intensity: 0.8,
          position: [10, 10, 5],
        },
      },
      animation: {
        rotate: true,
        speed: 0.01,
      },
    }

    return {
      type: 'molecule',
      molecule3d: JSON.stringify(molecule3dData),
      description: `3D model of ${moleculeName} (${moleculeData.formula})`,
      cost: 0,
      timestamp: new Date(),
    }
  }

  /**
   * INTERACTIVE PROCESS FLOW DIAGRAMS
   */
  async generateProcessFlow(process: string, steps: string[]): Promise<VisualResponse> {
    const svgFlow = this.createProcessFlowSVG(process, steps)

    return {
      type: 'process_flow',
      svg: svgFlow,
      description: `Process flow diagram: ${process}`,
      cost: 0,
      timestamp: new Date(),
    }
  }

  /**
   * ANATOMY DIAGRAMS with labeling
   */
  async generateAnatomyDiagram(organ: string, labels: string[]): Promise<VisualResponse> {
    const request: VisualRequest = {
      type: 'anatomy',
      content: `Detailed anatomy diagram of ${organ} with labeled parts: ${labels.join(', ')}`,
      subject: 'Human Biology',
      complexity: 'detailed',
      style: 'educational',
      language: 'english',
    }

    const optimizedPrompt = `Medical illustration: Cross-section anatomy diagram of human ${organ},
      clearly labeled with: ${labels.join(', ')},
      educational style, high detail, scientific accuracy,
      clean white background, medical textbook quality`

    try {
      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: optimizedPrompt,
        size: '1024x1024',
        quality: 'hd',
        style: 'natural',
        n: 1,
      })

      return {
        type: 'anatomy',
        url: response.data[0].url,
        description: `Anatomy diagram: ${organ}`,
        cost: 0.04,
        timestamp: new Date(),
      }
    } catch (error) {
      console.error('Anatomy diagram generation failed:', error)
      return await this.generateSVGAnatomy(organ, labels)
    }
  }

  // Private helper methods

  private createDiagramPrompt(request: VisualRequest): string {
    const basePrompts = {
      diagram: 'Scientific biology diagram',
      molecule: '3D molecular structure',
      formula: 'Chemical equation visualization',
      process_flow: 'Biological process flowchart',
      anatomy: 'Anatomical illustration',
    }

    const complexityModifiers = {
      simple: 'simple, clear, basic level',
      detailed: 'detailed, comprehensive, intermediate level',
      advanced: 'highly detailed, advanced, research level',
    }

    const styleModifiers = {
      educational: 'textbook style, clean, educational',
      scientific: 'scientific journal quality, precise, professional',
      colorful: 'vibrant colors, engaging, student-friendly',
      monochrome: 'black and white, high contrast, classic',
    }

    return `${basePrompts[request.type]}: ${request.content},
      ${complexityModifiers[request.complexity]},
      ${styleModifiers[request.style]},
      biology textbook quality, clear labels,
      white background, high resolution`
  }

  private async generateSVGDiagram(request: VisualRequest): Promise<VisualResponse> {
    // Fallback SVG generation for common biology diagrams
    const svg = this.createBasicBiologySVG(request.content)

    return {
      type: 'diagram',
      svg,
      description: `SVG diagram: ${request.content}`,
      cost: 0,
      timestamp: new Date(),
    }
  }

  private convertToChemicalLatex(formula: string): string {
    // Convert common chemical notation to LaTeX
    let latex = formula

    // Handle subscripts (H2O -> H_2O)
    latex = latex.replace(/([A-Z][a-z]?)(\d+)/g, '$1_{$2}')

    // Handle superscripts for charges (Ca2+ -> Ca^{2+})
    latex = latex.replace(/(\d+)([+-])/g, '^{$1$2}')

    // Handle arrows for reactions
    latex = latex.replace(/->/g, '\\rightarrow')
    latex = latex.replace(/<->/g, '\\leftrightarrow')

    // Wrap in chemistry environment
    return `\\ce{${latex}}`
  }

  private getMoleculeData(moleculeName: string): MoleculeData | undefined {
    const name = moleculeName.toLowerCase()
    return this.moleculeDatabase.get(name)
  }

  private initializeMoleculeDatabase(): void {
    // Initialize with common biology molecules
    this.moleculeDatabase.set('glucose', {
      formula: 'C₆H₁₂O₆',
      smiles: 'C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O)O)O)O)O',
      atoms: [
        { element: 'C', x: 0, y: 0, z: 0 },
        { element: 'C', x: 1.5, y: 0, z: 0 },
        { element: 'C', x: 2.25, y: 1.3, z: 0 },
        { element: 'C', x: 1.5, y: 2.6, z: 0 },
        { element: 'C', x: 0, y: 2.6, z: 0 },
        { element: 'O', x: -0.75, y: 1.3, z: 0 },
        // Additional atoms for glucose...
      ],
      bonds: [
        { from: 0, to: 1, type: 'single' },
        { from: 1, to: 2, type: 'single' },
        { from: 2, to: 3, type: 'single' },
        // Additional bonds...
      ],
      properties: {
        molecularWeight: 180.16,
        meltingPoint: 146,
        solubility: 'Highly soluble in water',
      },
    })

    this.moleculeDatabase.set('atp', {
      formula: 'C₁₀H₁₆N₅O₁₃P₃',
      smiles:
        'C1=NC(=C2C(=N1)N(C=N2)[C@H]3[C@@H]([C@@H]([C@H](O3)COP(=O)(O)OP(=O)(O)OP(=O)(O)O)O)O)N',
      atoms: [
        // ATP structure atoms...
      ],
      bonds: [
        // ATP structure bonds...
      ],
      properties: {
        molecularWeight: 507.18,
        solubility: 'Soluble in water',
      },
    })

    this.moleculeDatabase.set('dna', {
      formula: '(C₁₀H₁₂N₅O₆P)ₙ',
      smiles: 'Nc1ncnc2c1ncn2[C@H]1O[C@H](COP(O)(O)=O)[C@@H](O)[C@H]1O',
      atoms: [
        // DNA nucleotide structure...
      ],
      bonds: [
        // DNA bonds...
      ],
      properties: {
        molecularWeight: 331.22, // per nucleotide
        solubility: 'Soluble in water',
      },
    })

    // Add more molecules as needed...
  }

  private createProcessFlowSVG(process: string, steps: string[]): string {
    const width = 800
    const height = 600
    const stepHeight = 80
    const stepWidth = 200
    const margin = 50

    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .step-box { fill: #e3f2fd; stroke: #1976d2; stroke-width: 2; }
          .step-text { font-family: Arial, sans-serif; font-size: 14px; text-anchor: middle; }
          .title { font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; text-anchor: middle; }
          .arrow { stroke: #1976d2; stroke-width: 2; marker-end: url(#arrowhead); }
        </style>
        <marker id="arrowhead" markerWidth="10" markerHeight="7"
                refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#1976d2" />
        </marker>
      </defs>

      <text x="${width / 2}" y="30" class="title">${process}</text>`

    steps.forEach((step, index) => {
      const x = margin + (index % 3) * (stepWidth + 50)
      const y = 80 + Math.floor(index / 3) * (stepHeight + 40)

      // Step box
      svg += `<rect x="${x}" y="${y}" width="${stepWidth}" height="${stepHeight}"
              class="step-box" rx="10"/>`

      // Step text
      const words = step.split(' ')
      const lines = []
      let currentLine = ''

      words.forEach((word) => {
        if ((currentLine + word).length <= 25) {
          currentLine += (currentLine ? ' ' : '') + word
        } else {
          if (currentLine) lines.push(currentLine)
          currentLine = word
        }
      })
      if (currentLine) lines.push(currentLine)

      lines.forEach((line, lineIndex) => {
        svg += `<text x="${x + stepWidth / 2}" y="${y + 30 + lineIndex * 16}"
                class="step-text">${line}</text>`
      })

      // Arrow to next step
      if (index < steps.length - 1) {
        const nextX = margin + ((index + 1) % 3) * (stepWidth + 50)
        const nextY = 80 + Math.floor((index + 1) / 3) * (stepHeight + 40)

        if (Math.floor(index / 3) === Math.floor((index + 1) / 3)) {
          // Horizontal arrow
          svg += `<line x1="${x + stepWidth}" y1="${y + stepHeight / 2}"
                  x2="${nextX}" y2="${nextY + stepHeight / 2}" class="arrow"/>`
        } else {
          // Vertical arrow
          svg += `<line x1="${x + stepWidth / 2}" y1="${y + stepHeight}"
                  x2="${nextX + stepWidth / 2}" y2="${nextY}" class="arrow"/>`
        }
      }
    })

    svg += '</svg>'
    return svg
  }

  private async generateSVGAnatomy(organ: string, labels: string[]): Promise<VisualResponse> {
    // Basic SVG anatomy diagram as fallback
    const svg = this.createBasicAnatomySVG(organ, labels)

    return {
      type: 'anatomy',
      svg,
      description: `SVG anatomy diagram: ${organ}`,
      cost: 0,
      timestamp: new Date(),
    }
  }

  private createBasicBiologySVG(content: string): string {
    // Generate basic SVG for common biology concepts
    if (content.toLowerCase().includes('cell')) {
      return this.createCellDiagramSVG()
    } else if (content.toLowerCase().includes('photosynthesis')) {
      return this.createPhotosynthesisSVG()
    } else {
      return this.createGenericBiologySVG(content)
    }
  }

  private createCellDiagramSVG(): string {
    return `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .cell-wall { fill: #8bc34a; stroke: #4caf50; stroke-width: 3; }
          .nucleus { fill: #ff9800; stroke: #f57c00; stroke-width: 2; }
          .mitochondria { fill: #e91e63; stroke: #c2185b; stroke-width: 1; }
          .label { font-family: Arial, sans-serif; font-size: 12px; }
        </style>
      </defs>

      <!-- Cell wall/membrane -->
      <ellipse cx="200" cy="150" rx="180" ry="120" class="cell-wall"/>

      <!-- Nucleus -->
      <ellipse cx="200" cy="150" rx="60" ry="40" class="nucleus"/>
      <text x="200" y="155" class="label" text-anchor="middle">Nucleus</text>

      <!-- Mitochondria -->
      <ellipse cx="120" cy="100" rx="25" ry="15" class="mitochondria"/>
      <text x="120" y="80" class="label" text-anchor="middle">Mitochondria</text>

      <ellipse cx="280" cy="200" rx="25" ry="15" class="mitochondria"/>
      <text x="280" y="220" class="label" text-anchor="middle">Mitochondria</text>

      <!-- Cell membrane label -->
      <text x="50" y="150" class="label">Cell Membrane</text>
      <line x1="70" y1="145" x2="110" y2="120" stroke="#333" stroke-width="1"/>

    </svg>`
  }

  private createPhotosynthesisSVG(): string {
    return `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .sun { fill: #ffeb3b; stroke: #ffc107; }
          .leaf { fill: #4caf50; stroke: #388e3c; }
          .arrow { stroke: #333; stroke-width: 2; marker-end: url(#arrowhead); }
          .formula { font-family: Arial, sans-serif; font-size: 14px; text-anchor: middle; }
        </style>
        <marker id="arrowhead" markerWidth="10" markerHeight="7"
                refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>

      <!-- Sun -->
      <circle cx="100" cy="80" r="40" class="sun"/>
      <text x="100" y="85" class="formula">Sun</text>

      <!-- Leaf -->
      <path d="M 250 150 Q 350 100 450 150 Q 350 200 250 150" class="leaf"/>
      <text x="350" y="155" class="formula">Chloroplast</text>

      <!-- CO2 input -->
      <text x="150" y="250" class="formula">6CO₂</text>
      <line x1="180" y1="240" x2="250" y2="180" class="arrow"/>

      <!-- H2O input -->
      <text x="150" y="300" class="formula">6H₂O</text>
      <line x1="180" y1="290" x2="250" y2="200" class="arrow"/>

      <!-- Light energy -->
      <text x="100" y="140" class="formula">Light Energy</text>
      <line x1="140" y1="120" x2="250" y2="140" class="arrow"/>

      <!-- Products -->
      <text x="500" y="200" class="formula">C₆H₁₂O₆</text>
      <line x1="450" y1="170" x2="480" y2="190" class="arrow"/>

      <text x="500" y="250" class="formula">6O₂</text>
      <line x1="450" y1="180" x2="480" y2="240" class="arrow"/>

      <!-- Equation -->
      <text x="300" y="350" class="formula">6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂</text>

    </svg>`
  }

  private createGenericBiologySVG(content: string): string {
    return `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="50" width="300" height="200" fill="#f5f5f5" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="16">
        ${content}
      </text>
      <text x="200" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#666">
        Diagram placeholder - Upgrade to premium for AI-generated visuals
      </text>
    </svg>`
  }

  private createBasicAnatomySVG(organ: string, labels: string[]): string {
    return `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .organ { fill: #ffcdd2; stroke: #d32f2f; stroke-width: 2; }
          .label { font-family: Arial, sans-serif; font-size: 12px; }
          .pointer { stroke: #333; stroke-width: 1; }
        </style>
      </defs>

      <!-- Basic organ shape -->
      <ellipse cx="200" cy="200" rx="100" ry="120" class="organ"/>

      <!-- Title -->
      <text x="200" y="30" text-anchor="middle" font-family="Arial, sans-serif"
            font-size="18" font-weight="bold">${organ}</text>

      <!-- Labels -->
      ${labels
        .map((label, index) => {
          const angle = (index * 2 * Math.PI) / labels.length
          const x = 200 + 150 * Math.cos(angle)
          const y = 200 + 150 * Math.sin(angle)
          const labelX = 200 + 80 * Math.cos(angle)
          const labelY = 200 + 80 * Math.sin(angle)

          return `
          <line x1="${labelX}" y1="${labelY}" x2="${x}" y2="${y}" class="pointer"/>
          <text x="${x}" y="${y}" class="label" text-anchor="middle">${label}</text>
        `
        })
        .join('')}

    </svg>`
  }
}
