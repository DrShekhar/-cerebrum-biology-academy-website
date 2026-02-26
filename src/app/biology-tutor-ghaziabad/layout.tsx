import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Ghaziabad | NEET Biology Coaching Near You',
  description:
    'Best biology tutor in Ghaziabad for NEET preparation. AIIMS-trained faculty, small batches, personalized attention. Online & offline classes available. Free demo!',
  openGraph: {
    title: 'Biology Tutor in Ghaziabad | NEET Biology Coaching Near You',
    description:
      'Best biology tutor in Ghaziabad for NEET preparation. AIIMS-trained faculty, small batches, personalized attention. Online & offline classes available. Free demo!',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-ghaziabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-ghaziabad',
  },
}

export default function BiologyTutorGhaziabadLayout({ children }: { children: React.ReactNode }) {
  return children
}
