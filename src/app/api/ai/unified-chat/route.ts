// Unified AI Chat API - With streaming support for faster perceived response
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'

export const runtime = 'nodejs'

interface ChatRequest {
  message: string
  stream?: boolean
  context?: {
    subject?: string
    studentLevel?: string
    language?: string
    sessionId?: string
    userId?: string
  }
  options?: {
    provider?: string
    model?: 'fast' | 'default' | 'premium'
  }
}

// Biology knowledge base for intelligent responses
const biologyResponses: Record<string, Record<string, string>> = {
  english: {
    cell: 'Cell division is a fundamental biological process where one parent cell divides to form two identical daughter cells. The main types are mitosis (for growth and repair) and meiosis (for gamete formation). Key phases of mitosis include prophase, metaphase, anaphase, and telophase. The cell cycle is regulated by checkpoints to ensure proper division.',
    photosynthesis:
      'Photosynthesis converts light energy into chemical energy in plants. The equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. It occurs in two stages: light reactions (in thylakoids) produce ATP and NADPH, while dark reactions (Calvin cycle in stroma) fix CO₂ into glucose.',
    dna: "DNA (Deoxyribonucleic acid) has a double helix structure discovered by Watson and Crick in 1953. It contains four nitrogenous bases: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). Base pairing follows Chargaff's rules: A pairs with T, G pairs with C.",
    neet: 'NEET Biology syllabus covers 360 marks (50% of total). Major topics: Diversity in Living World, Structural Organization, Cell Structure, Plant Physiology, Human Physiology, Reproduction, Genetics, Evolution, Biology and Human Welfare, Biotechnology, and Ecology.',
    respiration:
      'Cellular respiration is the process of breaking down glucose to produce ATP energy. It occurs in three stages: Glycolysis (in cytoplasm), Krebs cycle (in mitochondrial matrix), and Electron transport chain (in inner mitochondrial membrane). The overall equation is: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP.',
    ecosystem:
      'An ecosystem consists of biotic (living) and abiotic (non-living) components. Energy flow is unidirectional through trophic levels: Producers → Primary consumers → Secondary consumers → Tertiary consumers. Nutrient cycling occurs through biogeochemical cycles.',
    evolution:
      "Evolution is the change in species over time through natural selection. Darwin's theory proposes that organisms with favorable traits survive and reproduce more successfully. Evidence includes fossil records, comparative anatomy, embryology, and molecular biology.",
    default:
      'Biology is the study of living organisms and their interactions. Core branches include Botany (plant biology), Zoology (animal biology), Genetics (heredity), Ecology (environmental interactions), Evolution (species development), Cell Biology, and Molecular Biology.',
  },
  hindi: {
    cell: 'कोशिका विभाजन एक मौलिक जैविक प्रक्रिया है जहाँ एक मूल कोशिका दो समान संतति कोशिकाओं में विभाजित होती है। मुख्य प्रकार हैं माइटोसिस (वृद्धि और मरम्मत के लिए) और मियोसिस (युग्मक निर्माण के लिए)।',
    photosynthesis:
      'प्रकाश संश्लेषण पौधों में प्रकाश ऊर्जा को रासायनिक ऊर्जा में परिवर्तित करने की प्रक्रिया है। समीकरण: 6CO₂ + 6H₂O + प्रकाश ऊर्जा → C₆H₁₂O₆ + 6O₂।',
    dna: 'डीएनए (डिऑक्सीराइबोन्यूक्लिक एसिड) की डबल हेलिक्स संरचना है। इसमें चार नाइट्रोजनस बेस हैं: एडेनिन (A), थाइमिन (T), ग्वानिन (G), और साइटोसिन (C)।',
    neet: 'नीट जीव विज्ञान में 360 अंक हैं (कुल का 50%)। मुख्य विषय: जीवन की विविधता, संरचनात्मक संगठन, कोशिका संरचना, पादप शरीरक्रिया, मानव शरीरक्रिया, प्रजनन, आनुवंशिकता।',
    default:
      'जीव विज्ञान जीवित जीवों और उनकी अंतर्क्रियाओं का अध्ययन है। मुख्य शाखाएं हैं: वनस्पति विज्ञान, जंतु विज्ञान, आनुवंशिकता, पारिस्थितिकी, विकास।',
  },
  hinglish: {
    cell: 'Cell division एक fundamental biological process है जहाँ एक parent cell दो identical daughter cells में divide होती है। Main types हैं mitosis (growth और repair के लिए) और meiosis (gamete formation के लिए)।',
    photosynthesis:
      'Photosynthesis plants में light energy को chemical energy में convert करने का process है। Equation है: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂।',
    dna: 'DNA (Deoxyribonucleic acid) की double helix structure है जो Watson और Crick ने 1953 में discover की थी। इसमें four nitrogenous bases हैं: A, T, G, C।',
    neet: 'NEET Biology में 360 marks हैं total 720 में से (50%)। Major topics include: Diversity in Living World, Cell Structure, Plant Physiology, Human Physiology, Reproduction, Genetics।',
    default:
      'Biology living organisms और unki interactions का study है। Core branches include: Botany, Zoology, Genetics, Ecology, Evolution, Cell Biology।',
  },
}

