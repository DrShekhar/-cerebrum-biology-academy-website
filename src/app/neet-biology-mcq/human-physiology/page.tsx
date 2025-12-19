import { Metadata } from 'next'
import { TopicLandingPage } from '@/components/mcq/TopicLandingPage'

export const metadata: Metadata = {
  title: 'Human Physiology MCQ for NEET 2026 | Free Practice Questions',
  description:
    'Practice 800+ free Human Physiology MCQs for NEET. Digestive, Respiratory, Circulatory, Excretory, Nervous & Muscular system questions. NCERT-based with explanations.',
  keywords: [
    'Human Physiology MCQ NEET',
    'Digestive System MCQ',
    'Circulatory System MCQ NEET',
    'Nervous System MCQ',
    'Excretory System questions',
    'NEET Biology Human Physiology',
    'Class 11 Human Physiology MCQ',
    'Body Fluids and Circulation MCQ',
    'Neural Control MCQ NEET',
  ],
  openGraph: {
    title: 'Human Physiology MCQ for NEET | 800+ Free Questions',
    description:
      'Master Human Physiology for NEET with 800+ free MCQs. Practice digestive, circulatory, respiratory, excretory & nervous system questions.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/human-physiology',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/human-physiology',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Human Physiology MCQ for NEET',
  description:
    'Practice 800+ free Human Physiology MCQs for NEET covering all organ systems with detailed explanations.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function HumanPhysiologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicLandingPage
        topic="Human Physiology"
        topicSlug="human-physiology"
        title="Human Physiology MCQ for NEET 2026"
        description="Master Human Physiology with 800+ free MCQs covering all organ systems. Practice digestive, respiratory, circulatory, excretory, nervous, and musculoskeletal system questions."
        questionCount={800}
        chapters={[
          'Digestion and Absorption',
          'Breathing and Exchange of Gases',
          'Body Fluids and Circulation',
          'Excretory Products and Their Elimination',
          'Locomotion and Movement',
          'Neural Control and Coordination',
          'Chemical Coordination and Integration',
        ]}
        neetWeightage="12-15%"
        difficulty="Medium"
        importantSubtopics={[
          'Digestive enzymes',
          'Respiratory volumes',
          'Cardiac cycle',
          'Blood groups',
          'Nephron structure',
          'Nerve impulse',
          'Synapse',
          'Hormones',
          'Muscle contraction',
          'ECG',
        ]}
        sampleQuestions={[
          {
            question: 'Which enzyme converts pepsinogen to pepsin?',
            answer: 'HCl (Hydrochloric acid)',
          },
          {
            question: 'What is the normal tidal volume in humans?',
            answer: '500 mL',
          },
          {
            question: 'Sino-atrial node is called the pacemaker because it',
            answer: 'Initiates and maintains the rhythmic cardiac activity',
          },
        ]}
        ncertReference="NCERT Class 11 Biology, Unit 5"
        filterParams="topic=Human%20Physiology&isNcertBased=true"
      />
    </>
  )
}
