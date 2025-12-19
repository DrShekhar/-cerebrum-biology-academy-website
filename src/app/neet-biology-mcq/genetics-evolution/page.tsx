import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Genetics & Evolution MCQ for NEET 2026 | Free Practice Questions',
  description:
    'Practice 600+ free Genetics & Evolution MCQs for NEET. Mendel laws, molecular genetics, DNA replication, evolution theory questions. NCERT-based with explanations.',
  keywords: [
    'Genetics MCQ NEET',
    'Evolution MCQ NEET',
    'Mendel Laws MCQ',
    'DNA Replication MCQ',
    'Molecular Basis of Inheritance',
    'NEET Biology Genetics',
    'Class 12 Genetics MCQ',
    'Darwin Evolution MCQ',
    'Human Genetics MCQ',
    'Chromosomal disorders MCQ',
  ],
  openGraph: {
    title: 'Genetics & Evolution MCQ for NEET | 600+ Free Questions',
    description:
      'Master Genetics & Evolution for NEET with 600+ free MCQs. Practice Mendelian genetics, molecular genetics, and evolution questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/genetics-evolution',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/genetics-evolution',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Genetics & Evolution MCQ for NEET',
  description:
    'Practice 600+ free Genetics & Evolution MCQs for NEET covering Mendelian genetics, molecular genetics, and evolution.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function GeneticsEvolutionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Genetics & Evolution"
        topicSlug="genetics-evolution"
        title="Genetics & Evolution MCQ for NEET 2026"
        description="Master Genetics & Evolution with 600+ free MCQs covering Mendelian genetics, molecular basis of inheritance, and evolutionary biology for NEET preparation."
        questionCount={600}
        chapters={[
          'Principles of Inheritance and Variation',
          'Molecular Basis of Inheritance',
          'Evolution',
        ]}
        neetWeightage="10-12%"
        difficulty="Hard"
        importantSubtopics={[
          "Mendel's Laws",
          'Linkage and Crossing Over',
          'Sex Determination',
          'Chromosomal Disorders',
          'DNA Structure',
          'DNA Replication',
          'Transcription',
          'Translation',
          'Genetic Code',
          'Natural Selection',
          "Hardy-Weinberg's Principle",
        ]}
        sampleQuestions={[
          {
            question: 'In a dihybrid cross, the ratio of F2 generation is',
            answer: '9:3:3:1',
          },
          {
            question: 'The enzyme that catalyzes transcription is',
            answer: 'RNA polymerase',
          },
          {
            question: 'Analogous organs are a result of',
            answer: 'Convergent evolution',
          },
        ]}
        ncertReference="NCERT Class 12 Biology, Chapters 5-7"
        filterParams="topic=Genetics%20and%20Evolution&isNcertBased=true"
      />
    </>
  )
}
