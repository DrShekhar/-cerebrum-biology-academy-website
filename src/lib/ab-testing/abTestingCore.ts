export interface ABTestVariantConfig {
  id: string
  name: string
  weight: number
  isControl: boolean
  configuration?: Record<string, unknown>
}

export interface ABTestAnalytics {
  testId: string
  variantId: string
  impressions: number
  conversions: number
  conversionRate: number
  avgTimeOnPage: number
  bounceRate: number
}

export function calculateABTestAnalytics(
  testId: string,
  events: Array<{ testId: string; variantId: string; eventName: string; timestamp: number }>
): Record<string, ABTestAnalytics> {
  const testEvents = events.filter((e) => e.testId === testId)
  const variantStats: Record<
    string,
    { impressions: number; conversions: number; timeSum: number; bounces: number }
  > = {}

  for (const event of testEvents) {
    if (!variantStats[event.variantId]) {
      variantStats[event.variantId] = { impressions: 0, conversions: 0, timeSum: 0, bounces: 0 }
    }

    if (event.eventName === 'variant_assigned') {
      variantStats[event.variantId].impressions++
    }
    if (event.eventName.startsWith('conversion_')) {
      variantStats[event.variantId].conversions++
    }
  }

  const analytics: Record<string, ABTestAnalytics> = {}
  for (const [variantId, stats] of Object.entries(variantStats)) {
    analytics[variantId] = {
      testId,
      variantId,
      impressions: stats.impressions,
      conversions: stats.conversions,
      conversionRate: stats.impressions > 0 ? (stats.conversions / stats.impressions) * 100 : 0,
      avgTimeOnPage: stats.impressions > 0 ? stats.timeSum / stats.impressions : 0,
      bounceRate: stats.impressions > 0 ? (stats.bounces / stats.impressions) * 100 : 0,
    }
  }

  return analytics
}

export function calculateStatisticalSignificance(
  controlConversions: number,
  controlImpressions: number,
  variantConversions: number,
  variantImpressions: number
): { significant: boolean; confidence: number; lift: number } {
  if (controlImpressions === 0 || variantImpressions === 0) {
    return { significant: false, confidence: 0, lift: 0 }
  }

  const controlRate = controlConversions / controlImpressions
  const variantRate = variantConversions / variantImpressions

  const pooledRate =
    (controlConversions + variantConversions) / (controlImpressions + variantImpressions)
  const standardError = Math.sqrt(
    pooledRate * (1 - pooledRate) * (1 / controlImpressions + 1 / variantImpressions)
  )

  if (standardError === 0) {
    return { significant: false, confidence: 0, lift: 0 }
  }

  const zScore = (variantRate - controlRate) / standardError
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)))
  const confidence = (1 - pValue) * 100
  const lift = controlRate > 0 ? ((variantRate - controlRate) / controlRate) * 100 : 0

  return {
    significant: pValue < 0.05,
    confidence: Math.round(confidence * 10) / 10,
    lift: Math.round(lift * 10) / 10,
  }
}

function normalCDF(x: number): number {
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const sign = x < 0 ? -1 : 1
  x = Math.abs(x) / Math.sqrt(2)

  const t = 1.0 / (1.0 + p * x)
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

  return 0.5 * (1.0 + sign * y)
}
