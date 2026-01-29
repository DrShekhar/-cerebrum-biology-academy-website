import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Biotechnology Principles MCQ for NEET 2026 | Free Practice Questions',
  description: 'Practice 300+ free Biotechnology: Principles and Processes MCQs for NEET. Recombinant DNA, PCR, Restriction Enzymes, Vectors, and Cloning questions. NCERT Class 12 based with detailed explanations.',
  keywords: [
    'Biotechnology MCQ NEET',
    'Recombinant DNA MCQ',
    'PCR MCQ',
    'Restriction Enzymes MCQ',
    'Vectors MCQ',
    'pBR322 MCQ',
    'Ti Plasmid MCQ',
    'Gel Electrophoresis MCQ',
    'Cloning MCQ NEET',
    'Class 12 Biotechnology',
    'NEET Biology Biotechnology',
  ],
  openGraph: {
    title: 'Biotechnology Principles MCQ for NEET | 300+ Free Questions',
    description: 'Master Biotechnology: Principles and Processes for NEET with 300+ free MCQs. Practice recombinant DNA, PCR, restriction enzymes, and vectors questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/biotechnology-principles',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/biotechnology-principles',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Biotechnology Principles MCQ for NEET',
  description: 'Practice 300+ free Biotechnology: Principles and Processes MCQs for NEET covering recombinant DNA technology, PCR, restriction enzymes, vectors, and cloning.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function BiotechnologyPrinciplesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Biotechnology: Principles and Processes"
        topicSlug="biotechnology-principles"
        title="Biotechnology Principles MCQ for NEET 2026"
        description="Master Biotechnology: Principles and Processes with 300+ free MCQs covering recombinant DNA technology, PCR, restriction enzymes, vectors, and gene cloning for NEET preparation."
        questionCount={300}
        chapters={[
          'Principles of Biotechnology',
          'Tools of rDNA Technology',
          'Processes of rDNA Technology',
        ]}
        neetWeightage="4-6%"
        difficulty="Medium"
        importantSubtopics={[
          'Restriction Enzymes',
          'Vectors (pBR322, Ti Plasmid)',
          'PCR (Polymerase Chain Reaction)',
          'Gel Electrophoresis',
          'Cloning',
          'DNA Ligase',
          'Competent Host Cells',
          'Bioreactors',
          'Downstream Processing',
          'Insertional Inactivation',
          'Origin of Replication',
        ]}
        sampleQuestions={[
          {
            question: 'The first restriction endonuclease isolated was',
            answer: 'Hind II',
          },
          {
            question: 'pBR322 is a',
            answer: 'Cloning vector derived from E. coli plasmid',
          },
          {
            question: 'The technique used to separate DNA fragments is',
            answer: 'Agarose gel electrophoresis',
          },
        ]}
        ncertReference="NCERT Class 12 Biology, Chapter 11"
        filterParams="topic=Biotechnology: Principles and Processes&isNcertBased=true"
      />
    </>
  )
}
