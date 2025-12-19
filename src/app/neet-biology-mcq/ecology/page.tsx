import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Ecology MCQ for NEET 2025 | Free Practice Questions',
  description:
    'Practice 500+ free Ecology MCQs for NEET. Ecosystem, biodiversity, environmental issues, population ecology questions. NCERT-based with detailed explanations.',
  keywords: [
    'Ecology MCQ NEET',
    'Ecosystem MCQ',
    'Biodiversity MCQ NEET',
    'Environmental Issues MCQ',
    'Population Ecology MCQ',
    'NEET Biology Ecology',
    'Class 12 Ecology MCQ',
    'Organisms and Populations MCQ',
    'Food Chain MCQ',
    'Ecological Succession MCQ',
  ],
  openGraph: {
    title: 'Ecology MCQ for NEET | 500+ Free Questions',
    description:
      'Master Ecology for NEET with 500+ free MCQs. Practice ecosystem, biodiversity, and environmental issues questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/ecology',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/ecology',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Ecology MCQ for NEET',
  description:
    'Practice 500+ free Ecology MCQs for NEET covering ecosystem, biodiversity, and environmental issues.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function EcologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Ecology"
        topicSlug="ecology"
        title="Ecology MCQ for NEET 2025"
        description="Master Ecology with 500+ free MCQs covering organisms and populations, ecosystem, biodiversity, and environmental issues for NEET preparation."
        questionCount={500}
        chapters={[
          'Organisms and Populations',
          'Ecosystem',
          'Biodiversity and Conservation',
          'Environmental Issues',
        ]}
        neetWeightage="8-10%"
        difficulty="Medium"
        importantSubtopics={[
          'Population Interactions',
          'Ecological Pyramids',
          'Energy Flow',
          'Nutrient Cycling',
          'Ecological Succession',
          'Biodiversity Hotspots',
          'In-situ Conservation',
          'Ex-situ Conservation',
          'Ozone Depletion',
          'Greenhouse Effect',
          'Eutrophication',
        ]}
        sampleQuestions={[
          {
            question: 'The pyramid of energy is always',
            answer: 'Upright',
          },
          {
            question: 'Which one is an example of ex-situ conservation?',
            answer: 'Seed banks and botanical gardens',
          },
          {
            question: 'The zone where fresh water and salt water mix is called',
            answer: 'Estuary',
          },
        ]}
        ncertReference="NCERT Class 12 Biology, Chapters 13-16"
        filterParams="topic=Ecology&isNcertBased=true"
      />
    </>
  )
}
