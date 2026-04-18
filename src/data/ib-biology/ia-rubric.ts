/**
 * IB Biology Internal Assessment (IA) rubric — 2025 syllabus (first assessment May 2025).
 *
 * Total: 24 marks across 4 criteria, each worth 6 marks.
 * Weighting: IA contributes 20% of the final IB Biology grade at both HL and SL.
 *
 * Sources:
 *  - IB Biology Guide 2025 (official)
 *  - IBDP Biology Teacher Support Material (2025)
 *
 * If the IB publishes additional clarifications (e.g. revised descriptors),
 * update `descriptorBands` below — the pages consume this object directly.
 */

export type CriterionKey = 'research-design' | 'data-analysis' | 'conclusion' | 'evaluation'

export interface Criterion {
  key: CriterionKey
  name: string
  marks: number
  headlineDescription: string
  whatExaminersReward: string[]
  commonPitfalls: string[]
  descriptorBands: {
    band: '1–2 marks (Basic)' | '3–4 marks (Satisfactory)' | '5–6 marks (Excellent)'
    summary: string
  }[]
}

export const iaCriteria: Criterion[] = [
  {
    key: 'research-design',
    name: 'Research Design',
    marks: 6,
    headlineDescription:
      'Addresses how clearly the research question is framed, how well the methodology is justified, and whether the variables and controls are appropriate.',
    whatExaminersReward: [
      'A focused research question that names the independent variable, dependent variable, and organism/system.',
      'Explicit biological background that makes a testable prediction.',
      'Methodology detailed enough to be reproduced — including measurement ranges, replicates, and controls.',
      'Clear justification of variable ranges (why 5 levels, why that spacing).',
    ],
    commonPitfalls: [
      'Research question that is too broad ("How does temperature affect enzymes?").',
      'Missing or implicit control variables.',
      'Only 3 levels of the independent variable — insufficient for trend analysis.',
      'No rationale for why the chosen methodology (over alternatives).',
    ],
    descriptorBands: [
      {
        band: '1–2 marks (Basic)',
        summary:
          'Research question is vague. Methodology is listed but not justified. Few control variables identified.',
      },
      {
        band: '3–4 marks (Satisfactory)',
        summary:
          'Focused question with most variables identified. Method reproducible but justification is partial.',
      },
      {
        band: '5–6 marks (Excellent)',
        summary:
          'Precisely framed RQ with strong biological rationale. Fully justified method. All variables controlled with quantified tolerances.',
      },
    ],
  },
  {
    key: 'data-analysis',
    name: 'Data Analysis',
    marks: 6,
    headlineDescription:
      'Covers accurate recording of raw data, appropriate processing (including uncertainty), and effective presentation.',
    whatExaminersReward: [
      'Raw data tables with correct units, SI notation, and explicit uncertainties.',
      'Processed data supported by correct calculations (means, SD, rates) with worked examples.',
      'Statistical test selected and justified (e.g. ANOVA for >2 independent groups).',
      'Figures that visualise trend with error bars and clearly labelled axes.',
    ],
    commonPitfalls: [
      'Uncertainties omitted or copied from instrument manuals without justification.',
      'Statistical test applied without checking assumptions (normality, equal variance).',
      'Bar charts used when scatter / line plots with regression would better reveal the trend.',
      'Processing shown only as final numbers — no worked example of any calculation.',
    ],
    descriptorBands: [
      {
        band: '1–2 marks (Basic)',
        summary: 'Raw data incomplete. Processing minimal. No uncertainties or statistics.',
      },
      {
        band: '3–4 marks (Satisfactory)',
        summary:
          'Data recorded with units and uncertainties. Basic processing (mean, SD). One figure. Statistical test present but assumptions not checked.',
      },
      {
        band: '5–6 marks (Excellent)',
        summary:
          'Data tables complete with uncertainties. Full worked example of each calculation. Justified statistical test with reported effect size. Effective, accurate figures.',
      },
    ],
  },
  {
    key: 'conclusion',
    name: 'Conclusion',
    marks: 6,
    headlineDescription:
      'Assesses how the conclusion links processed data to the research question and to established biology — including comparison with accepted values or literature.',
    whatExaminersReward: [
      'Explicit answer to the research question, supported by the trend and magnitude of processed data.',
      'Mechanism-level explanation grounded in IB-level biology (e.g. enzyme active-site shape change).',
      'Comparison with literature values (published rates, expected Q₁₀, expected Michaelis constants).',
      'Quantitative statement of trend (e.g. slope, percentage change) not just direction.',
    ],
    commonPitfalls: [
      'Conclusion restates the hypothesis without engaging with the data.',
      'No comparison with literature or theoretical expectation.',
      'Over-claiming causation from a correlational design.',
      'Ignoring inconvenient data points (outliers) instead of discussing them.',
    ],
    descriptorBands: [
      {
        band: '1–2 marks (Basic)',
        summary: 'States an answer without quantitative support or biological reasoning.',
      },
      {
        band: '3–4 marks (Satisfactory)',
        summary:
          'Answer supported by data trend. Biological mechanism explained. Limited comparison with literature.',
      },
      {
        band: '5–6 marks (Excellent)',
        summary:
          'Quantitative, mechanism-supported conclusion. Explicit comparison with literature. Residual data variance explicitly acknowledged.',
      },
    ],
  },
  {
    key: 'evaluation',
    name: 'Evaluation',
    marks: 6,
    headlineDescription:
      'Evaluates methodological weaknesses, sources of error, and — critically — gives specific, realistic improvements.',
    whatExaminersReward: [
      'Ranking of methodological weaknesses by their likely impact on uncertainty.',
      'Distinguishing between random error (affects precision) and systematic error (affects accuracy).',
      'Specific, actionable improvements (e.g. "use a thermostatically controlled water bath to reduce the ±2 °C drift").',
      'Extension suggestions that directly extend the biological question.',
    ],
    commonPitfalls: [
      'Listing generic limitations ("human error", "time constraint") without impact analysis.',
      'Suggesting vague improvements ("do more trials") instead of specific ones.',
      'Confusing random and systematic error.',
      'Extensions that are unrelated to the original research question.',
    ],
    descriptorBands: [
      {
        band: '1–2 marks (Basic)',
        summary: 'Generic limitations listed. No impact analysis. Vague improvements.',
      },
      {
        band: '3–4 marks (Satisfactory)',
        summary:
          'Specific weaknesses identified with some ranking. Improvements connected to weaknesses. One credible extension.',
      },
      {
        band: '5–6 marks (Excellent)',
        summary:
          'Weaknesses ranked by impact on the uncertainty of the conclusion. Random vs systematic errors distinguished. Specific, realistic improvements and coherent extension.',
      },
    ],
  },
]

export const iaMeta = {
  totalMarks: 24,
  weightOfFinalGrade: '20%',
  levelsAssessed: 'Both HL and SL (shared IA)',
  wordCountGuideline: '3000 words (maximum)',
  firstAssessment: 'May 2025',
} as const

export function iaCriterion(key: CriterionKey): Criterion {
  const c = iaCriteria.find((x) => x.key === key)
  if (!c) throw new Error(`Unknown IA criterion: ${key}`)
  return c
}
