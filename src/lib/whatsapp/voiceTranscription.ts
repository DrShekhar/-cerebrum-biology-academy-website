/**
 * Voice Transcription Service for WhatsApp Audio Messages
 * Supports Hindi, English, and Hinglish transcription
 */

import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

let openai: OpenAI | null = null

function getOpenAI(): OpenAI {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  if (!openai) {
    throw new Error('OpenAI API key not configured')
  }
  return openai
}

export class VoiceTranscriptionService {
  private downloadFile = promisify(require('fs').writeFile)

  /**
   * Transcribe WhatsApp voice note to text
   * Supports multiple languages common in Indian education
   */
  async transcribeAudio(audioUrl: string): Promise<string> {
    try {
      console.log('🎤 Starting voice transcription...')

      // Download audio file
      const audioBuffer = await this.downloadAudioFromUrl(audioUrl)

      // Save temporarily for processing
      const tempFilePath = await this.saveTemporaryFile(audioBuffer)

      try {
        // Use OpenAI Whisper for transcription
        const transcription = await this.transcribeWithWhisper(tempFilePath)

        console.log(`✅ Transcription completed: "${transcription}"`)
        return transcription
      } finally {
        // Clean up temporary file
        this.cleanupTempFile(tempFilePath)
      }
    } catch (error) {
      console.error('❌ Voice transcription failed:', error)
      throw new Error('Failed to transcribe voice message')
    }
  }

  private async downloadAudioFromUrl(url: string): Promise<Buffer> {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'User-Agent': 'Cerebrum-Biology-Academy/1.0',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to download audio: ${response.status} ${response.statusText}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      return Buffer.from(arrayBuffer)
    } catch (error) {
      console.error('❌ Audio download failed:', error)
      throw new Error('Failed to download audio file')
    }
  }

  private async saveTemporaryFile(audioBuffer: Buffer): Promise<string> {
    const tempDir = '/tmp'
    const fileName = `whatsapp_audio_${Date.now()}_${Math.random().toString(36).substring(7)}.ogg`
    const filePath = path.join(tempDir, fileName)

    await fs.promises.writeFile(filePath, audioBuffer)
    console.log(`💾 Saved temporary audio file: ${filePath}`)

    return filePath
  }

  private async transcribeWithWhisper(filePath: string): Promise<string> {
    try {
      const fileStream = fs.createReadStream(filePath)

      const transcription = await getOpenAI().audio.transcriptions.create({
        file: fileStream,
        model: 'whisper-1',
        language: 'hi', // Hindi - but Whisper auto-detects English/Hinglish too
        response_format: 'text',
        prompt: `This is a student asking a biology question in Hindi, English, or Hinglish (Hindi-English mix).
        Common biology terms: photosynthesis, respiration, cell, DNA, genetics, ecology, NEET, biology.
        The student might ask questions like:
        - "What is photosynthesis?"
        - "Photosynthesis kya hai?"
        - "Cell structure explain karo"
        - "NEET mein genetics kitna important hai?"

        Please transcribe accurately, maintaining the original language mix.`,
      })

      return transcription.trim()
    } catch (error) {
      console.error('❌ Whisper transcription failed:', error)

      // Fallback: Try without language specification
      try {
        const fileStream = fs.createReadStream(filePath)
        const fallbackTranscription = await openai.audio.transcriptions.create({
          file: fileStream,
          model: 'whisper-1',
          response_format: 'text',
        })

        console.log('✅ Fallback transcription successful')
        return fallbackTranscription.trim()
      } catch (fallbackError) {
        throw new Error('Both primary and fallback transcription failed')
      }
    }
  }

  private cleanupTempFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        console.log(`🗑️  Cleaned up temporary file: ${filePath}`)
      }
    } catch (error) {
      console.error('⚠️  Failed to cleanup temporary file:', error)
    }
  }

  /**
   * Process transcription to normalize common biology terms
   * Handles Hindi-English mixed terms and common misspellings
   */
  private normalizeTranscription(text: string): string {
    const termMappings: Record<string, string> = {
      // Hindi to English mappings
      'प्रकाश संश्लेषण': 'photosynthesis',
      श्वसन: 'respiration',
      कोशिका: 'cell',
      आनुवंशिकता: 'genetics',
      डीएनए: 'DNA',
      पारिस्थितिकी: 'ecology',

      // Common Hinglish variations
      'photosynthesis kya hai': 'what is photosynthesis',
      'cell structure kya hota hai': 'what is cell structure',
      'DNA kaise kaam karta hai': 'how does DNA work',

      // Common misspellings
      fotosinthesis: 'photosynthesis',
      respiration: 'respiration',
      genetiks: 'genetics',
      selll: 'cell',
    }

    let normalizedText = text.toLowerCase()

    // Apply term mappings
    for (const [original, normalized] of Object.entries(termMappings)) {
      const regex = new RegExp(original.toLowerCase(), 'gi')
      normalizedText = normalizedText.replace(regex, normalized)
    }

    return normalizedText
  }

  /**
   * Validate that transcription contains biology-related content
   */
  private isBiologyRelated(text: string): boolean {
    const biologyKeywords = [
      'cell',
      'dna',
      'rna',
      'gene',
      'protein',
      'enzyme',
      'chromosome',
      'photosynthesis',
      'respiration',
      'metabolism',
      'genetics',
      'evolution',
      'ecology',
      'biodiversity',
      'anatomy',
      'physiology',
      'organ',
      'tissue',
      'bacteria',
      'virus',
      'plant',
      'animal',
      'human',
      'blood',
      'heart',
      'brain',
      'muscle',
      'bone',
      'reproduction',
      'development',
      'neet',
      'biology',
      'life science',
      'living',
      'organism',
    ]

    const hindiKeywords = [
      'जीव',
      'कोशिका',
      'डीएनए',
      'प्रकाश',
      'श्वसन',
      'आनुवंशिकता',
      'पारिस्थितिकी',
      'जैविक',
      'जीवविज्ञान',
      'पौधा',
      'जानवर',
    ]

    const allKeywords = [...biologyKeywords, ...hindiKeywords]
    const lowerText = text.toLowerCase()

    return allKeywords.some((keyword) => lowerText.includes(keyword.toLowerCase()))
  }

  /**
   * Enhanced transcription with validation and normalization
   */
  async transcribeAndValidate(audioUrl: string): Promise<{
    transcription: string
    confidence: number
    isBiologyRelated: boolean
    normalizedText: string
  }> {
    try {
      const rawTranscription = await this.transcribeAudio(audioUrl)
      const normalizedText = this.normalizeTranscription(rawTranscription)
      const isBiologyRelated = this.isBiologyRelated(normalizedText)

      // Simple confidence scoring based on length and content
      let confidence = 0.8 // Base confidence for successful transcription

      if (rawTranscription.length < 10) {
        confidence -= 0.2 // Lower confidence for very short messages
      }

      if (!isBiologyRelated) {
        confidence -= 0.3 // Lower confidence for non-biology content
      }

      return {
        transcription: rawTranscription,
        confidence: Math.max(0.1, confidence),
        isBiologyRelated,
        normalizedText,
      }
    } catch (error) {
      console.error('Enhanced transcription failed:', error)
      throw error
    }
  }
}
