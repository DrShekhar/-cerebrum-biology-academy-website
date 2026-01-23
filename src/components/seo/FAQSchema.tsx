// Server Component - no client-side interactivity needed
interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  questions: FAQItem[]
  pageUrl?: string
}

export function FAQSchema({ questions, pageUrl }: FAQSchemaProps) {
  if (!questions || questions.length === 0) {
    return null
  }

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    ...(pageUrl && { url: pageUrl }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  )
}

interface FAQDisplayProps {
  questions: FAQItem[]
  title?: string
  className?: string
}

export function FAQDisplay({
  questions,
  title = 'Frequently Asked Questions',
  className = '',
}: FAQDisplayProps) {
  if (!questions || questions.length === 0) {
    return null
  }

  return (
    <section className={`my-8 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-4">
        {questions.map((item) => (
          <details
            key={`faq-${item.question.slice(0, 30).replace(/\s+/g, '-').toLowerCase()}`}
            className="group bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-gray-900 pr-4">{item.question}</h3>
              <span className="text-gray-500 group-open:rotate-180 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">{item.answer}</div>
          </details>
        ))}
      </div>
      <FAQSchema questions={questions} />
    </section>
  )
}
