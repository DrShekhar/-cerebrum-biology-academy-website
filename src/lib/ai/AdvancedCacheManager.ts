/**
 * Advanced Cache Manager
 * Multi-tier caching system with semantic similarity, cost optimization, and predictive pre-caching
 */

import { createHash } from 'crypto'
import OpenAI from 'openai'
import { TaskAnalysis } from './SmartProviderSelector'

interface CacheEntry {
  id: string
  key: string
  queryHash: string
  queryEmbedding: number[]
  response: any
  metadata: {
    provider: string
    model: string
    subject: string
    complexity: string
    studentLevel: string
    language: string
    cost: number
    quality: number
    accessCount: number
    lastAccessed: number
    created: number
    expiresAt: number
  }
  tags: string[]
  confidence: number
  userFeedback?: {
    helpful: boolean
    rating: number
    comments?: string
  }
}

interface CacheStats {
  hitRate: number
  costSavings: number
  totalQueries: number
  cacheHits: number
  semanticHits: number
  exactHits: number
  avgSimilarityScore: number
  topQueries: Array<{ query: string; count: number }>
  qualityDistribution: Record<string, number>
  providerDistribution: Record<string, number>
}

interface CacheConfig {
  maxSize: number
  defaultTTL: number
  semanticThreshold: number
  enablePreCaching: boolean
  enableQualityFiltering: boolean
  minQualityScore: number
  embeddingModel: string
}

export class AdvancedCacheManager {
  private cache: Map<string, CacheEntry> = new Map()
  private embeddings: Map<string, number[]> = new Map()
  private queryStats: Map<string, number> = new Map()
  private popularQueries: Set<string> = new Set()
  private openai: OpenAI

  private config: CacheConfig = {
    maxSize: 50000,
    defaultTTL: 7 * 24 * 60 * 60 * 1000, // 7 days
    semanticThreshold: 0.85,
    enablePreCaching: true,
    enableQualityFiltering: true,
    minQualityScore: 0.7,
    embeddingModel: 'text-embedding-3-large',
  }

  private stats: CacheStats = {
    hitRate: 0,
    costSavings: 0,
    totalQueries: 0,
    cacheHits: 0,
    semanticHits: 0,
    exactHits: 0,
    avgSimilarityScore: 0,
    topQueries: [],
    qualityDistribution: {},
    providerDistribution: {},
  }

