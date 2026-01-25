/**
 * Quick Answers Section - Optimized for Google Featured Snippets
 * Short, direct answers (40-60 words) for common NEET coaching queries
 */

import { CEREBRUM_METRICS } from '@/lib/constants/metrics'

interface QuickAnswer {
  question: string
  answer: string
  metric?: string
  metricLabel?: string
}

interface QuickAnswersProps {
  locality?: string
  className?: string
}

export function QuickAnswers({ locality = 'South Delhi', className = '' }: QuickAnswersProps) {
  const quickAnswers: QuickAnswer[] = [
    {
      question: 'What is the success rate?',
      answer: `${CEREBRUM_METRICS.successRateText} of students who complete our full program qualify NEET with AIR under 50,000.`,
      metric: CEREBRUM_METRICS.successRateText,
      metricLabel: 'Success Rate',
    },
    {
      question: 'What is the batch size?',
      answer: `Maximum ${CEREBRUM_METRICS.batchSizeText} per batch for personalized attention and daily doubt-clearing.`,
      metric: CEREBRUM_METRICS.batchSizeText,
      metricLabel: 'Per Batch',
    },
    {
      question: 'What is the top score?',
      answer: `${CEREBRUM_METRICS.topScoreText} in NEET Biology achieved by our students.`,
      metric: CEREBRUM_METRICS.topScoreText,
      metricLabel: 'Top Score',
    },
    {
      question: 'What is the fee?',
      answer: `₹${CEREBRUM_METRICS.feeClass12.toLocaleString()}/year for Class 12. EMI and scholarships up to 50% available.`,
      metric: `₹${(CEREBRUM_METRICS.feeClass12 / 1000).toFixed(0)}K`,
      metricLabel: 'Per Year',
    },
  ]

  return (
    <section className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Quick Answers: NEET Coaching in {locality}
      </h2>
      <p className="text-gray-600 mb-6">
        Fast facts about Cerebrum Biology Academy
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickAnswers.map((qa, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            itemScope
            itemType="https://schema.org/Question"
          >
            <h3
              className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2"
              itemProp="name"
            >
              {qa.question}
            </h3>

            {qa.metric && (
              <div className="mb-2">
                <span className="text-3xl font-bold text-indigo-600">{qa.metric}</span>
                {qa.metricLabel && (
                  <span className="text-sm text-gray-500 ml-1">{qa.metricLabel}</span>
                )}
              </div>
            )}

            <div
              itemProp="acceptedAnswer"
              itemScope
              itemType="https://schema.org/Answer"
            >
              <p className="text-sm text-gray-700 leading-relaxed" itemProp="text">
                {qa.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional snippet-optimized content */}
      <div className="mt-6 pt-6 border-t border-indigo-100">
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-green-500 font-bold">+</span>
            <div>
              <strong className="text-gray-900">Expert Faculty:</strong>
              <span className="text-gray-600"> AIIMS/JIPMER trained with {CEREBRUM_METRICS.facultyExperienceText} experience</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 font-bold">+</span>
            <div>
              <strong className="text-gray-900">Flexible Modes:</strong>
              <span className="text-gray-600"> Online, Offline, and Hybrid options available</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 font-bold">+</span>
            <div>
              <strong className="text-gray-900">Proven Results:</strong>
              <span className="text-gray-600"> {CEREBRUM_METRICS.medicalSelectionsText} medical college selections</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
