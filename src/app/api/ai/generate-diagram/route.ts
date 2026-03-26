import { Anthropic } from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'

let _anthropic: Anthropic | null = null
function getAnthropicClient(): Anthropic {
  if (!_anthropic) {
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' })
  }
  return _anthropic
}

const DIAGRAM_SYSTEM_PROMPT = `You are an expert NCERT Biology diagram generator for Indian students (Class 11, 12, NEET).

You generate interactive diagram specifications as JSON. The diagrams must be:
- Scientifically accurate per NCERT textbooks
- Labeled with standard NCERT terminology
- Include step-by-step walkthrough for processes

RULES:
- Node positions use normalized coordinates (0-1 range for both x and y)
- For 'cycle' type: nodes are placed automatically in a circle, positions are ignored
- For 'flowchart'/'sequence': position nodes top-to-bottom (y: 0 = top, 1 = bottom)
- For 'hierarchy': root at top (y: 0), leaves at bottom (y: 1)
- For 'labeled-diagram': position nodes where the structure would be anatomically
- For 'comparison': provide separate left/right node sets
- Every node MUST have a description (shown on hover) that explains the structure/function
- Steps should highlight relevant nodes and give NCERT-level explanations
- Use node styles: 'primary' (main), 'secondary' (support), 'highlight' (key), 'success' (products), 'danger' (inhibitors)
- Edge labels should show molecules/enzymes involved in the reaction

Return ONLY valid JSON. No markdown, no explanation outside JSON.`

const DIAGRAM_SCHEMA = {
  type: 'object' as const,
  properties: {
    type: {
      type: 'string' as const,
      enum: ['cycle', 'flowchart', 'labeled-diagram', 'comparison', 'hierarchy', 'sequence'],
    },
    title: { type: 'string' as const },
    subtitle: { type: 'string' as const },
    nodes: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          id: { type: 'string' as const },
          label: { type: 'string' as const },
          description: { type: 'string' as const },
          position: {
            type: 'object' as const,
            properties: {
              x: { type: 'number' as const },
              y: { type: 'number' as const },
            },
            required: ['x', 'y'],
          },
          style: {
            type: 'string' as const,
            enum: ['primary', 'secondary', 'highlight', 'faded', 'danger', 'success'],
          },
          color: { type: 'string' as const },
          size: { type: 'number' as const },
          group: { type: 'string' as const },
        },
        required: ['id', 'label', 'description', 'position'],
      },
    },
    edges: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          from: { type: 'string' as const },
          to: { type: 'string' as const },
          label: { type: 'string' as const },
          type: {
            type: 'string' as const,
            enum: ['arrow', 'bidirectional', 'dashed', 'inhibit'],
          },
          color: { type: 'string' as const },
        },
        required: ['from', 'to'],
      },
    },
    annotations: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          text: { type: 'string' as const },
          position: {
            type: 'object' as const,
            properties: {
              x: { type: 'number' as const },
              y: { type: 'number' as const },
            },
            required: ['x', 'y'],
          },
          fontSize: { type: 'number' as const },
        },
        required: ['text', 'position'],
      },
    },
    steps: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          stepNumber: { type: 'number' as const },
          highlightNodes: {
            type: 'array' as const,
            items: { type: 'string' as const },
          },
          highlightEdges: {
            type: 'array' as const,
            items: { type: 'string' as const },
          },
          explanation: { type: 'string' as const },
        },
        required: ['stepNumber', 'highlightNodes', 'explanation'],
      },
    },
    left: {
      type: 'object' as const,
      properties: {
        title: { type: 'string' as const },
        nodes: {
          type: 'array' as const,
          items: {
            type: 'object' as const,
            properties: {
              id: { type: 'string' as const },
              label: { type: 'string' as const },
              description: { type: 'string' as const },
              position: {
                type: 'object' as const,
                properties: {
                  x: { type: 'number' as const },
                  y: { type: 'number' as const },
                },
                required: ['x', 'y'],
              },
              style: { type: 'string' as const },
              color: { type: 'string' as const },
            },
            required: ['id', 'label', 'description', 'position'],
          },
        },
        edges: {
          type: 'array' as const,
          items: {
            type: 'object' as const,
            properties: {
              from: { type: 'string' as const },
              to: { type: 'string' as const },
              label: { type: 'string' as const },
              type: { type: 'string' as const },
            },
            required: ['from', 'to'],
          },
        },
      },
      required: ['title', 'nodes'],
    },
    right: {
      type: 'object' as const,
      properties: {
        title: { type: 'string' as const },
        nodes: {
          type: 'array' as const,
          items: {
            type: 'object' as const,
            properties: {
              id: { type: 'string' as const },
              label: { type: 'string' as const },
              description: { type: 'string' as const },
              position: {
                type: 'object' as const,
                properties: {
                  x: { type: 'number' as const },
                  y: { type: 'number' as const },
                },
                required: ['x', 'y'],
              },
              style: { type: 'string' as const },
              color: { type: 'string' as const },
            },
            required: ['id', 'label', 'description', 'position'],
          },
        },
        edges: {
          type: 'array' as const,
          items: {
            type: 'object' as const,
            properties: {
              from: { type: 'string' as const },
              to: { type: 'string' as const },
              label: { type: 'string' as const },
              type: { type: 'string' as const },
            },
            required: ['from', 'to'],
          },
        },
      },
      required: ['title', 'nodes'],
    },
    sharedFeatures: {
      type: 'array' as const,
      items: { type: 'string' as const },
    },
    differences: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          left: { type: 'string' as const },
          right: { type: 'string' as const },
        },
        required: ['left', 'right'],
      },
    },
  },
  required: ['type', 'title'],
}

interface GenerateDiagramRequest {
  topic: string
  classLevel?: '11' | '12' | 'neet'
  diagramType?: string
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body: GenerateDiagramRequest = await request.json()

    if (!body.topic) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: topic' },
        { status: 400 }
      )
    }

    const client = getAnthropicClient()

    const userPrompt = `Generate an interactive biology diagram for ${body.classLevel ? `Class ${body.classLevel}` : 'NEET'} students.

Topic: ${body.topic}
${body.diagramType ? `Diagram type: ${body.diagramType}` : 'Auto-detect the best diagram type for this topic.'}

Requirements:
- Include at least 6 nodes with detailed descriptions
- Include edges showing relationships/flow between nodes
- Include a step-by-step walkthrough (steps array) with 4-8 steps
- All terminology must match NCERT textbook
- Descriptions should be exam-relevant (mention key facts students need to remember)
- For comparison type: include both sharedFeatures and differences arrays`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20241022',
      max_tokens: 4096,
      system: DIAGRAM_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const textContent = response.content.find((c) => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      return NextResponse.json(
        { success: false, error: 'No text response from AI' },
        { status: 500 }
      )
    }

    let diagramJson = textContent.text.trim()
    if (diagramJson.startsWith('```')) {
      diagramJson = diagramJson.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }

    const diagram = JSON.parse(diagramJson)

    return NextResponse.json({
      success: true,
      data: diagram,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    })
  } catch (error) {
    console.error('Generate diagram error:', error)

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: 'Failed to parse AI response as valid diagram JSON' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to generate diagram' },
      { status: 500 }
    )
  }
}