  constructor(config?: Partial<CacheConfig>) {
    if (config) {
      this.config = { ...this.config, ...config }
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    this.startCacheOptimization()
    this.initializePopularQueries()
  }

  /**
   * Get cached response with semantic similarity matching
   */
  async get(prompt: string, context?: any): Promise<CacheEntry | null> {
    this.stats.totalQueries++

    // Try exact match first (fastest)
    const exactKey = this.generateExactKey(prompt, context)
    const exactMatch = this.cache.get(exactKey)

    if (exactMatch && !this.isExpired(exactMatch)) {
      exactMatch.metadata.accessCount++
      exactMatch.metadata.lastAccessed = Date.now()
      this.stats.cacheHits++
      this.stats.exactHits++
      return exactMatch
    }

    // Try semantic similarity matching
    const semanticMatch = await this.findSemanticMatch(prompt, context)
    if (semanticMatch) {
      semanticMatch.metadata.accessCount++
      semanticMatch.metadata.lastAccessed = Date.now()
      this.stats.cacheHits++
      this.stats.semanticHits++
      return semanticMatch
    }

    return null
  }

  /**
   * Store response in cache with multiple indexing strategies
   */
  async set(
    prompt: string,
    response: any,
    metadata: {
      provider: string
      model: string
      cost: number
      quality: number
      taskAnalysis?: TaskAnalysis
    },
    context?: any
  ): Promise<void> {
    // Skip low-quality responses if filtering is enabled
    if (this.config.enableQualityFiltering && metadata.quality < this.config.minQualityScore) {
      console.log(`Skipping cache storage due to low quality: ${metadata.quality}`)
      return
    }

    const queryEmbedding = await this.generateEmbedding(prompt)
    if (queryEmbedding.length === 0) return

    const exactKey = this.generateExactKey(prompt, context)
    const queryHash = this.hashText(prompt)
    const tags = this.extractTags(prompt, context, metadata.taskAnalysis)
    const ttl = this.calculateTTL(metadata.taskAnalysis, metadata.quality)

    const entry: CacheEntry = {
      id: this.generateUniqueId(),
      key: exactKey,
      queryHash,
      queryEmbedding,
      response,
      metadata: {
        provider: metadata.provider,
        model: metadata.model,
        subject: context?.subject || 'general',
        complexity: metadata.taskAnalysis?.complexity || 'medium',
        studentLevel: context?.studentLevel || 'class-12',
        language: context?.language || 'english',
        cost: metadata.cost,
        quality: metadata.quality,
        accessCount: 0,
        lastAccessed: Date.now(),
        created: Date.now(),
        expiresAt: Date.now() + ttl,
      },
      tags,
      confidence: metadata.quality,
    }

    // Store with multiple indexing
    this.cache.set(exactKey, entry)

    // Update query statistics
    const normalizedQuery = this.normalizeQuery(prompt)
    this.queryStats.set(normalizedQuery, (this.queryStats.get(normalizedQuery) || 0) + 1)

    // Track popular queries for pre-caching
    if ((this.queryStats.get(normalizedQuery) || 0) > 3) {
      this.popularQueries.add(normalizedQuery)
    }

    // Manage cache size
    if (this.cache.size > this.config.maxSize) {
      await this.evictEntries()
    }

    console.log(
      `Cached response for ${metadata.provider}/${metadata.model} (quality: ${metadata.quality})`
    )
  }

  /**
   * Find semantically similar cached entry
   */
  private async findSemanticMatch(prompt: string, context?: any): Promise<CacheEntry | null> {
    const queryEmbedding = await this.generateEmbedding(prompt)
    if (queryEmbedding.length === 0) return null

    let bestMatch: CacheEntry | null = null
    let bestSimilarity = 0

    for (const entry of this.cache.values()) {
      // Skip expired entries
      if (this.isExpired(entry)) continue

      // Context matching for better relevance
      if (context?.subject && entry.metadata.subject !== context.subject) continue
      if (context?.studentLevel && entry.metadata.studentLevel !== context.studentLevel) continue
      if (context?.language && entry.metadata.language !== context.language) continue

      // Calculate semantic similarity
      const similarity = this.cosineSimilarity(queryEmbedding, entry.queryEmbedding)

      if (similarity > this.config.semanticThreshold && similarity > bestSimilarity) {
        bestSimilarity = similarity
        bestMatch = entry
      }
    }

    if (bestMatch) {
      this.stats.avgSimilarityScore = (this.stats.avgSimilarityScore + bestSimilarity) / 2
    }

    return bestMatch
  }

  /**
   * Generate embedding for text using OpenAI
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    const cacheKey = this.hashText(text)

    if (this.embeddings.has(cacheKey)) {
      return this.embeddings.get(cacheKey)!
    }

    try {
      const response = await this.openai.embeddings.create({
        model: this.config.embeddingModel,
        input: text.substring(0, 8000), // Limit input length
      })

      const embedding = response.data[0].embedding
      this.embeddings.set(cacheKey, embedding)

      // Manage embedding cache size
      if (this.embeddings.size > 10000) {
        const firstKey = this.embeddings.keys().next().value
        this.embeddings.delete(firstKey)
      }

      return embedding
    } catch (error) {
      console.error('Failed to generate embedding:', error)
      return []
    }
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length || a.length === 0) return 0

    let dotProduct = 0
    let normA = 0
    let normB = 0

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i]
      normA += a[i] * a[i]
      normB += b[i] * b[i]
    }

    if (normA === 0 || normB === 0) return 0
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
  }

  /**
   * Generate exact cache key
   */
  private generateExactKey(prompt: string, context?: any): string {
    const contextStr = context
      ? JSON.stringify({
          subject: context.subject,
          studentLevel: context.studentLevel,
          language: context.language,
        })
      : ''

    return this.hashText(prompt + contextStr)
  }

  /**
   * Extract semantic tags for better organization
   */
  private extractTags(prompt: string, context?: any, taskAnalysis?: TaskAnalysis): string[] {
    const tags: string[] = []

    // Add context tags
    if (context?.subject) tags.push(`subject:${context.subject}`)
    if (context?.studentLevel) tags.push(`level:${context.studentLevel}`)
    if (context?.language) tags.push(`lang:${context.language}`)

    // Add task analysis tags
    if (taskAnalysis) {
      tags.push(`complexity:${taskAnalysis.complexity}`)
      tags.push(`type:${taskAnalysis.questionType}`)
      tags.push(`domain:${taskAnalysis.domain}`)
      if (taskAnalysis.requiresReasoning) tags.push('reasoning:required')
      if (taskAnalysis.requiresVision) tags.push('vision:required')
    }

    // Biology-specific tags
    const biologyTerms = [
      'cell',
      'dna',
      'protein',
      'enzyme',
      'photosynthesis',
      'respiration',
      'genetics',
      'evolution',
      'ecology',
      'anatomy',
      'physiology',
      'mitochondria',
      'chloroplast',
      'nucleus',
      'membrane',
      'chromosome',
      'gene',
      'allele',
    ]

    const promptLower = prompt.toLowerCase()
    biologyTerms.forEach((term) => {
      if (promptLower.includes(term)) {
        tags.push(`bio:${term}`)
      }
    })

    // NEET-specific tags
    if (promptLower.includes('neet')) tags.push('exam:neet')
    if (promptLower.includes('ncert')) tags.push('source:ncert')
    if (promptLower.includes('diagram')) tags.push('content:diagram')

    return tags
  }

  /**
   * Calculate TTL based on content characteristics
   */
  private calculateTTL(taskAnalysis?: TaskAnalysis, quality?: number): number {
    let ttl = this.config.defaultTTL

    // High-quality responses last longer
    if (quality && quality > 0.9) {
      ttl *= 2
    } else if (quality && quality < 0.7) {
      ttl *= 0.5
    }

    // Fundamental concepts last longer
    if (taskAnalysis?.complexity === 'low' && taskAnalysis?.questionType === 'factual') {
      ttl *= 3 // 21 days for basic facts
    }

    // Complex analyses have shorter lifespans (knowledge evolves)
    if (taskAnalysis?.complexity === 'high') {
      ttl *= 0.7
    }

    return ttl
  }

  /**
   * Check if cache entry is expired
   */
  private isExpired(entry: CacheEntry): boolean {
    return Date.now() > entry.metadata.expiresAt
  }

  /**
   * Evict entries using advanced LRU + quality scoring
   */
  private async evictEntries(): Promise<void> {
    const entries = Array.from(this.cache.values())

    // Score entries for eviction (lower score = more likely to evict)
    const scoredEntries = entries
      .map((entry) => ({
        entry,
        score: this.calculateEvictionScore(entry),
      }))
      .sort((a, b) => a.score - b.score)

    // Remove bottom 10%
    const toRemove = Math.floor(entries.length * 0.1)
    for (let i = 0; i < toRemove; i++) {
      this.cache.delete(scoredEntries[i].entry.key)
    }

    console.log(`Evicted ${toRemove} cache entries`)
  }

  /**
   * Calculate eviction score (lower = more likely to evict)
   */
  private calculateEvictionScore(entry: CacheEntry): number {
    const now = Date.now()
    const age = now - entry.metadata.created
    const timeSinceAccess = now - entry.metadata.lastAccessed

    // Base score components
    const qualityScore = entry.metadata.quality * 100
    const accessScore = Math.min(entry.metadata.accessCount * 10, 100)
    const freshnessScore = Math.max(0, 100 - age / (24 * 60 * 60 * 1000)) // Decrease over days
    const recentAccessScore = Math.max(0, 100 - timeSinceAccess / (60 * 60 * 1000)) // Decrease over hours

    return qualityScore + accessScore + freshnessScore + recentAccessScore
  }

  /**
   * Predictive pre-caching based on patterns
   */
  async preCachePopularQueries(): Promise<void> {
    if (!this.config.enablePreCaching) return

    console.log('Starting predictive pre-caching...')

    const popularQueries = Array.from(this.popularQueries)
    const uncachedQueries = []

    for (const query of popularQueries) {
      const cached = await this.get(query)
      if (!cached) {
        uncachedQueries.push(query)
      }
    }

    console.log(`Found ${uncachedQueries.length} popular queries not in cache`)

    // This would typically trigger AI generation for popular uncached queries
    // For now, we'll just log the opportunity
    if (uncachedQueries.length > 0) {
      console.log('Opportunity for pre-caching:', uncachedQueries.slice(0, 5))
    }
  }

  /**
   * Initialize with popular biology queries
   */
  private initializePopularQueries(): void {
    const commonQueries = [
      'what is photosynthesis',
      'explain dna structure',
      'how does cellular respiration work',
      'what are enzymes',
      'describe mitosis process',
      'explain genetics and heredity',
      'what is evolution theory',
      'how do plant hormones work',
      'describe human circulatory system',
      'explain protein synthesis',
    ]

    commonQueries.forEach((query) => {
      this.popularQueries.add(this.normalizeQuery(query))
      this.queryStats.set(this.normalizeQuery(query), 5) // Pre-populate with high frequency
    })
  }

  /**
   * Record user feedback on cached responses
   */
  recordFeedback(
    cacheKey: string,
    feedback: {
      helpful: boolean
      rating: number
      comments?: string
    }
  ): void {
    const entry = this.cache.get(cacheKey)
    if (entry) {
      entry.userFeedback = feedback

      // Adjust quality score based on feedback
      if (feedback.helpful) {
        entry.metadata.quality = Math.min(1.0, entry.metadata.quality + 0.1)
      } else {
        entry.metadata.quality = Math.max(0.1, entry.metadata.quality - 0.2)
      }

      // If quality drops too low, mark for eviction
      if (entry.metadata.quality < 0.3) {
        entry.metadata.expiresAt = Date.now() + 60000 // Expire in 1 minute
      }
    }
  }

  /**
   * Search cache by tags or content
   */
  search(query: {
    tags?: string[]
    subject?: string
    complexity?: string
    minQuality?: number
  }): CacheEntry[] {
    const results: CacheEntry[] = []

    for (const entry of this.cache.values()) {
      if (this.isExpired(entry)) continue

      let matches = true

      if (query.tags) {
        const hasMatchingTag = query.tags.some((tag) => entry.tags.includes(tag))
        if (!hasMatchingTag) matches = false
      }

      if (query.subject && entry.metadata.subject !== query.subject) {
        matches = false
      }

      if (query.complexity && entry.metadata.complexity !== query.complexity) {
        matches = false
      }

      if (query.minQuality && entry.metadata.quality < query.minQuality) {
        matches = false
      }

      if (matches) {
        results.push(entry)
      }
    }

    return results.sort((a, b) => b.metadata.quality - a.metadata.quality)
  }

  /**
   * Get comprehensive cache statistics
   */
  getStats(): CacheStats {
    this.updateStatistics()
    return { ...this.stats }
  }

  /**
   * Update internal statistics
   */
  private updateStatistics(): void {
    this.stats.hitRate =
      this.stats.totalQueries > 0 ? this.stats.cacheHits / this.stats.totalQueries : 0

    // Calculate cost savings (average API call cost: $0.001)
    this.stats.costSavings = this.stats.cacheHits * 0.001

    // Update top queries
    this.stats.topQueries = Array.from(this.queryStats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }))

