import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Biomolecules MCQ for NEET 2026 | Free Practice Questions',
  description: 'Practice 400+ free Biomolecules MCQs for NEET. Carbohydrates, Proteins, Lipids, Enzymes, and Nucleic Acids questions. NCERT Class 11 based with detailed explanations.',
  keywords: [
    'Biomolecules MCQ NEET',
    'Carbohydrates MCQ',
    'Proteins MCQ',
    'Lipids MCQ',
    'Enzymes MCQ',
    'Nucleic Acids MCQ',
    'Amino Acids MCQ NEET',
    'DNA RNA MCQ',
    'Class 11 Biomolecules',
    'NEET Biology Biomolecules',
  ],
  openGraph: {
    title: 'Biomolecules MCQ for NEET | 400+ Free Questions',
    description: 'Master Biomolecules for NEET with 400+ free MCQs. Practice carbohydrates, proteins, lipids, enzymes, and nucleic acids questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/biomolecules',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/biomolecules',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Biomolecules MCQ for NEET',
  description: 'Practice 400+ free Biomolecules MCQs for NEET covering carbohydrates, proteins, lipids, enzymes, and nucleic acids.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function BiomoleculesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Biomolecules"
        topicSlug="biomolecules"
        title="Biomolecules MCQ for NEET 2026"
        description="Master Biomolecules with 400+ free MCQs covering carbohydrates, proteins, lipids, nucleic acids, and enzymes for NEET preparation."
        questionCount={400}
        chapters={[
          'Carbohydrates',
          'Proteins',
          'Lipids',
          'Nucleic Acids',
          'Enzymes',
        ]}
        neetWeightage="6-8%"
        difficulty="Medium"
        importantSubtopics={[
          'Monosaccharides',
          'Polysaccharides',
          'Amino Acids',
          'Protein Structure',
          'Fatty Acids',
          'DNA/RNA Structure',
          'Enzyme Properties',
          'Glycosidic Bonds',
          'Peptide Bonds',
          'Enzyme Kinetics',
          'Cofactors and Coenzymes',
        ]}
        sampleQuestions={[
          {
            question: 'The lock and key model of enzyme action was proposed by',
            answer: 'Emil Fischer',
          },
          {
            question: 'Peptide bonds are formed between amino acids by',
            answer: 'Dehydration synthesis (condensation reaction)',
          },
          {
            question: 'Which of the following is a reducing sugar?',
            answer: 'Maltose',
          },
        ]}
        ncertReference="NCERT Class 11 Biology, Chapter 9"
        filterParams="topic=Biomolecules&isNcertBased=true"
      />
    </>
  )
}
