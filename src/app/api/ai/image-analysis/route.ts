import { NextRequest, NextResponse } from 'next/server'
import { fetchWithRetry } from '@/lib/utils/fetchWithRetry'
import { auth } from '@/lib/auth/config'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const image = formData.get('image') as File
    const question =
      (formData.get('question') as string) || 'Analyze this biology image and explain what you see'
    const context = (formData.get('context') as string) || 'NEET Biology'

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')
    const imageDataUrl = `data:${image.type};base64,${base64Image}`

    const response = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'system',
            content: `You are an expert NEET Biology tutor with specialization in image analysis. Analyze biological images, diagrams, microscopy, specimens, and provide detailed educational explanations.

Context: ${context}

For each image analysis, provide:
1. **Identification**: What biological structure/process/organism is shown
2. **Detailed Explanation**: Scientific explanation with proper terminology
3. **NEET Relevance**: How this relates to NEET syllabus and exam patterns
4. **Key Points**: 3-5 important facts students should remember
5. **Related Topics**: Connected concepts for further study
6. **Mnemonics**: Memory aids if applicable
7. **Common Mistakes**: What students often confuse about this topic

Be accurate, educational, and exam-focused.`,
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: question,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageDataUrl,
                  detail: 'high',
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
      retryOptions: {
        maxRetries: 3,
        initialDelayMs: 1000,
        onRetry: (attempt, error) => {
        },
      },
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const result = await response.json()
    const analysis = result.choices[0].message.content

    // Parse the structured response
    const sections = parseAnalysisResponse(analysis)

    return NextResponse.json({
      success: true,
      data: {
        analysis: {
          full_response: analysis,
          identification: sections.identification,
          explanation: sections.explanation,
          neet_relevance: sections.neet_relevance,
          key_points: sections.key_points,
          related_topics: sections.related_topics,
          mnemonics: sections.mnemonics,
          common_mistakes: sections.common_mistakes,
        },
        metadata: {
          image_size: image.size,
          image_type: image.type,
          analysis_time: Date.now(),
          model_used: 'gpt-4-vision-preview',
          tokens_used: result.usage?.total_tokens || 0,
        },
        suggestions: [
          'Try asking about specific parts of the image',
          'Request for related practice questions',
          'Ask for memory techniques for this topic',
        ],
      },
    })
  } catch (error) {
    console.error('Image analysis error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to analyze image. Please try again.',
      },
      { status: 500 }
    )
  }
}

function parseAnalysisResponse(analysis: string) {
  const sections = {
    identification: '',
    explanation: '',
    neet_relevance: '',
    key_points: [],
    related_topics: [],
    mnemonics: '',
    common_mistakes: '',
  }

  try {
    // Extract sections using regex patterns
    const identificationMatch = analysis.match(/\*\*Identification\*\*:?\s*(.*?)(?=\*\*|$)/s)
    const explanationMatch = analysis.match(/\*\*Detailed Explanation\*\*:?\s*(.*?)(?=\*\*|$)/s)
    const neetMatch = analysis.match(/\*\*NEET Relevance\*\*:?\s*(.*?)(?=\*\*|$)/s)
    const keyPointsMatch = analysis.match(/\*\*Key Points\*\*:?\s*(.*?)(?=\*\*|$)/s)
    const relatedMatch = analysis.match(/\*\*Related Topics\*\*:?\s*(.*?)(?=\*\*|$)/s)
    const mnemonicsMatch = analysis.match(/\*\*Mnemonics\*\*:?\s*(.*?)(?=\*\*|$)/s)
    const mistakesMatch = analysis.match(/\*\*Common Mistakes\*\*:?\s*(.*?)(?=\*\*|$)/s)

    sections.identification = identificationMatch?.[1]?.trim() || ''
    sections.explanation = explanationMatch?.[1]?.trim() || ''
    sections.neet_relevance = neetMatch?.[1]?.trim() || ''
    sections.mnemonics = mnemonicsMatch?.[1]?.trim() || ''
    sections.common_mistakes = mistakesMatch?.[1]?.trim() || ''

    // Parse key points
    if (keyPointsMatch?.[1]) {
      sections.key_points = keyPointsMatch[1]
        .split(/\d+\.|\-/)
        .map((point) => point.trim())
        .filter((point) => point.length > 0)
        .slice(0, 5)
    }

    // Parse related topics
    if (relatedMatch?.[1]) {
      sections.related_topics = relatedMatch[1]
        .split(/,|\n|\-/)
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0)
        .slice(0, 5)
    }
  } catch (parseError) {
    console.error('Parse error:', parseError)
    // Return the full analysis if parsing fails
    sections.explanation = analysis
  }

  return sections
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    success: true,
    service: 'AI Image Analysis',
    status: 'operational',
    features: [
      'Biology image identification',
      'Microscopy analysis',
      'Diagram explanation',
      'NEET-focused content',
      'Structured learning output',
    ],
    supported_formats: ['PNG', 'JPG', 'JPEG', 'WEBP'],
    max_file_size: '10MB',
  })
}
