import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutors Near Me | Find Best Biology Tutor 2027',
  description:
    'Looking for biology tutors near me? Find the best biology tutor in Delhi NCR with 4 offline centers or join online from anywhere. AIIMS trained faculty, 98% success rate.',
  keywords: [
    'biology tutors near me',
    'best biology tutors near me',
    'biology tutor near me',
    'biology teacher near me',
    'biology coaching near me',
    'biology tuition near me',
    'NEET biology tutor near me',
    'biology home tutor near me',
    'biology classes near me',
    'best biology tutor Delhi',
  ],
  openGraph: {
    title: 'Biology Tutors Near Me | Find Best Biology Tutor 2027',
    description:
      'Find best biology tutors near you. 4 offline centers in Delhi NCR or join online from anywhere. AIIMS trained faculty, 98% success rate.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutors-near-me',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutors Near Me',
    description: 'Find best biology tutors near you. AIIMS trained faculty, 98% success rate!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutors-near-me',
  },
}

export default function BiologyTutorsNearMeLayout({ children }: { children: React.ReactNode }) {
  return children
}
