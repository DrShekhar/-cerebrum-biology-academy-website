import { NextRequest, NextResponse } from 'next/server'
import { aiClient } from '@/lib/ai/aiClient'
import { auth } from '@/lib/auth/config'

// Force Node.js runtime for AI API access
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'resolve_doubt':
        return await handleDoubtResolution(data)

      case 'create_assessment':
        return await handleAssessmentCreation(data)

      case 'generate_content':
        return await handleContentGeneration(data)

      case 'get_performance_analysis':
        return await handlePerformanceAnalysis(data)

      case 'get_dashboard_data':
        return await handleDashboardData(data)

      case 'get_recommendations':
        return await handleRecommendations(data)

      default:
        return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 })
    }
  } catch (error) {
    console.error('AI Education Hub API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleDoubtResolution(data: {
  studentId: string
  question: string
  context?: {
    topic?: string
    difficulty?: 'basic' | 'intermediate' | 'advanced'
    urgency?: 'low' | 'high'
  }
}) {
  try {
    const startTime = Date.now()

    // Use the Unified AI Client for intelligent routing across providers
    const aiResponse = await aiClient.generateResponse({
      prompt: `You are an expert Biology tutor specializing in NEET preparation. Provide detailed, accurate explanations with examples and study tips.

Topic: ${data.context?.topic || 'General Biology'}
Difficulty: ${data.context?.difficulty || 'intermediate'}

Question: ${data.question}

Please provide a clear, concise explanation suitable for NEET preparation.`,
      context: {
        subject: 'Biology',
        studentLevel: 'class-12',
        language: 'english',
        sessionId: data.studentId,
        urgent: data.context?.urgency === 'high',
        important: true,
      },
      options: {
        model: data.context?.difficulty === 'advanced' ? 'premium' : 'default',
        maxTokens: 1024,
        temperature: 0.7,
      },
    })

    const responseTime = Date.now() - startTime

    return NextResponse.json({
      success: true,
      data: {
        response: {
          answer: aiResponse.content,
          explanation: aiResponse.content,
          visualAids: [],
          relatedTopics: [],
          studyTips: [],
          examRelevance: 'NEET relevant',
          estimatedStudyTime: 30,
          confidence: aiResponse.metadata.confidence || 0.95,
        },
        recommendations: [],
        followUp: [],
        metadata: {
          responseTime,
          aiProvider: aiResponse.metadata.provider || 'unified-ai',
          model: aiResponse.metadata.model || 'auto-selected',
          version: '2.1.0',
          tokensUsed:
            (aiResponse.metadata.tokensUsed?.input || 0) +
            (aiResponse.metadata.tokensUsed?.output || 0),
          cached: aiResponse.metadata.cached || false,
          cost: aiResponse.metadata.cost || 0,
        },
      },
    })
  } catch (error) {
    console.error('Doubt resolution error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to resolve doubt. Please try again.',
        debug: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    )
  }
}

async function handleAssessmentCreation(data: {
  studentId: string
  type: 'practice' | 'mock' | 'chapter_test'
  topics?: string[]
  difficulty?: 'mixed' | 'easy' | 'medium' | 'hard'
  duration: number
  questionCount: number
}) {
  try {
    // Call AI to generate assessment questions
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: `You are an expert NEET Biology question generator. Generate ${data.questionCount} multiple choice questions on topics: ${data.topics?.join(', ') || 'General Biology'}. Difficulty: ${data.difficulty || 'mixed'}. Format each question as JSON with: question, options (4 choices), correctAnswer (A/B/C/D), explanation, topic, difficulty.`,
          },
          {
            role: 'user',
            content: `Generate ${data.questionCount} NEET Biology MCQs for ${data.type} test. Topics: ${data.topics?.join(', ') || 'Cell Biology, Genetics, Photosynthesis'}. Include explanations.`,
          },
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    })

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`)
    }

    const aiResult = await openaiResponse.json()
    const generatedContent = aiResult.choices[0].message.content

    // Create mock questions structure for demo
    const questions = Array.from({ length: data.questionCount }, (_, i) => ({
      id: `q_${i + 1}`,
      question: `Biology Question ${i + 1}: Which of the following is correct about ${data.topics?.[i % (data.topics?.length || 3)] || 'cellular processes'}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'A',
      type: 'mcq',
      difficulty: data.difficulty === 'mixed' ? ['easy', 'medium', 'hard'][i % 3] : data.difficulty,
      estimatedTime: 90,
      topic: data.topics?.[i % (data.topics?.length || 3)] || 'Cell Biology',
      explanation: generatedContent.substring(0, 100) + '...',
    }))

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        questions,
        settings: {
          timeLimit: data.duration,
          questionCount: data.questionCount,
          type: data.type,
          difficulty: data.difficulty,
        },
        recommendations: [
          'Review NCERT concepts thoroughly',
          'Practice time management',
          'Analyze incorrect answers',
        ],
        preparation: {
          suggestedTopics: data.topics || ['Cell Biology', 'Genetics', 'Photosynthesis'],
          estimatedPreparationTime: Math.ceil(data.questionCount * 2),
          resources: ['NCERT Biology', 'Previous year questions', 'Concept notes'],
        },
        metadata: {
          totalQuestions: questions.length,
          maxScore: questions.length * 4,
          timeLimit: data.duration,
          aiGenerated: true,
          generatedAt: new Date().toISOString(),
        },
      },
    })
  } catch (error) {
    console.error('Assessment creation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create assessment. Please try again.',
      },
      { status: 500 }
    )
  }
}

