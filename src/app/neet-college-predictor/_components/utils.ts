import type { ChanceLevel, CounsellingPrediction } from './types'

/**
 * Convert NEET marks to estimated rank (based on NEET 2024 data)
 */
export function marksToRank(score: number): number {
  if (score >= 720) return 1
  if (score >= 715) return Math.round(1 + (720 - score) * 2)
  if (score >= 700) return Math.round(10 + (715 - score) * 6)
  if (score >= 680) return Math.round(100 + (700 - score) * 50)
  if (score >= 650) return Math.round(1100 + (680 - score) * 130)
  if (score >= 600) return Math.round(5000 + (650 - score) * 400)
  if (score >= 550) return Math.round(25000 + (600 - score) * 900)
  if (score >= 500) return Math.round(70000 + (550 - score) * 1600)
  if (score >= 450) return Math.round(150000 + (500 - score) * 3000)
  if (score >= 400) return Math.round(300000 + (450 - score) * 4000)
  if (score >= 350) return Math.round(500000 + (400 - score) * 5000)
  return Math.round(750000 + (350 - score) * 6000)
}

/**
 * Convert NEET rank to estimated marks
 */
export function getMarksFromRank(rankNum: number): number {
  if (rankNum <= 1) return 720
  if (rankNum <= 10) return 720 - Math.round((rankNum - 1) / 2)
  if (rankNum <= 100) return 715 - Math.round((rankNum - 10) / 6)
  if (rankNum <= 1100) return 700 - Math.round((rankNum - 100) / 50)
  if (rankNum <= 5000) return 680 - Math.round((rankNum - 1100) / 130)
  if (rankNum <= 25000) return 650 - Math.round((rankNum - 5000) / 400)
  if (rankNum <= 70000) return 600 - Math.round((rankNum - 25000) / 900)
  if (rankNum <= 150000) return 550 - Math.round((rankNum - 70000) / 1600)
  if (rankNum <= 300000) return 500 - Math.round((rankNum - 150000) / 3000)
  if (rankNum <= 500000) return 450 - Math.round((rankNum - 300000) / 4000)
  if (rankNum <= 750000) return 400 - Math.round((rankNum - 500000) / 5000)
  return Math.max(0, 350 - Math.round((rankNum - 750000) / 6000))
}

/**
 * Generate URL-friendly slug from college name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Calculate admission chance based on user rank vs cutoff
 */
export function getChance(userRank: number, cutoff: number): ChanceLevel {
  const ratio = userRank / cutoff
  if (ratio <= 0.7) return { level: 'High', color: 'bg-green-100 text-green-800' }
  if (ratio <= 0.9) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' }
  if (ratio <= 1.0) return { level: 'Low', color: 'bg-orange-100 text-orange-800' }
  return { level: 'Very Low', color: 'bg-red-100 text-red-800' }
}

/**
 * Predict counselling round based on rank vs cutoff ratio
 */
export function predictCounsellingRound(userRank: number, cutoff: number): CounsellingPrediction {
  if (isNaN(userRank)) return { round: '-', confidence: '', color: '' }

  const ratio = userRank / cutoff
  if (ratio <= 0.5)
    return { round: 'Round 1', confidence: 'Very High', color: 'bg-green-100 text-green-800' }
  if (ratio <= 0.7)
    return { round: 'Round 1-2', confidence: 'High', color: 'bg-green-100 text-green-800' }
  if (ratio <= 0.85)
    return { round: 'Round 2', confidence: 'Good', color: 'bg-blue-100 text-blue-800' }
  if (ratio <= 0.95)
    return { round: 'Round 2-3', confidence: 'Medium', color: 'bg-yellow-100 text-yellow-800' }
  if (ratio <= 1.05)
    return { round: 'Round 3', confidence: 'Possible', color: 'bg-orange-100 text-orange-800' }
  if (ratio <= 1.15) return { round: 'Mop-up', confidence: 'Low', color: 'bg-red-100 text-red-800' }
  return { round: 'Unlikely', confidence: 'Very Low', color: 'bg-gray-100 text-gray-600' }
}

/**
 * Format number with Indian locale
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN')
}
