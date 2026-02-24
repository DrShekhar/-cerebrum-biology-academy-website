import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best Biology Tuition in Ghaziabad | Class 9, 10, 11, 12 & Droppers | Indirapuram, Vaishali | Cerebrum Academy',
  description:
    'Top biology tuition in Ghaziabad for Class 9, 10, 11, 12 & NEET droppers. Expert AIIMS faculty, 98% success rate. Best biology tutor in Indirapuram, Vaishali, Crossing Republik. 1,500+ students. Book free demo!',
  keywords:
    'biology tuition Ghaziabad, biology tutor Ghaziabad, biology tuition class 11 Ghaziabad, biology tuition class 12 Ghaziabad, biology tuition class 9 Indirapuram, biology tuition class 10 Vaishali, biology home tuition Ghaziabad, NEET biology tuition Ghaziabad, biology coaching Indirapuram, biology classes Vaishali, biology tutor Crossing Republik, biology tuition Raj Nagar Extension, biology coaching Vasundhara, online biology tuition Ghaziabad, best biology tutor Indirapuram, biology tuition near me Ghaziabad',
  openGraph: {
    title: 'Best Biology Tuition in Ghaziabad | Class 9-12, Droppers',
    description:
      'Top biology tuition in Ghaziabad for all classes. AIIMS faculty, 98% success rate. Indirapuram, Vaishali, Crossing Republik. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-ghaziabad',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Tuition in Ghaziabad',
    description:
      'Top biology tuition in Ghaziabad. Class 9, 10, 11, 12 & droppers. Indirapuram, Vaishali, Crossing Republik.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-ghaziabad',
  },
}

export default function BiologyTuitionGhaziabadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