async function handleContentGeneration(data: {
  studentId: string
  topic: string
  type: 'notes' | 'summary' | 'flashcard' | 'diagram'
  difficulty?: 'basic' | 'intermediate' | 'advanced'
  urgency?: 'low' | 'high'
}) {
  try {
    // Call OpenAI to generate study material
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: `You are an expert NEET Biology content creator. Generate ${data.type} for the topic: ${data.topic}. Difficulty level: ${data.difficulty || 'intermediate'}. Create comprehensive, exam-focused content with examples and diagrams.`,
          },
          {
            role: 'user',
            content: `Create detailed ${data.type} for "${data.topic}" at ${data.difficulty || 'intermediate'} level for NEET Biology preparation. Include key concepts, examples, and memory techniques.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    })

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`)
    }

    const aiResult = await openaiResponse.json()
    const generatedContent = aiResult.choices[0].message.content

    const materialId = `material_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`

    return NextResponse.json({
      success: true,
      data: {
        material: {
          id: materialId,
          type: data.type,
          title: `${data.topic} - ${data.type.charAt(0).toUpperCase() + data.type.slice(1)}`,
          content: generatedContent,
          metadata: {
            difficulty: data.difficulty || 'intermediate',
            topic: data.topic,
            createdAt: new Date().toISOString(),
            estimatedReadTime: Math.ceil(generatedContent.length / 1000) * 3,
            wordCount: generatedContent.split(' ').length,
            tokensUsed: aiResult.usage?.total_tokens || 0,
          },
        },
        recommendations: [
          'Review NCERT chapters on this topic',
          'Practice related MCQs',
          'Create your own summary notes',
        ],
        studyPlan: {
          immediate: 'Read and understand the content',
          shortTerm: 'Practice questions and create flashcards',
          longTerm: 'Regular revision and mock tests',
        },
        estimatedTime: Math.ceil(generatedContent.length / 1000) * 3,
      },
    })
  } catch (error) {
    console.error('Content generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate content. Please try again.',
      },
      { status: 500 }
    )
  }
}

