// AI Question Generator API Endpoint
// Connects the existing questionGenerator service with unified AI client

import { NextRequest, NextResponse } from 'next/server'
import { aiClient } from '@/lib/ai/aiClient'

interface QuestionRequest {
  topics: string[]
  curriculum: 'NEET' | 'CBSE' | 'ICSE' | 'IB' | 'IGCSE'
  grade: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed'
  questionCount: number
  questionTypes: ('MCQ' | 'SHORT_ANSWER' | 'DIAGRAM' | 'TRUE_FALSE')[]
  timeLimit?: number
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topics, curriculum, grade, difficulty, questionCount, questionTypes, timeLimit } =
      body as QuestionRequest

    // Validate input
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json({ error: 'Topics are required' }, { status: 400 })
    }

    if (!questionCount || questionCount < 1 || questionCount > 50) {
      return NextResponse.json(
        { error: 'Question count must be between 1 and 50' },
        { status: 400 }
      )
    }

    // Generate prompt for AI
    const prompt = `Generate ${questionCount} biology questions for ${curriculum} ${grade} covering these topics: ${topics.join(', ')}.

Requirements:
- Difficulty: ${difficulty}
- Question types: ${questionTypes.join(', ')}
- Each question should be NEET-focused and curriculum-aligned
- Include detailed explanations
- Mark appropriate difficulty and estimated time

For each question, provide:
1. Question text
2. Options (for MCQ)
3. Correct answer
4. Detailed explanation
5. Topic and subtopic
6. Difficulty level
7. Estimated time to solve
8. Marks allocation

Format as JSON array of questions.`

    // Use unified AI client
    const aiResponse = await aiClient.generateResponse({
      prompt,
      context: {
        subject: 'Biology',
        studentLevel: grade as any,
        language: 'english',
      },
      options: {
        model: 'premium', // Use best model for question generation
        maxTokens: 4000,
        temperature: 0.7,
      },
    })

    if (!aiResponse.success) {
      throw new Error(aiResponse.error || 'Failed to generate questions')
    }

    // Parse AI response and structure questions
    let questions
    try {
      questions = JSON.parse(aiResponse.content || '[]')
    } catch (error) {
      // Fallback: extract questions from text response
      questions = parseQuestionsFromText(aiResponse.content || '')
    }

    // Calculate test paper metadata
    const totalMarks = questions.reduce((sum: number, q: any) => sum + (q.marks || 4), 0)
    const estimatedTime = questions.reduce(
      (sum: number, q: any) => sum + (q.estimatedTime || 120),
      0
    )

    const testPaper = {
      id: `test_${Date.now()}`,
      title: `${curriculum} Biology Test - ${topics.join(', ')}`,
      questions: questions.map((q: any, index: number) => ({
        id: `q_${index + 1}`,
        ...q,
        marks: q.marks || 4,
        estimatedTime: q.estimatedTime || 120,
      })),
      totalMarks,
      estimatedTime,
      instructions: [
        `This test contains ${questionCount} questions`,
        `Total marks: ${totalMarks}`,
        `Estimated time: ${Math.ceil(estimatedTime / 60)} minutes`,
        'Read all questions carefully before answering',
        'Manage your time effectively',
      ],
      metadata: {
        provider: aiResponse.metadata.provider,
        model: aiResponse.metadata.model,
        cost: aiResponse.metadata.cost,
        responseTime: aiResponse.metadata.responseTime,
        generatedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      testPaper,
      metadata: aiResponse.metadata,
    })
  } catch (error) {
    console.error('Question Generator API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate questions',
        message: 'Please try again with different parameters',
      },
      { status: 500 }
    )
  }
}

// Fallback question parser for non-JSON responses
function parseQuestionsFromText(text: string): any[] {
  // Simple fallback - in production, implement more sophisticated parsing
  const lines = text.split('\n').filter((line) => line.trim())
  const questions = []

  for (let i = 0; i < Math.min(lines.length / 6, 10); i++) {
    questions.push({
      question: lines[i * 6] || `Biology Question ${i + 1}`,
      type: 'MCQ',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      explanation: 'Detailed explanation would be provided here.',
      topic: 'Biology',
      difficulty: 'Medium',
      marks: 4,
      estimatedTime: 120,
    })
  }

  return questions
}

// GET endpoint for question types and topics
export async function GET(request: NextRequest) {
  const availableTopics = {
    'class-11': [
      'Diversity in Living World',
      'Structural Organisation in Plants and Animals',
      'Cell Structure and Function',
      'Plant Physiology',
      'Human Physiology',
    ],
    'class-12': [
      'Reproduction',
      'Genetics and Evolution',
      'Biology and Human Welfare',
      'Biotechnology and its Applications',
      'Ecology and Environment',
    ],
    'neet-dropper': [
      'All NEET Syllabus Topics',
      'Previous Year Questions',
      'Mock Test Series',
      'Revision Questions',
    ],
  }

  const questionTypes = [
    { value: 'MCQ', label: 'Multiple Choice Questions' },
    { value: 'SHORT_ANSWER', label: 'Short Answer Questions' },
    { value: 'DIAGRAM', label: 'Diagram Based Questions' },
    { value: 'TRUE_FALSE', label: 'True/False Questions' },
  ]

  return NextResponse.json({
    availableTopics,
    questionTypes,
    curricula: ['NEET', 'CBSE', 'ICSE', 'IB', 'IGCSE'],
    difficulties: ['Easy', 'Medium', 'Hard', 'Mixed'],
  })
}
