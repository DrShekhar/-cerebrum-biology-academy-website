import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Reproduction MCQ for NEET 2025 | Free Practice Questions',
  description:
    'Practice 550+ free Reproduction MCQs for NEET. Human reproduction, reproductive health, plant reproduction questions. NCERT-based with detailed explanations.',
  keywords: [
    'Reproduction MCQ NEET',
    'Human Reproduction MCQ',
    'Reproductive Health MCQ NEET',
    'Plant Reproduction MCQ',
    'Gametogenesis MCQ',
    'NEET Biology Reproduction',
    'Class 12 Reproduction MCQ',
    'Menstrual Cycle MCQ',
    'Fertilization MCQ',
    'Embryo Development MCQ',
  ],
  openGraph: {
    title: 'Reproduction MCQ for NEET | 550+ Free Questions',
    description:
      'Master Reproduction for NEET with 550+ free MCQs. Practice human reproduction, reproductive health, and plant reproduction questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/reproduction',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/reproduction',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Reproduction MCQ for NEET',
  description:
    'Practice 550+ free Reproduction MCQs for NEET covering human reproduction, reproductive health, and plant reproduction.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function ReproductionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Reproduction"
        topicSlug="reproduction"
        title="Reproduction MCQ for NEET 2025"
        description="Master Reproduction with 550+ free MCQs covering sexual reproduction in flowering plants, human reproduction, and reproductive health for NEET."
        questionCount={550}
        chapters={[
          'Reproduction in Organisms',
          'Sexual Reproduction in Flowering Plants',
          'Human Reproduction',
          'Reproductive Health',
        ]}
        neetWeightage="9-11%"
        difficulty="Medium"
        importantSubtopics={[
          'Pollination Types',
          'Double Fertilization',
          'Embryo Development in Plants',
          'Gametogenesis',
          'Menstrual Cycle',
          'Fertilization in Humans',
          'Implantation',
          'Placenta',
          'Contraception Methods',
          'Infertility and ART',
          'STDs',
        ]}
        sampleQuestions={[
          {
            question: 'Double fertilization is characteristic of',
            answer: 'Angiosperms',
          },
          {
            question: 'The acrosome of sperm contains',
            answer: 'Hydrolytic enzymes',
          },
          {
            question: 'Cu-T prevents pregnancy by',
            answer: 'Preventing implantation and increasing phagocytosis of sperm',
          },
        ]}
        ncertReference="NCERT Class 12 Biology, Chapters 1-4"
        filterParams="topic=Reproduction&isNcertBased=true"
      />
    </>
  )
}
