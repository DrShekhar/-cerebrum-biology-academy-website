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
    const audioFile = formData.get('audio') as File
    const action = (formData.get('action') as string) || 'transcribe_and_answer'
    const context = (formData.get('context') as string) || 'NEET Biology'

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 })
    }

    let transcription = ''

    // Step 1: Convert speech to text using OpenAI Whisper
    if (action === 'transcribe_and_answer' || action === 'transcribe_only') {
      const transcriptionFormData = new FormData()
      transcriptionFormData.append('file', audioFile)
      transcriptionFormData.append('model', 'whisper-1')
      transcriptionFormData.append('language', 'en')
      transcriptionFormData.append(
        'prompt',
        'This is a biology student asking questions about NEET preparation, cell biology, genetics, physiology, or other biology topics.'
      )

      const transcriptionResponse = await fetchWithRetry(
        'https://api.openai.com/v1/audio/transcriptions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: transcriptionFormData,
          retryOptions: {
            maxRetries: 3,
            initialDelayMs: 1000,
            onRetry: (attempt, error) => {
            },
          },
        }
      )

      if (!transcriptionResponse.ok) {
        throw new Error(`Transcription failed: ${transcriptionResponse.status}`)
      }

      const transcriptionResult = await transcriptionResponse.json()
      transcription = transcriptionResult.text
    }

    // Step 2: Generate AI response if needed
    let aiResponse = null
    if (action === 'transcribe_and_answer') {
      const chatResponse = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an expert NEET Biology tutor providing voice-based explanations. The student has asked a question via voice recording.

Context: ${context}

Provide clear, concise explanations that are:
- Easy to understand when spoken aloud
- Include pronunciation guides for difficult terms
- Use analogies and examples
- NEET exam focused
- Include memory techniques
- Structured for audio consumption

Format your response for text-to-speech conversion with natural pauses and emphasis.`,
            },
            {
              role: 'user',
              content: `Student's voice question: "${transcription}"`,
            },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
        retryOptions: {
          maxRetries: 3,
          initialDelayMs: 1000,
          onRetry: (attempt, error) => {
          },
        },
      })

      if (!chatResponse.ok) {
        throw new Error(`Chat API error: ${chatResponse.status}`)
      }

      const chatResult = await chatResponse.json()
      aiResponse = {
        text: chatResult.choices[0].message.content,
        tokens_used: chatResult.usage?.total_tokens || 0,
      }
    }

    // Step 3: Convert text response to speech (optional)
    let audioResponse = null
    if (action === 'transcribe_and_answer' && aiResponse) {
      try {
        const ttsResponse = await fetchWithRetry('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'tts-1',
            input: aiResponse.text,
            voice: 'nova',
            speed: 0.9,
          }),
          retryOptions: {
            maxRetries: 3,
            initialDelayMs: 1000,
            onRetry: (attempt, error) => {
            },
          },
        })

        if (ttsResponse.ok) {
          const audioBuffer = await ttsResponse.arrayBuffer()
          audioResponse = {
            audio_base64: Buffer.from(audioBuffer).toString('base64'),
            format: 'mp3',
            duration_estimate: Math.ceil(aiResponse.text.length / 10), // rough estimate
          }
        }
      } catch (ttsError) {
        console.error('TTS generation failed:', ttsError)
        // Continue without audio response
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        transcription: {
          text: transcription,
          confidence: 'high', // OpenAI doesn't provide confidence scores
          language: 'en',
          duration: audioFile.size > 100000 ? 'long' : 'short',
        },
        ai_response: aiResponse,
        audio_response: audioResponse,
        suggestions: [
          'Ask for clarification on specific terms',
          'Request examples or analogies',
          'Ask for related NEET questions',
          'Request memory techniques',
        ],
        metadata: {
          processing_time: Date.now(),
          audio_file_size: audioFile.size,
          audio_format: audioFile.type,
          action_performed: action,
          context: context,
        },
      },
    })
  } catch (error) {
    console.error('Voice processing error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process voice input. Please try again.',
      },
      { status: 500 }
    )
  }
}

// Health check and capabilities endpoint
export async function GET() {
  return NextResponse.json({
    success: true,
    service: 'AI Voice Processing',
    status: 'operational',
    capabilities: {
      speech_to_text: {
        model: 'whisper-1',
        languages: ['en', 'hi'],
        max_duration: '25 minutes',
        supported_formats: ['mp3', 'mp4', 'mpeg', 'mpga', 'm4a', 'wav', 'webm'],
      },
      text_to_speech: {
        model: 'tts-1',
        voices: ['nova', 'alloy', 'echo', 'fable', 'onyx', 'shimmer'],
        output_format: 'mp3',
        max_input_length: '4096 characters',
      },
      ai_tutoring: {
        model: 'gpt-4',
        specialization: 'NEET Biology',
        response_style: 'Audio-optimized explanations',
      },
    },
    features: [
      'Voice question transcription',
      'AI-powered biology explanations',
      'Text-to-speech responses',
      'NEET-focused content',
      'Real-time processing',
    ],
  })
}
