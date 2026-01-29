import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Human Reproduction MCQ for NEET 2026 | Free Practice Questions',
  description:
    'Practice 400+ free Human Reproduction MCQs for NEET. Gametogenesis, fertilization, embryonic development, menstrual cycle questions. NCERT-based with detailed explanations.',
  keywords: [
    'Human Reproduction MCQ NEET',
    'Gametogenesis MCQ',
    'Fertilization MCQ',
    'Embryonic Development MCQ',
    'Spermatogenesis MCQ',
    'Oogenesis MCQ',
    'Menstrual Cycle MCQ',
    'Implantation MCQ',
    'Placenta MCQ',
    'Parturition MCQ',
    'NEET Biology Human Reproduction',
    'Class 12 Human Reproduction MCQ',
  ],
  openGraph: {
    title: 'Human Reproduction MCQ for NEET | 400+ Free Questions',
    description:
      'Master Human Reproduction for NEET with 400+ free MCQs. Practice gametogenesis, fertilization, embryonic development, and menstrual cycle questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/human-reproduction',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/human-reproduction',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Human Reproduction MCQ for NEET',
  description:
    'Practice 400+ free Human Reproduction MCQs for NEET covering gametogenesis, fertilization, embryonic development, and menstrual cycle.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function HumanReproductionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Human Reproduction"
        topicSlug="human-reproduction"
        title="Human Reproduction MCQ for NEET 2026"
        description="Master Human Reproduction with 400+ free MCQs covering male and female reproductive systems, gametogenesis, fertilization, pregnancy, and embryonic development for NEET."
        questionCount={400}
        chapters={[
          'Male Reproductive System',
          'Female Reproductive System',
          'Gametogenesis',
          'Fertilization',
          'Pregnancy',
        ]}
        neetWeightage="5-7%"
        difficulty="Medium"
        importantSubtopics={[
          'Spermatogenesis',
          'Oogenesis',
          'Menstrual Cycle',
          'Implantation',
          'Placenta',
          'Parturition',
        ]}
        sampleQuestions={[
          {
            question: 'The middle piece of human sperm contains',
            answer: 'Mitochondria arranged spirally',
          },
          {
            question: 'Corpus luteum secretes',
            answer: 'Progesterone',
          },
          {
            question: 'Fertilization in humans occurs in',
            answer: 'Ampullary-isthmic junction of fallopian tube',
          },
        ]}
        ncertReference="Class 12 Biology, Chapter 3"
        filterParams="topic=Human Reproduction&isNcertBased=true"
      />
    </>
  )
}
