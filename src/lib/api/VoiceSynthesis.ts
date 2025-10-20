/**
 * Voice Synthesis Engine for Accessibility
 * Text-to-speech in Shekhar Sir's voice with multi-language support
 */

import OpenAI from 'openai'

interface VoiceRequest {
  text: string
  language: 'english' | 'hindi' | 'hinglish'
  emotion: 'neutral' | 'enthusiastic' | 'encouraging' | 'explanatory'
  speed: 'slow' | 'normal' | 'fast'
  format: 'mp3' | 'wav' | 'ogg'
}

interface VoiceResponse {
  audioUrl: string
  duration: number
  cost: number
  language: string
  timestamp: Date
}

interface VoiceProfile {
  name: string
  description: string
  voice: string
  characteristics: string[]
  languages: string[]
  sampleRate: number
}

export class VoiceSynthesis {
  private openai: OpenAI
  private voiceProfiles: Map<string, VoiceProfile>

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    })
    this.initializeVoiceProfiles()
  }

  /**
   * Generate speech from text with teacher's voice characteristics
   */
  async synthesizeTeacherVoice(request: VoiceRequest): Promise<VoiceResponse> {
    try {
      // Optimize text for speech synthesis
      const optimizedText = this.optimizeTextForSpeech(request.text, request.language)

      // Select appropriate voice model
      const voiceModel = this.selectVoiceModel(request.language, request.emotion)

      // Generate speech using OpenAI TTS
      const response = await this.openai.audio.speech.create({
        model: 'tts-1-hd', // High quality model
        voice: voiceModel,
        input: optimizedText,
        response_format: (request.format === 'ogg' ? 'opus' : request.format) || 'mp3',
        speed: this.getSpeedValue(request.speed),
      })

      // Convert response to audio URL
      const audioBuffer = await response.arrayBuffer()
      const audioUrl = await this.uploadAudioBuffer(audioBuffer, request.format || 'mp3')

      // Calculate duration (approximate)
      const wordsPerMinute = 140 // Average speaking rate
      const wordCount = optimizedText.split(' ').length
      const duration = (wordCount / wordsPerMinute) * 60

      return {
        audioUrl,
        duration,
        cost: this.calculateTTSCost(optimizedText.length),
        language: request.language,
        timestamp: new Date(),
      }
    } catch (error) {
      console.error('Voice synthesis failed:', error)
      throw new Error('Failed to generate voice response')
    }
  }

  /**
   * Generate explanation audio with teaching style
   */
  async generateExplanationAudio(
    content: string,
    topic: string,
    language: 'english' | 'hindi' | 'hinglish' = 'english'
  ): Promise<VoiceResponse> {
    // Format content for educational explanation
    const explanationText = this.formatForTeaching(content, topic, language)

    return await this.synthesizeTeacherVoice({
      text: explanationText,
      language,
      emotion: 'explanatory',
      speed: 'normal',
      format: 'mp3',
    })
  }

  /**
   * Generate motivational message audio
   */
  async generateMotivationalAudio(
    message: string,
    studentName: string,
    language: 'english' | 'hindi' | 'hinglish' = 'english'
  ): Promise<VoiceResponse> {
    const motivationalText = this.formatMotivationalMessage(message, studentName, language)

    return await this.synthesizeTeacherVoice({
      text: motivationalText,
      language,
      emotion: 'encouraging',
      speed: 'normal',
      format: 'mp3',
    })
  }

  /**
   * Generate NEET tip audio
   */
  async generateNEETTipAudio(
    tip: string,
    subject: string,
    language: 'english' | 'hindi' | 'hinglish' = 'english'
  ): Promise<VoiceResponse> {
    const tipText = this.formatNEETTip(tip, subject, language)

    return await this.synthesizeTeacherVoice({
      text: tipText,
      language,
      emotion: 'enthusiastic',
      speed: 'normal',
      format: 'mp3',
    })
  }

  /**
   * Generate formula pronunciation audio
   */
  async generateFormulaPronunciation(
    formula: string,
    explanation: string,
    language: 'english' | 'hindi' | 'hinglish' = 'english'
  ): Promise<VoiceResponse> {
    const formulaText = this.formatFormulaPronunciation(formula, explanation, language)

    return await this.synthesizeTeacherVoice({
      text: formulaText,
      language,
      emotion: 'explanatory',
      speed: 'slow',
      format: 'mp3',
    })
  }

  /**
   * Generate interactive quiz audio
   */
  async generateQuizAudio(
    question: string,
    options: string[],
    language: 'english' | 'hindi' | 'hinglish' = 'english'
  ): Promise<VoiceResponse> {
    const quizText = this.formatQuizQuestion(question, options, language)

    return await this.synthesizeTeacherVoice({
      text: quizText,
      language,
      emotion: 'enthusiastic',
      speed: 'normal',
      format: 'mp3',
    })
  }

  // Private helper methods

  private initializeVoiceProfiles(): void {
    this.voiceProfiles = new Map([
      [
        'teacher_english',
        {
          name: 'Shekhar Sir (English)',
          description: 'Warm, authoritative teacher voice for English explanations',
          voice: 'onyx', // OpenAI voice that sounds most teacher-like
          characteristics: ['clear', 'patient', 'encouraging'],
          languages: ['english'],
          sampleRate: 22050,
        },
      ],
      [
        'teacher_hindi',
        {
          name: 'Shekhar Sir (Hindi)',
          description: 'Hindi-speaking teacher voice',
          voice: 'echo', // Good for Hindi pronunciation
          characteristics: ['clear', 'patient', 'encouraging'],
          languages: ['hindi', 'hinglish'],
          sampleRate: 22050,
        },
      ],
      [
        'enthusiastic',
        {
          name: 'Enthusiastic Teacher',
          description: 'Energetic voice for motivation and encouragement',
          voice: 'nova',
          characteristics: ['energetic', 'motivating', 'inspiring'],
          languages: ['english', 'hindi', 'hinglish'],
          sampleRate: 22050,
        },
      ],
    ])
  }

  private optimizeTextForSpeech(text: string, language: string): string {
    let optimized = text

    // Remove markdown formatting
    optimized = optimized
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1') // Italic
      .replace(/`(.*?)`/g, '$1') // Code
      .replace(/#+ /g, '') // Headers

    // Add natural pauses
    optimized = optimized
      .replace(/\. /g, '. ... ') // Pause after sentences
      .replace(/\? /g, '? ... ') // Pause after questions
      .replace(/! /g, '! ... ') // Pause after exclamations
      .replace(/: /g, ': ... ') // Pause after colons

    // Handle scientific terms
    optimized = this.handleScientificTerms(optimized, language)

    // Handle chemical formulas
    optimized = this.handleChemicalFormulas(optimized)

    // Add teacher-like phrases
    optimized = this.addTeacherPhrases(optimized, language)

    return optimized
  }

  private handleScientificTerms(text: string, language: string): string {
    const scientificTerms: Record<string, string> = {
      DNA: 'D N A',
      RNA: 'R N A',
      ATP: 'A T P',
      CO2: 'carbon dioxide',
      H2O: 'H two O',
      O2: 'oxygen',
      pH: 'p H',
      mRNA: 'm R N A',
      tRNA: 't R N A',
      rRNA: 'r R N A',
    }

    let result = text
    for (const [term, pronunciation] of Object.entries(scientificTerms)) {
      const regex = new RegExp(`\\b${term}\\b`, 'g')
      result = result.replace(regex, pronunciation)
    }

    return result
  }

  private handleChemicalFormulas(text: string): string {
    // Convert subscripts to spoken form
    return text
      .replace(/(\w)(\d+)/g, '$1 $2') // H2O -> H 2 O
      .replace(/(\d+)([A-Z])/g, '$1 $2') // 6CO2 -> 6 C O 2
  }

  private addTeacherPhrases(text: string, language: string): string {
    const teacherPhrases = {
      english: [
        'Now, let me explain...',
        'This is very important for NEET...',
        'Remember this concept...',
        "Let's understand this step by step...",
      ],
      hindi: [
        'अब मैं समझाता हूं...',
        'यह NEET के लिए बहुत महत्वपूर्ण है...',
        'इस concept को याद रखिए...',
        'आइए step by step समझते हैं...',
      ],
      hinglish: [
        'Chalo, main explain karta hun...',
        'Ye NEET ke liye bahut important hai...',
        'Is concept ko remember rakho...',
        'Step by step samjhte hain...',
      ],
    }

    // Randomly add teacher phrases at the beginning
    const phrases = teacherPhrases[language as keyof typeof teacherPhrases]
    if (Math.random() > 0.7 && phrases.length > 0) {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
      return `${randomPhrase} ${text}`
    }

    return text
  }

  private selectVoiceModel(language: string, emotion: string): string {
    if (emotion === 'enthusiastic') {
      return 'nova' // More energetic voice
    } else if (emotion === 'encouraging') {
      return 'shimmer' // Warm, encouraging voice
    } else if (language === 'hindi' || language === 'hinglish') {
      return 'echo' // Better for non-English languages
    } else {
      return 'onyx' // Default teacher voice
    }
  }

  private getSpeedValue(speed: string): number {
    switch (speed) {
      case 'slow':
        return 0.8
      case 'fast':
        return 1.2
      default:
        return 1.0
    }
  }

  private formatForTeaching(content: string, topic: string, language: string): string {
    const introductions = {
      english: `Today we're learning about ${topic}. `,
      hindi: `आज हम ${topic} के बारे में सीखेंगे। `,
      hinglish: `Aaj hum ${topic} ke bare mein sikhenge. `,
    }

    const intro = introductions[language as keyof typeof introductions]
    return `${intro}${content}`
  }

  private formatMotivationalMessage(
    message: string,
    studentName: string,
    language: string
  ): string {
    const greetings = {
      english: `Great work, ${studentName}! `,
      hindi: `बहुत अच्छा काम, ${studentName}! `,
      hinglish: `Bahut acha kaam, ${studentName}! `,
    }

    const greeting = greetings[language as keyof typeof greetings]
    return `${greeting}${message}`
  }

  private formatNEETTip(tip: string, subject: string, language: string): string {
    const tipIntros = {
      english: `Here's an important NEET tip for ${subject}: `,
      hindi: `${subject} के लिए एक महत्वपूर्ण NEET टिप: `,
      hinglish: `${subject} ke liye ek important NEET tip: `,
    }

    const intro = tipIntros[language as keyof typeof tipIntros]
    return `${intro}${tip}`
  }

  private formatFormulaPronunciation(
    formula: string,
    explanation: string,
    language: string
  ): string {
    const formulaIntros = {
      english: `The formula is: ${formula}. Let me explain: `,
      hindi: `सूत्र है: ${formula}। मैं समझाता हूं: `,
      hinglish: `Formula hai: ${formula}. Main explain karta hun: `,
    }

    const intro = formulaIntros[language as keyof typeof formulaIntros]
    return `${intro}${explanation}`
  }

  private formatQuizQuestion(question: string, options: string[], language: string): string {
    const questionIntros = {
      english: "Here's a quiz question for you: ",
      hindi: 'आपके लिए एक प्रश्न: ',
      hinglish: 'Aapke liye ek question: ',
    }

    const optionPrefixes = {
      english: 'Option',
      hindi: 'विकल्प',
      hinglish: 'Option',
    }

    const intro = questionIntros[language as keyof typeof questionIntros]
    const optionPrefix = optionPrefixes[language as keyof typeof optionPrefixes]

    let formattedQuestion = `${intro}${question}. `

    options.forEach((option, index) => {
      const letter = String.fromCharCode(65 + index) // A, B, C, D
      formattedQuestion += `${optionPrefix} ${letter}: ${option}. `
    })

    return formattedQuestion
  }

  private calculateTTSCost(textLength: number): number {
    // OpenAI TTS pricing: $0.015 per 1K characters
    return (textLength / 1000) * 0.015
  }

  private async uploadAudioBuffer(buffer: ArrayBuffer, format: string): Promise<string> {
    // In production, upload to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, return a mock URL
    const fileName = `audio_${Date.now()}.${format}`
    const mockUrl = `https://storage.cerebrumbiologyacademy.com/audio/${fileName}`

    console.log(`🎵 Generated audio file: ${fileName} (${buffer.byteLength} bytes)`)
    return mockUrl
  }

  /**
   * Get voice profile information
   */
  getVoiceProfiles(): VoiceProfile[] {
    return Array.from(this.voiceProfiles.values())
  }

  /**
   * Get estimated cost for text-to-speech
   */
  estimateCost(text: string): number {
    return this.calculateTTSCost(text.length)
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages(): string[] {
    return ['english', 'hindi', 'hinglish']
  }
}
