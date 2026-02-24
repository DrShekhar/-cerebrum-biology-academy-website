import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best Biology Tuition in Faridabad | Class 9, 10, 11, 12 & Droppers | Greater Faridabad, NIT | Cerebrum Academy',
  description:
    'Top biology tuition in Faridabad for Class 9, 10, 11, 12 & NEET droppers. Expert AIIMS faculty, 98% success rate. Best biology tutor in Greater Faridabad, NIT, Ballabgarh. 1,200+ students. Book free demo!',
  keywords:
    'biology tuition Faridabad, biology tutor Faridabad, biology tuition class 11 Faridabad, biology tuition class 12 Faridabad, biology tuition class 9 Greater Faridabad, biology tuition class 10 NIT, biology home tuition Faridabad, NEET biology tuition Faridabad, biology coaching Ballabgarh, biology classes Sector 21, biology tutor Neharpar, biology tuition Sector 86, online biology tuition Faridabad, best biology tutor Faridabad, biology tuition near me Faridabad',
  openGraph: {
    title: 'Best Biology Tuition in Faridabad | Class 9-12, Droppers',
    description:
      'Top biology tuition in Faridabad for all classes. AIIMS faculty, 98% success rate. Greater Faridabad, NIT, Ballabgarh. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-faridabad',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Tuition in Faridabad',
    description:
      'Top biology tuition in Faridabad. Class 9, 10, 11, 12 & droppers. Greater Faridabad, NIT, Ballabgarh.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-faridabad',
  },
}

export default function BiologyTuitionFaridabadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