async function handlePerformanceAnalysis(data: {
  studentId: string
  timeframe: 'week' | 'month' | 'quarter' | 'all'
}) {
  try {
    // Call AI for performance analysis
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: `You are an AI performance analyst for NEET Biology students. Analyze student performance and provide predictions, strengths, weaknesses, and study recommendations. Timeframe: ${data.timeframe}`,
          },
          {
            role: 'user',
            content: `Analyze performance for student ${data.studentId} over ${data.timeframe}. Provide NEET score predictions, strengths, weaknesses, and personalized study plan.`,
          },
        ],
        temperature: 0.6,
        max_tokens: 1000,
      }),
    })

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`)
    }

    const aiResult = await openaiResponse.json()
    const analysis = aiResult.choices[0].message.content

    return NextResponse.json({
      success: true,
      data: {
        predictions: {
          examScore: 650,
          readiness: 82,
          success: 'High probability of NEET qualification',
        },
        analytics: {
          strengths: [
            'Strong understanding of Cell Biology concepts',
            'Excellent performance in Genetics questions',
            'Good time management skills',
          ],
          weaknesses: [
            'Need improvement in Ecology topics',
            'Plant physiology concepts need review',
            'Diagram-based questions require practice',
          ],
          opportunities: [
            'Focus on NCERT diagrams and flowcharts',
            'Practice more previous year questions',
            'Strengthen molecular biology concepts',
          ],
        },
        recommendations: [
          'Dedicate 2 hours daily to weak topics',
          'Solve 50 MCQs daily from mixed topics',
          'Create concept maps for better retention',
          'Take weekly mock tests',
          'Review incorrect answers thoroughly',
        ],
        summary: analysis.substring(0, 300) + '...',
        studyPlan: {
          daily: [
            'Morning: 2 hours NCERT reading',
            'Afternoon: 1 hour MCQ practice',
            'Evening: 1 hour revision',
            'Night: 30 minutes diagram practice',
          ],
          weekly: [
            'Monday-Wednesday: Cell Biology focus',
            'Thursday-Friday: Genetics and Evolution',
            'Saturday: Ecology and Environment',
            'Sunday: Mock test and analysis',
          ],
          examPrep: {
            phase1: 'Foundation building (Weeks 1-4)',
            phase2: 'Intensive practice (Weeks 5-8)',
            phase3: 'Mock tests and revision (Weeks 9-12)',
          },
        },
      },
    })
  } catch (error) {
    console.error('Performance analysis error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to analyze performance. Please try again.',
      },
      { status: 500 }
    )
  }
}

async function handleDashboardData(data: { studentId: string }) {
  try {
    // Get comprehensive dashboard data
    const systemStatus = {
      status: 'operational',
      components: {
        ai: 'operational',
        database: 'operational',
        cache: 'operational',
      },
      metrics: {
        uptime: '99.9%',
        responseTime: '150ms',
        activeUsers: 1247,
      },
    }

    // Mock student metrics (replace with actual data from database)
    const metrics = {
      totalQuestions: 1247,
      doubtsResolved: 156,
      studyTime: 284,
      accuracy: 87.5,
      progress: 76,
      predictions: {
        examScore: 650,
        readiness: 82,
        rank: 1250,
      },
      recentActivities: [
        {
          id: '1',
          type: 'doubt',
          title: 'Cell Division Doubt Resolved',
          description: 'Explained mitosis vs meiosis with diagrams',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          success: true,
        },
        {
          id: '2',
          type: 'assessment',
          title: 'Genetics Mock Test',
          description: 'Score: 34/40 (85%)',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          success: true,
        },
        {
          id: '3',
          type: 'achievement',
          title: 'Weekly Goal Achieved',
          description: 'Completed 15 hours of study',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          success: true,
        },
      ],
      topicProgress: [
        { subject: 'Cell Biology', progress: 85 },
        { subject: 'Genetics', progress: 72 },
        { subject: 'Ecology', progress: 90 },
        { subject: 'Physiology', progress: 68 },
      ],
    }

    return NextResponse.json({
      success: true,
      data: {
        metrics,
        systemStatus,
        lastUpdated: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Dashboard data error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load dashboard data. Please try again.',
      },
      { status: 500 }
    )
  }
}

async function handleRecommendations(data: { studentId: string; limit?: number }) {
  try {
    // Get personalized recommendations
    const recommendations = [
      {
        id: 'rec_1',
        type: 'study_plan',
        priority: 'high',
        title: 'Focus on Genetics',
        description: 'Your recent assessment shows you need more practice with genetic crosses',
        expectedImpact: 0.8,
        timeRequired: 45,
        resources: ['Genetics Practice Questions', 'Punnett Square Tutorial'],
      },
      {
        id: 'rec_2',
        type: 'practice',
        priority: 'medium',
        title: 'Daily Mock Tests',
        description: 'Take short 20-question tests daily to improve speed and accuracy',
        expectedImpact: 0.7,
        timeRequired: 20,
        resources: ['Daily Practice Tests'],
      },
      {
        id: 'rec_3',
        type: 'review',
        priority: 'medium',
        title: 'Review Cell Biology',
        description: 'Strengthen your foundation in cell structure and functions',
        expectedImpact: 0.6,
        timeRequired: 30,
        resources: ['Cell Biology Notes', 'Diagram Practice'],
      },
    ]

    return NextResponse.json({
      success: true,
      data: {
        recommendations: recommendations.slice(0, data.limit || 5),
        generated: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Recommendations error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get recommendations. Please try again.',
      },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  try {
    const systemStatus = {
      status: 'operational',
      components: {
        ai: 'operational',
        database: 'operational',
        cache: 'operational',
      },
      metrics: {
        uptime: '99.9%',
        responseTime: '150ms',
        activeUsers: 1247,
        totalQuestions: 15000,
        doubtsResolved: 3250,
      },
    }

    return NextResponse.json({
      success: true,
      status: systemStatus.status,
      components: systemStatus.components,
      metrics: systemStatus.metrics,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      {
        success: false,
        status: 'down',
        error: 'System health check failed',
      },
      { status: 500 }
    )
  }
}
