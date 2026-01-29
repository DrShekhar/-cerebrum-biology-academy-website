import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Human Health and Disease MCQ for NEET 2026 | Free Practice Questions',
  description:
    'Practice 500+ free Human Health and Disease MCQs for NEET. Immunity, Infectious Diseases, AIDS, Cancer, and Drugs & Alcohol Abuse questions. NCERT-based with explanations.',
  keywords: [
    'Human Health Disease MCQ NEET',
    'Immunity MCQ',
    'Infectious Diseases MCQ',
    'AIDS MCQ',
    'Cancer MCQ',
    'NEET Biology Human Health',
    'Class 12 Human Health MCQ',
    'Pathogen Types MCQ',
    'Vaccines MCQ NEET',
    'Malaria Life Cycle MCQ',
  ],
  openGraph: {
    title: 'Human Health and Disease MCQ for NEET | 500+ Free Questions',
    description:
      'Master Human Health and Disease for NEET with 500+ free MCQs. Practice immunity, infectious diseases, AIDS, cancer, and drugs & alcohol abuse questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/human-health-disease',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/human-health-disease',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Human Health and Disease MCQ for NEET',
  description:
    'Practice 500+ free Human Health and Disease MCQs for NEET covering immunity, infectious diseases, AIDS, cancer, and drugs & alcohol abuse with detailed explanations.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function HumanHealthDiseasePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Human Health and Disease"
        topicSlug="human-health-disease"
        title="Human Health and Disease MCQ for NEET 2026"
        description="Master Human Health and Disease with 500+ free MCQs covering immunity, infectious diseases, AIDS, cancer, and substance abuse. Practice NCERT-based questions with detailed explanations."
        questionCount={500}
        chapters={[
          'Common Diseases',
          'Immunity',
          'AIDS',
          'Cancer',
          'Drugs and Alcohol Abuse',
        ]}
        neetWeightage="6-8%"
        difficulty="Medium"
        importantSubtopics={[
          'Pathogen Types',
          'Innate vs Acquired Immunity',
          'Antibodies',
          'Vaccines',
          'Malaria Life Cycle',
          'HIV Structure and Replication',
          'Types of Cancer',
          'Oncogenes and Tumor Suppressors',
          'Drug Addiction Mechanisms',
          'Lymphoid Organs',
        ]}
        sampleQuestions={[
          {
            question: 'Which type of immunity is provided by vaccination?',
            answer: 'Active acquired immunity',
          },
          {
            question: 'The__(cells) are destroyed by HIV, leading to immunodeficiency.',
            answer: 'Helper T-lymphocytes (CD4+ T cells)',
          },
          {
            question: 'Which Plasmodium species causes the most severe form of malaria?',
            answer: 'Plasmodium falciparum',
          },
        ]}
        ncertReference="NCERT Class 12 Biology, Chapter 8"
        filterParams="topic=Human%20Health%20and%20Disease&isNcertBased=true"
      />
    </>
  )
}
