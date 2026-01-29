import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Principles of Inheritance MCQ for NEET 2026 | Free Practice Questions',
  description:
    'Practice 500+ free Principles of Inheritance and Variation MCQs for NEET. Mendel laws, linkage, sex determination, mutation, chromosomal disorders questions. NCERT-based with explanations.',
  keywords: [
    'Genetics MCQ NEET',
    'Mendel Laws MCQ',
    'Inheritance MCQ',
    'Linkage MCQ',
    'Chromosomal Disorders MCQ',
    'Sex Determination MCQ',
    'Crossing Over MCQ',
    'Codominance MCQ',
    'Multiple Alleles MCQ',
    'NEET Biology Genetics',
  ],
  openGraph: {
    title: 'Principles of Inheritance MCQ for NEET | 500+ Free Questions',
    description:
      'Master Principles of Inheritance and Variation for NEET with 500+ free MCQs. Practice Mendelian genetics, linkage, and chromosomal disorders questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/principles-inheritance',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/principles-inheritance',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Principles of Inheritance and Variation MCQ for NEET',
  description:
    'Practice 500+ free Principles of Inheritance and Variation MCQs for NEET covering Mendelian genetics, linkage, sex determination, and chromosomal disorders.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function PrinciplesInheritancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Principles of Inheritance and Variation"
        topicSlug="principles-inheritance"
        title="Principles of Inheritance MCQ for NEET 2026"
        description="Master Principles of Inheritance and Variation with 500+ free MCQs covering Mendelian genetics, linkage and recombination, sex determination, mutations, and chromosomal disorders for NEET preparation."
        questionCount={500}
        chapters={[
          "Mendel's Laws",
          'Linkage and Recombination',
          'Sex Determination',
          'Mutation',
          'Chromosomal Disorders',
        ]}
        neetWeightage="10-12%"
        difficulty="Hard"
        importantSubtopics={[
          'Law of Dominance',
          'Law of Segregation',
          'Independent Assortment',
          'Incomplete Dominance',
          'Codominance',
          'Multiple Alleles',
          'Linkage',
          'Crossing Over',
          'Sex-Linked Inheritance',
          'Autosomal Disorders',
          'Aneuploidy and Polyploidy',
        ]}
        sampleQuestions={[
          {
            question: 'In a dihybrid cross, the phenotypic ratio in F2 generation is',
            answer: '9:3:3:1',
          },
          {
            question: 'Colour blindness is inherited as a sex-linked recessive trait. If a carrier woman marries a normal man, the probability of their son being colour blind is',
            answer: '50%',
          },
          {
            question: 'The frequency of recombination between two linked genes is',
            answer: 'Directly proportional to the distance between them',
          },
          {
            question: 'Down syndrome is caused by',
            answer: 'Trisomy of chromosome 21',
          },
        ]}
        ncertReference="NCERT Class 12 Biology, Chapter 5"
        filterParams="topic=Principles%20of%20Inheritance%20and%20Variation&isNcertBased=true"
      />
    </>
  )
}
