'use client'

import { useState, useCallback } from 'react'

export interface NCERTChapter {
  number: number
  name: string
  ncertClass: 11 | 12
  startPage: number
  endPage: number
  totalPages: number
  keyDiagrams: string[]
  neetWeightage: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  topicsCovered: string[]
  pdfAvailable: boolean
}

export interface NCERTChapterContent {
  chapter: {
    number: number
    name: string
    ncertClass: 11 | 12
    neetWeightage: string
    topicsCovered: string[]
    keyDiagrams: string[]
    totalPages: number
  }
  content: {
    pages: Array<{
      pageNumber: number
      contentPreview: string
      keyTermsCount: number
      statementsCount: number
      figuresCount: number
    }>
    aggregated: {
      keyTerms: string[]
      importantStatements: string[]
      figures: string[]
    }
  }
  questionGenerationReady: boolean
}

export interface NCERTStats {
  totalChapters: number
  totalPages: number
  availableChapters: number
  class11Stats: { chapters: number; pages: number }
  class12Stats: { chapters: number; pages: number }
}

/**
 * React hook for fetching and managing NCERT content
 */
export function useNCERTContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Get all chapters for a specific class
   */
  const getChapters = useCallback(async (ncertClass: 11 | 12): Promise<NCERTChapter[]> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/ncert/chapters?class=${ncertClass}`)
      if (!response.ok) {
        throw new Error('Failed to fetch chapters')
      }

      const data = await response.json()
      return data.chapters
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Get high NEET weightage chapters
   */
  const getHighWeightageChapters = useCallback(async (): Promise<NCERTChapter[]> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ncert/chapters?highWeightage=true')
      if (!response.ok) {
        throw new Error('Failed to fetch high weightage chapters')
      }

      const data = await response.json()
      return data.chapters
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Get summary statistics
   */
  const getStats = useCallback(async (): Promise<NCERTStats | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ncert/chapters?stats=true')
      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }

      const data = await response.json()
      return data.stats
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Get parsed content for a specific chapter
   */
  const getChapterContent = useCallback(
    async (ncertClass: 11 | 12, chapterNumber: number): Promise<NCERTChapterContent | null> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/ncert/content?class=${ncertClass}&chapter=${chapterNumber}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch chapter content')
        }

        const data = await response.json()
        return data
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  /**
   * Get key terms for question generation
   */
  const getKeyTermsForChapter = useCallback(
    async (ncertClass: 11 | 12, chapterNumber: number): Promise<string[]> => {
      const content = await getChapterContent(ncertClass, chapterNumber)
      return content?.content.aggregated.keyTerms || []
    },
    [getChapterContent]
  )

  /**
   * Get important statements for question generation
   */
  const getImportantStatements = useCallback(
    async (ncertClass: 11 | 12, chapterNumber: number): Promise<string[]> => {
      const content = await getChapterContent(ncertClass, chapterNumber)
      return content?.content.aggregated.importantStatements || []
    },
    [getChapterContent]
  )

  return {
    isLoading,
    error,
    getChapters,
    getHighWeightageChapters,
    getStats,
    getChapterContent,
    getKeyTermsForChapter,
    getImportantStatements,
  }
}

export default useNCERTContent
