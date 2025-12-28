import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Teacher Near Me | Find Best Biology Teacher 2025',
  description:
    'Find the best biology teacher near you. Offline centers in Delhi NCR (Rohini, Gurugram, South Extension, Faridabad) or join online from anywhere. AIIMS-trained faculty, 98% success rate.',
  keywords: [
    'biology teacher near me',
    'best biology teacher near me',
    'biology teacher in delhi',
    'biology teacher rohini',
    'biology teacher gurugram',
    'biology faculty near me',
    'find biology teacher',
    'local biology teacher',
    'biology teacher south delhi',
    'biology teacher faridabad',
  ],
  openGraph: {
    title: 'Biology Teacher Near Me | Delhi NCR & Online',
    description:
      'Find expert biology teachers near you. 4 offline centers in Delhi NCR + online classes available.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-teacher-near-me',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Teacher Near Me',
    description: 'Find best biology teachers in Delhi NCR or join online from anywhere!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-teacher-near-me',
  },
}

export default function BiologyTeacherNearMeLayout({ children }: { children: React.ReactNode }) {
  return children
}