    // Quality distribution
    const qualityBuckets = { low: 0, medium: 0, high: 0 }
    let providerCounts: Record<string, number> = {}

    for (const entry of this.cache.values()) {
      if (this.isExpired(entry)) continue

      // Quality distribution
      if (entry.metadata.quality < 0.6) qualityBuckets.low++
      else if (entry.metadata.quality < 0.8) qualityBuckets.medium++
      else qualityBuckets.high++

      // Provider distribution
      providerCounts[entry.metadata.provider] = (providerCounts[entry.metadata.provider] || 0) + 1
    }

    this.stats.qualityDistribution = qualityBuckets
    this.stats.providerDistribution = providerCounts
  }

  /**
   * Start periodic cache optimization
   */
  private startCacheOptimization(): void {
    // Cleanup expired entries every 5 minutes
    setInterval(
      () => {
        this.cleanupExpiredEntries()
      },
      5 * 60 * 1000
    )

    // Pre-cache popular queries every hour
    setInterval(
      () => {
        this.preCachePopularQueries()
      },
      60 * 60 * 1000
    )

    // Update statistics every 10 minutes
    setInterval(
      () => {
        this.updateStatistics()
      },
      10 * 60 * 1000
    )
  }

  /**
   * Remove expired entries
   */
  private cleanupExpiredEntries(): void {
    let cleaned = 0
    for (const [key, entry] of this.cache) {
      if (this.isExpired(entry)) {
        this.cache.delete(key)
        cleaned++
      }
    }

    if (cleaned > 0) {
      console.log(`Cleaned ${cleaned} expired cache entries`)
    }
  }

  /**
   * Utility methods
   */
  private hashText(text: string): string {
    return createHash('sha256').update(text.toLowerCase().trim()).digest('hex')
  }

  private normalizeQuery(query: string): string {
    return query
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .trim()
      .substring(0, 100)
  }

  private generateUniqueId(): string {
    return `cache_${Date.now()}_${Math.random().toString(36).substring(7)}`
  }

  /**
   * Export cache data for backup/analysis
   */
  export(): any {
    return {
      entries: Array.from(this.cache.entries()),
      stats: this.stats,
      config: this.config,
      timestamp: Date.now(),
    }
  }

  /**
   * Clear all cache data
   */
  clear(): void {
    this.cache.clear()
    this.embeddings.clear()
    this.queryStats.clear()
    this.popularQueries.clear()
    this.stats = {
      hitRate: 0,
      costSavings: 0,
      totalQueries: 0,
      cacheHits: 0,
      semanticHits: 0,
      exactHits: 0,
      avgSimilarityScore: 0,
      topQueries: [],
      qualityDistribution: {},
      providerDistribution: {},
    }
  }
}

// Export singleton instance
export const advancedCacheManager = new AdvancedCacheManager()
