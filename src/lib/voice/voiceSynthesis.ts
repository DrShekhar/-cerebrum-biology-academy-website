interface VoiceConfig {
  voice: string
  rate: number
  pitch: number
  volume: number
  language: string
}

interface ShekharVoiceProfile {
  hindi: VoiceConfig
  english: VoiceConfig
  hinglish: VoiceConfig
}

export class ShekharSirVoiceSynthesis {
  private speechSynthesis: SpeechSynthesis
  private voices: SpeechSynthesisVoice[] = []
  private isInitialized = false

  private shekharProfile: ShekharVoiceProfile = {
    hindi: {
      voice: 'hi-IN',
      rate: 0.9,
      pitch: 1.1,
      volume: 0.9,
      language: 'hi-IN',
    },
    english: {
      voice: 'en-IN',
      rate: 0.85,
      pitch: 1.0,
      volume: 0.9,
      language: 'en-IN',
    },
    hinglish: {
      voice: 'en-IN',
      rate: 0.88,
      pitch: 1.05,
      volume: 0.9,
      language: 'en-IN',
    },
  }

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.speechSynthesis = window.speechSynthesis
      this.initializeVoices()
    }
  }

  private async initializeVoices(): Promise<void> {
    return new Promise((resolve) => {
      const loadVoices = () => {
        this.voices = this.speechSynthesis.getVoices()
        if (this.voices.length > 0) {
          this.isInitialized = true
          resolve()
        }
      }

      if (this.speechSynthesis.getVoices().length > 0) {
        loadVoices()
      } else {
        this.speechSynthesis.addEventListener('voiceschanged', loadVoices)
      }
    })
  }

  private detectLanguage(text: string): 'hindi' | 'english' | 'hinglish' {
    const hindiPattern = /[\u0900-\u097F]/
    const englishPattern = /[a-zA-Z]/

    const hasHindi = hindiPattern.test(text)
    const hasEnglish = englishPattern.test(text)

    if (hasHindi && hasEnglish) return 'hinglish'
    if (hasHindi) return 'hindi'
    return 'english'
  }

  private getBestVoice(language: string): SpeechSynthesisVoice | null {
    const preferredVoices = {
      'hi-IN': ['Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Hemant'],
      'en-IN': ['Google UK English Female', 'Microsoft Ravi', 'Google Indian English'],
      'en-US': ['Google US English', 'Microsoft Zira', 'Alex'],
    }

    const preferred = preferredVoices[language as keyof typeof preferredVoices] || []

    for (const voiceName of preferred) {
      const voice = this.voices.find((v) => v.name.includes(voiceName))
      if (voice) return voice
    }

    return this.voices.find((v) => v.lang.startsWith(language.split('-')[0])) || this.voices[0]
  }

  private enhanceTextForShekharStyle(
    text: string,
    language: 'hindi' | 'english' | 'hinglish'
  ): string {
    let enhanced = text

    const teachingPhrases = {
      hindi: [
        'देखिए बच्चों,',
        'समझिए यह concept,',
        'यह बहुत important है,',
        'NEET में यह जरूर आएगा,',
      ],
      english: [
        'Now students,',
        'This is very important for NEET,',
        'Pay attention to this concept,',
        'Remember this for your exam,',
      ],
      hinglish: [
        'Dekho students,',
        'Yeh concept bahut important hai,',
        'NEET mein yeh zaroor aayega,',
        'Biology mein yeh fundamental hai,',
      ],
    }

    if (Math.random() < 0.3) {
      const phrases = teachingPhrases[language]
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
      enhanced = `${randomPhrase} ${enhanced}`
    }

    enhanced = enhanced.replace(/\b(important|जरूरी)\b/gi, (match) =>
      language === 'hindi' ? 'बहुत जरूरी' : 'very important'
    )

    enhanced = enhanced.replace(/\b(NEET)\b/g, (match) =>
      language === 'hindi' ? 'नीट परीक्षा' : 'NEET exam'
    )

    return enhanced
  }

  async speak(
    text: string,
    options: {
      language?: 'hindi' | 'english' | 'hinglish' | 'auto'
      onStart?: () => void
      onEnd?: () => void
      onError?: (error: string) => void
    } = {}
  ): Promise<void> {
    if (!this.isInitialized) {
      await this.initializeVoices()
    }

    const { language = 'auto', onStart, onEnd, onError } = options

    const detectedLanguage = language === 'auto' ? this.detectLanguage(text) : language
    const config = this.shekharProfile[detectedLanguage]
    const enhancedText = this.enhanceTextForShekharStyle(text, detectedLanguage)

    return new Promise((resolve, reject) => {
      try {
        this.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(enhancedText)
        const voice = this.getBestVoice(config.language)

        if (voice) {
          utterance.voice = voice
        }

        utterance.rate = config.rate
        utterance.pitch = config.pitch
        utterance.volume = config.volume
        utterance.lang = config.language

        utterance.onstart = () => {
          onStart?.()
        }

        utterance.onend = () => {
          onEnd?.()
          resolve()
        }

        utterance.onerror = (event) => {
          const error = `Speech synthesis error: ${event.error}`
          onError?.(error)
          reject(new Error(error))
        }

        this.speechSynthesis.speak(utterance)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        onError?.(errorMessage)
        reject(error)
      }
    })
  }

  async speakBiologyExplanation(
    topic: string,
    explanation: string,
    options: {
      includeIntro?: boolean
      includeConclusion?: boolean
      language?: 'hindi' | 'english' | 'hinglish' | 'auto'
      onProgress?: (progress: number) => void
      onStart?: () => void
      onEnd?: () => void
      onError?: (error: string) => void
    } = {}
  ): Promise<void> {
    const {
      includeIntro = true,
      includeConclusion = true,
      language = 'auto',
      onProgress,
      ...restOptions
    } = options

    let fullText = explanation

    if (includeIntro) {
      const intros = {
        hindi: `आज हम ${topic} के बारे में पढ़ेंगे। यह NEET की तैयारी के लिए बहुत महत्वपूर्ण topic है।`,
        english: `Today we will study about ${topic}. This is a very important topic for NEET preparation.`,
        hinglish: `Aaj hum ${topic} ke baare mein padhenge. Yeh NEET preparation ke liye bahut important topic hai.`,
        auto: `Today we will study about ${topic}. This is a very important topic for NEET preparation.`,
      }
      fullText = `${intros[language]} ${fullText}`
    }

    if (includeConclusion) {
      const conclusions = {
        hindi: `तो यह था ${topic} का complete explanation। अगर कोई doubt है तो पूछ सकते हैं।`,
        english: `So this was the complete explanation of ${topic}. If you have any doubts, please ask.`,
        hinglish: `Toh yeh tha ${topic} ka complete explanation. Agar koi doubt hai toh pooch sakte hain.`,
        auto: `So this was the complete explanation of ${topic}. If you have any doubts, please ask.`,
      }
      fullText = `${fullText} ${conclusions[language]}`
    }

    const sentences = fullText.split(/[.।!?]/).filter((s) => s.trim().length > 0)
    const totalSentences = sentences.length

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim()
      if (sentence) {
        await this.speak(sentence, {
          language: language === 'auto' ? 'auto' : language,
          onStart: i === 0 ? restOptions.onStart : undefined,
          onEnd: i === sentences.length - 1 ? restOptions.onEnd : undefined,
          onError: restOptions.onError,
        })

        onProgress?.(((i + 1) / totalSentences) * 100)

        await new Promise((resolve) => setTimeout(resolve, 300))
      }
    }
  }

  stop(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel()
    }
  }

  pause(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.pause()
    }
  }

  resume(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.resume()
    }
  }

  isSpeaking(): boolean {
    return this.speechSynthesis?.speaking || false
  }

  isPaused(): boolean {
    return this.speechSynthesis?.paused || false
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices
  }

  setCustomVoiceProfile(profile: Partial<ShekharVoiceProfile>): void {
    this.shekharProfile = { ...this.shekharProfile, ...profile }
  }
}

export const shekharVoice = new ShekharSirVoiceSynthesis()
