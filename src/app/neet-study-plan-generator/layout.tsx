import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Study Plan Generator 2026 - Free Personalized Schedule',
  description:
    'Free NEET Biology Study Plan Generator 2026. Get a personalized week-by-week study schedule based on your time, class, and weak areas. NCERT-focused, AI-optimized for maximum score.',
  keywords: [
    'NEET study plan',
    'NEET 2026 study plan',
    'NEET Biology study schedule',
    'NEET preparation timetable',
    'personalized NEET study plan',
    'NEET study plan generator',
    'NCERT study plan NEET',
    'NEET Biology preparation',
    'NEET weekly schedule',
    'NEET study planner free',
  ],
  openGraph: {
    title: 'NEET Study Plan Generator 2026 - Free Personalized Schedule',
    description:
      'Generate your personalized NEET Biology study plan. Week-by-week schedule optimized for your preparation time and weak areas.',
    url: 'https://cerebrumbiologyacademy.com/neet-study-plan-generator',
    type: 'website',
    images: [
      {
        url: '/images/neet-study-plan-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Study Plan Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Study Plan Generator 2026 - Free Tool',
    description:
      'Create your personalized NEET Biology study schedule. Week-by-week plan based on your needs.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-study-plan-generator',
  },
}

export default function NEETStudyPlanGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children
}
