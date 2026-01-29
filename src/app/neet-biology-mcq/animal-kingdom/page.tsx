import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Animal Kingdom MCQ for NEET 2026 | Free Practice Questions',
  description:
    'Practice 500+ free Animal Kingdom MCQs for NEET. Phylum, Chordata, Non-Chordata, body symmetry, coelom questions. NCERT-based with detailed explanations.',
  keywords: [
    'Animal Kingdom MCQ NEET',
    'Phylum MCQ',
    'Chordata MCQ',
    'Non-Chordata MCQ',
    'NEET Biology Animal Kingdom',
    'Class 11 Animal Kingdom MCQ',
    'Porifera MCQ',
    'Arthropoda MCQ',
    'Body Symmetry MCQ',
    'Coelom MCQ NEET',
  ],
  openGraph: {
    title: 'Animal Kingdom MCQ for NEET | 500+ Free Questions',
    description:
      'Master Animal Kingdom for NEET with 500+ free MCQs. Practice Chordata, Non-Chordata, and classification questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/animal-kingdom',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/animal-kingdom',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Animal Kingdom MCQ for NEET',
  description:
    'Practice 500+ free Animal Kingdom MCQs for NEET covering Chordata, Non-Chordata, and classification of animals.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function AnimalKingdomPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Animal Kingdom"
        topicSlug="animal-kingdom"
        title="Animal Kingdom MCQ for NEET 2026"
        description="Master Animal Kingdom with 500+ free MCQs covering basis of classification, phylum characteristics, Chordata, and Non-Chordata for NEET preparation."
        questionCount={500}
        chapters={[
          'Porifera',
          'Cnidaria',
          'Platyhelminthes',
          'Annelida',
          'Arthropoda',
          'Mollusca',
          'Echinodermata',
          'Chordata',
        ]}
        neetWeightage="5-7%"
        difficulty="Medium"
        importantSubtopics={[
          'Basis of Classification',
          'Body Symmetry',
          'Coelom',
          'Segmentation',
          'Notochord',
          'Diploblastic and Triploblastic',
          'Open and Closed Circulatory System',
          'Metameric Segmentation',
          'Water Vascular System',
          'Vertebral Column',
          'Gill Slits',
        ]}
        sampleQuestions={[
          {
            question: 'Which phylum shows the presence of water vascular system?',
            answer: 'Echinodermata',
          },
          {
            question: 'Notochord is present in which group of animals?',
            answer: 'Chordata',
          },
          {
            question: 'Which is the largest phylum in the Animal Kingdom?',
            answer: 'Arthropoda',
          },
        ]}
        ncertReference="NCERT Class 11 Biology, Chapter 4"
        filterParams="topic=Animal Kingdom&isNcertBased=true"
      />
    </>
  )
}
