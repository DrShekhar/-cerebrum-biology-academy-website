import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Cell: The Unit of Life MCQ for NEET 2026 | Free Practice Questions',
  description: 'Practice 500+ free Cell Biology MCQs for NEET. Cell structure, cell organelles, prokaryotic vs eukaryotic cells questions. NCERT Class 11 based with detailed explanations.',
  keywords: [
    'Cell Unit of Life MCQ NEET',
    'Cell Biology MCQ',
    'Cell Organelles MCQ NEET',
    'Prokaryotic Eukaryotic MCQ',
    'Cell Structure MCQ',
    'NEET Biology Cell',
    'Class 11 Cell MCQ',
    'Mitochondria MCQ',
    'Nucleus MCQ NEET',
    'Cell Membrane MCQ',
  ],
  openGraph: {
    title: 'Cell: The Unit of Life MCQ for NEET | 500+ Free Questions',
    description: 'Master Cell Biology for NEET with 500+ free MCQs. Practice cell structure, organelles, and cell functions questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/cell-unit-of-life',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/cell-unit-of-life',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Cell: The Unit of Life MCQ for NEET',
  description: 'Practice 500+ free Cell Biology MCQs for NEET covering cell structure, organelles, and cellular functions.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function CellUnitOfLifePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Cell: The Unit of Life"
        topicSlug="cell-unit-of-life"
        title="Cell: The Unit of Life MCQ for NEET 2026"
        description="Master Cell Biology with 500+ free MCQs covering cell structure, organelles, prokaryotic and eukaryotic cells for NEET preparation."
        questionCount={500}
        chapters={[
          'Cell Theory',
          'Prokaryotic Cells',
          'Eukaryotic Cells',
          'Cell Organelles',
          'Cell Membrane',
        ]}
        neetWeightage="8-10%"
        difficulty="Medium"
        importantSubtopics={[
          'Cell Theory and Discovery',
          'Prokaryotic vs Eukaryotic',
          'Cell Membrane Structure',
          'Nucleus and Nucleolus',
          'Mitochondria',
          'Endoplasmic Reticulum',
          'Golgi Apparatus',
          'Lysosomes',
          'Ribosomes',
          'Chloroplasts',
          'Cytoskeleton',
        ]}
        sampleQuestions={[
          {
            question: 'The fluid mosaic model of plasma membrane was proposed by',
            answer: 'Singer and Nicolson',
          },
          {
            question: 'Which organelle is called the powerhouse of the cell?',
            answer: 'Mitochondria',
          },
          {
            question: '70S ribosomes are found in',
            answer: 'Prokaryotes, mitochondria, and chloroplasts',
          },
        ]}
        ncertReference="NCERT Class 11 Biology, Chapter 8"
        filterParams="topic=Cell&isNcertBased=true"
      />
    </>
  )
}