function getResponse(message: string, language: string = 'english'): string {
  const input = message.toLowerCase()
  const responses = biologyResponses[language] || biologyResponses.english

  if (
    input.includes('cell') ||
    input.includes('कोशिका') ||
    input.includes('mitosis') ||
    input.includes('meiosis')
  ) {
    return responses.cell
  }
  if (
    input.includes('photosynthesis') ||
    input.includes('प्रकाश संश्लेषण') ||
    input.includes('chlorophyll')
  ) {
    return responses.photosynthesis
  }
  if (input.includes('dna') || input.includes('डीएनए') || input.includes('gene')) {
    return responses.dna
  }
  if (input.includes('neet') || input.includes('नीट') || input.includes('exam')) {
    return responses.neet
  }
  if (input.includes('respiration') || input.includes('breathing')) {
    return responses.respiration || responses.default
  }
  if (input.includes('ecosystem') || input.includes('ecology')) {
    return responses.ecosystem || responses.default
  }
  if (input.includes('evolution') || input.includes('darwin')) {
    return responses.evolution || responses.default
  }

  return responses.default
}

// Streaming POST endpoint
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as ChatRequest
    const { message, stream = false, context } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    const language = context?.language || 'english'
    const responseText = getResponse(message, language)

    // If streaming is requested, return SSE stream
    if (stream) {
      const encoder = new TextEncoder()

      const readable = new ReadableStream({
        async start(controller) {
          // Send start event
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'start', timestamp: Date.now() })}\n\n`)
          )

          // Stream response word by word for natural feel
          const words = responseText.split(' ')
          for (let i = 0; i < words.length; i++) {
            const chunk = {
              type: 'token',
              content: words[i] + (i < words.length - 1 ? ' ' : ''),
              progress: Math.round(((i + 1) / words.length) * 100),
            }
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`))

            // Small delay between words for natural typing effect
            await new Promise((resolve) => setTimeout(resolve, 30))
          }

          // Send completion event
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'done',
                timestamp: Date.now(),
                metadata: {
                  provider: 'ceri-ai',
                  model: 'biology-tutor',
                  tokensUsed: words.length,
                },
              })}\n\n`
            )
          )

          controller.close()
        },
      })

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no',
        },
      })
    }

    // Non-streaming response (existing behavior)
    return NextResponse.json({
      success: true,
      response: responseText,
      message: responseText,
      metadata: {
        provider: 'ceri-ai',
        model: 'biology-tutor',
        responseTime: 100,
        cached: false,
        cost: 0,
        tokensUsed: responseText.split(' ').length,
      },
      context: {
        sessionId: context?.sessionId || `session_${Date.now()}`,
        messageId: `msg_${Date.now()}`,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('AI Chat Error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process chat message',
        message:
          'I apologize, but I encountered an error. Please try again or contact support at +91 88264 44334.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

// GET endpoint for chat capabilities and status
export async function GET() {
  return NextResponse.json({
    status: 'operational',
    streaming: true,
    capabilities: {
      providers: ['ceri-ai'],
      defaultProvider: 'ceri-ai',
      models: ['biology-tutor'],
      features: [
        'Biology Q&A',
        'NEET preparation',
        'Multi-language support (English, Hindi, Hinglish)',
        'Streaming responses',
      ],
    },
    languages: ['english', 'hindi', 'hinglish'],
    topics: [
      'Cell Biology',
      'Photosynthesis',
      'DNA & Genetics',
      'NEET Syllabus',
      'Respiration',
      'Ecosystem',
      'Evolution',
    ],
    contact: '+91 88264 44334',
    timestamp: new Date().toISOString(),
  })
}
