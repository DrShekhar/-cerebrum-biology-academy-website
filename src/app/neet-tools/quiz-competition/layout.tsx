import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiz Competition - Classroom Quiz Tool',
  description:
    'Conduct engaging team-based quizzes in your classroom. Two teams compete with live score updates on all devices. Perfect for NEET biology revision sessions.',
  keywords: [
    'classroom quiz',
    'quiz competition',
    'team quiz',
    'biology quiz',
    'NEET quiz',
    'live scoreboard',
    'teaching tool',
  ],
  openGraph: {
    title: 'Quiz Competition - Classroom Quiz Tool',
    description: 'Conduct engaging team-based quizzes with live score updates across all devices.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-tools/quiz-competition',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quiz Competition - Classroom Quiz Tool',
    description: 'Conduct engaging team-based quizzes in your classroom. Two teams compete with live score updates on all devices.',
  },
}

export default function QuizCompetitionLayout({ children }: { children: React.ReactNode }) {
  return children
}
