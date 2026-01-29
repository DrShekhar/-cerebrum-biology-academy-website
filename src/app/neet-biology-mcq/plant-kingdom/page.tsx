import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Plant Kingdom MCQ for NEET 2026 | Free Practice Questions',
  description:
    'Practice 400+ free Plant Kingdom MCQs for NEET. Algae, Bryophytes, Pteridophytes, Gymnosperms, Angiosperms questions. NCERT-based with detailed explanations.',
  keywords: [
    'Plant Kingdom MCQ NEET',
    'Algae MCQ',
    'Bryophytes MCQ',
    'Pteridophytes MCQ',
    'Gymnosperms MCQ',
    'Angiosperms MCQ',
    'NEET Biology Plant Kingdom',
    'Class 11 Plant Kingdom MCQ',
    'Alternation of Generations MCQ',
    'Plant Classification MCQ',
  ],
  openGraph: {
    title: 'Plant Kingdom MCQ for NEET | 400+ Free Questions',
    description:
      'Master Plant Kingdom for NEET with 400+ free MCQs. Practice Algae, Bryophytes, Pteridophytes, Gymnosperms, and Angiosperms questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/plant-kingdom',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/plant-kingdom',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Plant Kingdom MCQ for NEET',
  description:
    'Practice 400+ free Plant Kingdom MCQs for NEET covering Algae, Bryophytes, Pteridophytes, Gymnosperms, and Angiosperms.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function PlantKingdomPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Plant Kingdom"
        topicSlug="plant-kingdom"
        title="Plant Kingdom MCQ for NEET 2026"
        description="Master Plant Kingdom with 400+ free MCQs covering Algae, Bryophytes, Pteridophytes, Gymnosperms, and Angiosperms for NEET preparation."
        questionCount={400}
        chapters={[
          'Algae',
          'Bryophytes',
          'Pteridophytes',
          'Gymnosperms',
          'Angiosperms',
        ]}
        neetWeightage="4-6%"
        difficulty="Medium"
        importantSubtopics={[
          'Classification of Algae',
          'Alternation of Generations',
          'Heterospory',
          'Seed Habit',
          'Double Fertilization',
          'Life Cycle Patterns',
          'Xylem and Phloem Evolution',
          'Archegonium and Antheridium',
          'Sporophyte and Gametophyte',
          'Economic Importance of Plants',
        ]}
        sampleQuestions={[
          {
            question: 'Which type of life cycle is found in Bryophytes?',
            answer: 'Haplodiplontic with dominant gametophyte',
          },
          {
            question: 'Heterospory is seen for the first time in which plant group?',
            answer: 'Pteridophytes (Selaginella)',
          },
          {
            question: 'Double fertilization is a characteristic feature of',
            answer: 'Angiosperms',
          },
          {
            question: 'Which of the following lacks true vascular tissue (xylem and phloem)?',
            answer: 'Bryophytes',
          },
        ]}
        ncertReference="NCERT Class 11 Biology, Chapter 3"
        filterParams="topic=Plant%20Kingdom&isNcertBased=true"
      />
    </>
  )
}
