/**
 * Multi-Language Voice Recognition Service
 * Supports English, Hindi, and Hinglish for Biology education
 * Optimized for Indian accents and Biology terminology
 */

interface VoiceRecognitionConfig {
  language: 'en-IN' | 'hi-IN' | 'en-US'
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  biologyTermsEnabled: boolean
  noiseReduction: boolean
}

interface VoiceRecognitionResult {
  transcript: string
  confidence: number
  language: string
  detectedBiologyTerms: string[]
  alternatives: string[]
  timestamp: number
}

interface BiologyTerm {
  term: string
  pronunciations: string[]
  hindiTranslation: string
  category: 'cellular' | 'anatomy' | 'physiology' | 'genetics' | 'ecology' | 'neet'
}

class VoiceRecognitionService {
  private recognition: SpeechRecognition | null = null
  private isRecording = false
  private currentConfig: VoiceRecognitionConfig
  private biologyTerms: BiologyTerm[]
  private callbacks: {
    onResult: (result: VoiceRecognitionResult) => void
    onError: (error: string) => void
    onStart: () => void
    onEnd: () => void
  } = {
    onResult: () => {},
    onError: () => {},
    onStart: () => {},
    onEnd: () => {},
  }

  constructor(config: Partial<VoiceRecognitionConfig> = {}) {
    this.currentConfig = {
      language: 'en-IN',
      continuous: false,
      interimResults: true,
      maxAlternatives: 3,
      biologyTermsEnabled: true,
      noiseReduction: true,
      ...config,
    }

    this.biologyTerms = this.initializeBiologyTerms()
    this.initializeSpeechRecognition()
  }

  private initializeBiologyTerms(): BiologyTerm[] {
    return [
      // Cellular Biology
      {
        term: 'mitochondria',
        pronunciations: ['माइटोकॉन्ड्रिया', 'mitokondria', 'माइटो'],
        hindiTranslation: 'माइटोकॉन्ड्रिया',
        category: 'cellular',
      },
      {
        term: 'photosynthesis',
        pronunciations: ['फोटोसिंथेसिस', 'photo synthesis', 'फोटो सिंथेसिस'],
        hindiTranslation: 'प्रकाश संश्लेषण',
        category: 'physiology',
      },
      {
        term: 'respiration',
        pronunciations: ['रेस्पिरेशन', 'श्वसन', 'breathing'],
        hindiTranslation: 'श्वसन',
        category: 'physiology',
      },
      {
        term: 'DNA',
        pronunciations: ['डीएनए', 'dna', 'डी एन ए'],
        hindiTranslation: 'डीएनए',
        category: 'genetics',
      },
      {
        term: 'chromosome',
        pronunciations: ['क्रोमोसोम', 'गुणसूत्र', 'kromosom'],
        hindiTranslation: 'गुणसूत्र',
        category: 'genetics',
      },
      {
        term: 'mendel',
        pronunciations: ['मेंडल', 'मेंडेल', 'mendal'],
        hindiTranslation: 'मेंडल',
        category: 'genetics',
      },
      {
        term: 'ecosystem',
        pronunciations: ['इकोसिस्टम', 'पारिस्थितिकी तंत्र', 'eco system'],
        hindiTranslation: 'पारिस्थितिकी तंत्र',
        category: 'ecology',
      },
      {
        term: 'nervous system',
        pronunciations: ['नर्वस सिस्टम', 'तंत्रिका तंत्र', 'नर्वस'],
        hindiTranslation: 'तंत्रिका तंत्र',
        category: 'anatomy',
      },
      {
        term: 'circulatory system',
        pronunciations: ['सर्कुलेटरी सिस्टम', 'परिसंचरण तंत्र', 'blood circulation'],
        hindiTranslation: 'परिसंचरण तंत्र',
        category: 'anatomy',
      },
      {
        term: 'heart',
        pronunciations: ['हार्ट', 'हृदय', 'दिल'],
        hindiTranslation: 'हृदय',
        category: 'anatomy',
      },
      // NEET specific terms
      {
        term: 'NEET',
        pronunciations: ['नीट', 'एन ई ई टी', 'neet exam'],
        hindiTranslation: 'नीट',
        category: 'neet',
      },
      {
        term: 'NCERT',
        pronunciations: ['एनसीईआरटी', 'ncert book', 'एन सी ई आर टी'],
        hindiTranslation: 'एनसीईआरटी',
        category: 'neet',
      },
    ]
  }

