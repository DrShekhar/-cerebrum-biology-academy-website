import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Molecular Basis of Inheritance MCQ for NEET 2026 | Free Practice Questions',
  description:
    'Practice 500+ free Molecular Basis of Inheritance MCQs for NEET. DNA replication, transcription, translation, genetic code, lac operon questions. NCERT-based with explanations.',
  keywords: [
    'DNA Replication MCQ NEET',
    'Transcription MCQ',
    'Translation MCQ',
    'Genetic Code MCQ',
    'Central Dogma MCQ',
    'Molecular Basis of Inheritance MCQ',
    'NEET Biology DNA',
    'Class 12 Molecular Biology MCQ',
    'Lac Operon MCQ',
    'Okazaki Fragments MCQ',
  ],
  openGraph: {
    title: 'Molecular Basis of Inheritance MCQ for NEET | 500+ Free Questions',
    description:
      'Master Molecular Basis of Inheritance for NEET with 500+ free MCQs. Practice DNA replication, transcription, translation, and gene regulation questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/molecular-inheritance',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/molecular-inheritance',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Molecular Basis of Inheritance MCQ for NEET',
  description:
    'Practice 500+ free Molecular Basis of Inheritance MCQs for NEET covering DNA structure, replication, transcription, translation, and gene regulation.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function MolecularInheritancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Molecular Basis of Inheritance"
        topicSlug="molecular-inheritance"
        title="Molecular Basis of Inheritance MCQ for NEET 2026"
        description="Master Molecular Basis of Inheritance with 500+ free MCQs covering DNA structure, replication, transcription, translation, genetic code, and gene regulation for NEET preparation."
        questionCount={500}
        chapters={[
          'DNA Structure',
          'DNA Replication',
          'Transcription',
          'Translation',
          'Gene Regulation',
        ]}
        neetWeightage="8-10%"
        difficulty="Hard"
        importantSubtopics={[
          'Watson-Crick Model',
          'Semiconservative Replication',
          'Okazaki Fragments',
          'mRNA Processing',
          'Genetic Code Properties',
          'Lac Operon',
          'Central Dogma',
          'DNA Polymerase',
          'RNA Polymerase',
          'Codon-Anticodon Pairing',
          'Post-transcriptional Modifications',
        ]}
        sampleQuestions={[
          {
            question: 'DNA polymerase III requires a primer because it can only add nucleotides to',
            answer: "3' OH end of existing strand",
          },
          {
            question: 'The anticodon for the codon AUG is',
            answer: 'UAC',
          },
          {
            question: 'In lac operon, the repressor protein is synthesized by',
            answer: 'i gene (regulator gene)',
          },
          {
            question: 'Okazaki fragments are synthesized on which strand during DNA replication',
            answer: 'Lagging strand (3\' to 5\' template)',
          },
        ]}
        ncertReference="NCERT Class 12 Biology, Chapter 6"
        filterParams="topic=Molecular%20Basis%20of%20Inheritance&isNcertBased=true"
      />
    </>
  )
}
