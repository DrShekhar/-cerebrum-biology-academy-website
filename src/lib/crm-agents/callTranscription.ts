/**
 * Call Transcription Service
 *
 * Uses OpenAI Whisper API to transcribe call recordings
 * and store transcripts in the database.
 */

import OpenAI from 'openai'
import { prisma } from '@/lib/prisma'
import { AgentType, AgentTaskStatus } from '@/generated/prisma'
import { AgentTaskManager } from './base'

interface TranscriptionResult {
  success: boolean
  transcript?: string
  duration?: number
  language?: string
  error?: string
}

interface TranscriptionSegment {
  start: number
  end: number
  text: string
}

export class CallTranscriptionService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    })
  }

  /**
   * Transcribe a call recording from URL
   */
  async transcribeFromUrl(recordingUrl: string): Promise<TranscriptionResult> {
    try {
      console.log(`[TRANSCRIPTION] Fetching recording from: ${recordingUrl}`)

      // Fetch the audio file
      const response = await fetch(recordingUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch recording: ${response.statusText}`)
      }

      const audioBuffer = await response.arrayBuffer()
      const audioFile = new File([audioBuffer], 'recording.mp3', { type: 'audio/mpeg' })

      return this.transcribeFile(audioFile)
    } catch (error) {
      console.error('[TRANSCRIPTION] Error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to transcribe recording',
      }
    }
  }

  /**
   * Transcribe an audio file
   */
  async transcribeFile(audioFile: File): Promise<TranscriptionResult> {
    try {
      console.log(`[TRANSCRIPTION] Transcribing file: ${audioFile.name} (${audioFile.size} bytes)`)

      // Use Whisper API for transcription
      const transcription = await this.openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
        language: 'en', // Can detect Hindi/English mix
        response_format: 'verbose_json',
        timestamp_granularities: ['segment'],
      })

      // Extract text and metadata
      const transcript = transcription.text
      const duration = transcription.duration
      const language = transcription.language

      console.log(`[TRANSCRIPTION] Complete: ${transcript.length} chars, ${duration}s`)

      return {
        success: true,
        transcript,
        duration,
        language,
      }
    } catch (error) {
      console.error('[TRANSCRIPTION] Whisper API error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Whisper API error',
      }
    }
  }

  /**
   * Transcribe a call and update the communication record
   */
  async transcribeAndStore(communicationId: string): Promise<TranscriptionResult> {
    try {
      // Get the communication record
      const communication = await prisma.crm_communications.findUnique({
        where: { id: communicationId },
        select: {
          id: true,
          callRecordingUrl: true,
          leadId: true,
        },
      })

      if (!communication) {
        return {
          success: false,
          error: 'Communication record not found',
        }
      }

      if (!communication.callRecordingUrl) {
        return {
          success: false,
          error: 'No recording URL available',
        }
      }

      // Transcribe the recording
      const result = await this.transcribeFromUrl(communication.callRecordingUrl)

      if (!result.success || !result.transcript) {
        return result
      }

      // Update the communication record with transcript
      await prisma.crm_communications.update({
        where: { id: communicationId },
        data: {
          callTranscript: result.transcript,
          transcribedAt: new Date(),
        },
      })

      // Log the activity
      await prisma.activities.create({
        data: {
          id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId: 'system',
          leadId: communication.leadId,
          action: 'CALL_TRANSCRIBED',
          description: `Call recording transcribed (${result.duration || 0}s, ${result.transcript.length} chars)`,
          metadata: {
            communicationId,
            duration: result.duration,
            language: result.language,
            transcriptLength: result.transcript.length,
          },
        },
      })

      // Queue the summary agent
      await this.queueSummaryAgent(communicationId, communication.leadId)

      return result
    } catch (error) {
      console.error('[TRANSCRIPTION] Store error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to store transcript',
      }
    }
  }

  /**
   * Queue the call summary agent after transcription
   */
  private async queueSummaryAgent(communicationId: string, leadId: string): Promise<void> {
    await AgentTaskManager.createTask({
      agentType: AgentType.CALL_SUMMARY,
      leadId,
      communicationId,
      input: {
        trigger: 'TRANSCRIPTION_COMPLETE',
      },
    })

    console.log(`[TRANSCRIPTION] Queued CALL_SUMMARY agent for communication: ${communicationId}`)
  }

  /**
   * Process pending transcription tasks
   */
  async processPendingTranscriptions(limit: number = 5): Promise<void> {
    // Get communications with recordings but no transcripts
    const pendingTranscriptions = await prisma.crm_communications.findMany({
      where: {
        type: 'CALL',
        callRecordingUrl: { not: null },
        callTranscript: null,
      },
      take: limit,
      orderBy: { sentAt: 'desc' },
      select: {
        id: true,
        callRecordingUrl: true,
      },
    })

    console.log(`[TRANSCRIPTION] Processing ${pendingTranscriptions.length} pending transcriptions`)

    for (const comm of pendingTranscriptions) {
      try {
        await this.transcribeAndStore(comm.id)
      } catch (error) {
        console.error(`[TRANSCRIPTION] Failed for ${comm.id}:`, error)
      }
    }
  }

  /**
   * Get transcription status for a communication
   */
  async getTranscriptionStatus(communicationId: string): Promise<{
    hasRecording: boolean
    hasTranscript: boolean
    transcriptLength: number | null
    transcribedAt: Date | null
  }> {
    const communication = await prisma.crm_communications.findUnique({
      where: { id: communicationId },
      select: {
        callRecordingUrl: true,
        callTranscript: true,
        transcribedAt: true,
      },
    })

    if (!communication) {
      return {
        hasRecording: false,
        hasTranscript: false,
        transcriptLength: null,
        transcribedAt: null,
      }
    }

    return {
      hasRecording: !!communication.callRecordingUrl,
      hasTranscript: !!communication.callTranscript,
      transcriptLength: communication.callTranscript?.length || null,
      transcribedAt: communication.transcribedAt,
    }
  }
}

// Singleton instance
export const callTranscriptionService = new CallTranscriptionService()