  private initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition()
    } else if ('SpeechRecognition' in window) {
      this.recognition = new SpeechRecognition()
    } else {
      console.error('Speech recognition not supported in this browser')
      return
    }

    this.configureSpeechRecognition()
  }

  private configureSpeechRecognition() {
    if (!this.recognition) return

    this.recognition.lang = this.currentConfig.language
    this.recognition.continuous = this.currentConfig.continuous
    this.recognition.interimResults = this.currentConfig.interimResults
    this.recognition.maxAlternatives = this.currentConfig.maxAlternatives

    this.recognition.onstart = () => {
      this.isRecording = true
      this.callbacks.onStart()
    }

    this.recognition.onend = () => {
      this.isRecording = false
      this.callbacks.onEnd()
    }

    this.recognition.onerror = (event) => {
      this.isRecording = false
      this.callbacks.onError(event.error || 'Unknown speech recognition error')
    }

    this.recognition.onresult = (event) => {
      const results = Array.from(event.results)
      const latestResult = results[results.length - 1]

      if (latestResult) {
        const transcript = latestResult[0].transcript
        const confidence = latestResult[0].confidence
        const alternatives = Array.from(latestResult as ArrayLike<SpeechRecognitionAlternative>)
          .slice(1)
          .map((alt) => alt.transcript)

        const processedResult: VoiceRecognitionResult = {
          transcript: transcript.trim(),
          confidence,
          language: this.currentConfig.language,
          detectedBiologyTerms: this.detectBiologyTerms(transcript),
          alternatives,
          timestamp: Date.now(),
        }

        this.callbacks.onResult(processedResult)
      }
    }
  }

  private detectBiologyTerms(transcript: string): string[] {
    if (!this.currentConfig.biologyTermsEnabled) return []

    const lowerTranscript = transcript.toLowerCase()
    const detectedTerms: string[] = []

    this.biologyTerms.forEach((biologyTerm) => {
      // Check main term
      if (lowerTranscript.includes(biologyTerm.term.toLowerCase())) {
        detectedTerms.push(biologyTerm.term)
        return
      }

      // Check pronunciations
      biologyTerm.pronunciations.forEach((pronunciation) => {
        if (lowerTranscript.includes(pronunciation.toLowerCase())) {
          detectedTerms.push(biologyTerm.term)
        }
      })
    })

    return [...new Set(detectedTerms)] // Remove duplicates
  }

  public startRecording(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'))
        return
      }

      if (this.isRecording) {
        reject(new Error('Already recording'))
        return
      }

      try {
        this.recognition.start()
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  public stopRecording(): void {
    if (this.recognition && this.isRecording) {
      this.recognition.stop()
    }
  }

  public setLanguage(language: 'en-IN' | 'hi-IN' | 'en-US'): void {
    this.currentConfig.language = language
    if (this.recognition) {
      this.recognition.lang = language
    }
  }

  public setBiologyTermsEnabled(enabled: boolean): void {
    this.currentConfig.biologyTermsEnabled = enabled
  }

  public onResult(callback: (result: VoiceRecognitionResult) => void): void {
    this.callbacks.onResult = callback
  }

  public onError(callback: (error: string) => void): void {
    this.callbacks.onError = callback
  }

  public onStart(callback: () => void): void {
    this.callbacks.onStart = callback
  }

  public onEnd(callback: () => void): void {
    this.callbacks.onEnd = callback
  }

  public isSupported(): boolean {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
  }

  public isCurrentlyRecording(): boolean {
    return this.isRecording
  }

  public getConfig(): VoiceRecognitionConfig {
    return { ...this.currentConfig }
  }

  public getBiologyTerms(): BiologyTerm[] {
    return [...this.biologyTerms]
  }

  // Advanced feature: Auto-detect language
  public async detectLanguage(audioSample: string): Promise<'en-IN' | 'hi-IN' | 'en-US'> {
    // This would integrate with a language detection service
    // For now, return a simple heuristic based on common words
    const hindiIndicators = ['है', 'में', 'का', 'के', 'की', 'और', 'यह', 'वह']
    const englishIndicators = ['the', 'is', 'and', 'or', 'what', 'how', 'why']

    const hindiCount = hindiIndicators.reduce(
      (count, word) => count + (audioSample.toLowerCase().includes(word) ? 1 : 0),
      0
    )
    const englishCount = englishIndicators.reduce(
      (count, word) => count + (audioSample.toLowerCase().includes(word) ? 1 : 0),
      0
    )

    if (hindiCount > englishCount) {
      return 'hi-IN'
    } else {
      return 'en-IN' // Default to Indian English
    }
  }

  // Clean up resources
  public destroy(): void {
    if (this.recognition) {
      this.recognition.abort()
      this.recognition = null
    }
  }
}

export default VoiceRecognitionService
export type { VoiceRecognitionConfig, VoiceRecognitionResult, BiologyTerm }
