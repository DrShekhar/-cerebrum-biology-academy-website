import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Biological Classification MCQ for NEET 2026 | Free Practice Questions',
  description:
    'Practice 350+ free Biological Classification MCQs for NEET. Five Kingdom Classification, Monera, Protista, Fungi, Viruses questions. NCERT-based with detailed explanations.',
  keywords: [
    'Biological Classification MCQ NEET',
    'Five Kingdom MCQ',
    'Monera MCQ',
    'Protista MCQ',
    'Fungi MCQ',
    'NEET Biology Classification',
    'Class 11 Biological Classification MCQ',
    'Whittaker Classification MCQ',
    'Bacteria Types MCQ',
    'Viruses and Viroids MCQ',
  ],
  openGraph: {
    title: 'Biological Classification MCQ for NEET | 350+ Free Questions',
    description:
      'Master Biological Classification for NEET with 350+ free MCQs. Practice Five Kingdom Classification, Monera, Protista, Fungi, and Viruses questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/biological-classification',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/biological-classification',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Biological Classification MCQ for NEET',
  description:
    'Practice 350+ free Biological Classification MCQs for NEET covering Five Kingdom Classification, Monera, Protista, Fungi, and Viruses.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function BiologicalClassificationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Biological Classification"
        topicSlug="biological-classification"
        title="Biological Classification MCQ for NEET 2026"
        description="Master Biological Classification with 350+ free MCQs covering Five Kingdom Classification, Monera, Protista, Fungi, and Viruses for NEET preparation."
        questionCount={350}
        chapters={[
          'Five Kingdom Classification',
          'Monera',
          'Protista',
          'Fungi',
          'Viruses and Viroids',
        ]}
        neetWeightage="3-5%"
        difficulty="Medium"
        importantSubtopics={[
          'Whittaker Classification',
          'Bacteria Types',
          'Algae',
          'Protozoa',
          'Lichens',
          'Archaebacteria',
          'Eubacteria',
          'Cyanobacteria',
          'Mycoplasma',
          'Slime Moulds',
        ]}
        sampleQuestions={[
          {
            question: 'Who proposed the Five Kingdom Classification?',
            answer: 'R.H. Whittaker (1969)',
          },
          {
            question: 'Which kingdom includes organisms with both autotrophic and heterotrophic modes of nutrition?',
            answer: 'Protista',
          },
          {
            question: 'Lichens are a symbiotic association between',
            answer: 'Algae and Fungi',
          },
          {
            question: 'Which of the following is the smallest known cell?',
            answer: 'Mycoplasma',
          },
        ]}
        ncertReference="NCERT Class 11 Biology, Chapter 2"
        filterParams="topic=Biological%20Classification&isNcertBased=true"
      />
    </>
  )
}
