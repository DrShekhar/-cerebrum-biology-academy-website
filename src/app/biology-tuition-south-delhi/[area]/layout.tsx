import type { Metadata } from 'next'

const areaData: Record<string, { title: string; description: string; canonical: string }> = {
  'hauz-khas': {
    title: 'Biology Tuition Hauz Khas | Classes 9-12 Near IIT Delhi | Cerebrum Academy',
    description:
      'Best biology tuition in Hauz Khas for Classes 9-12. Near IIT Delhi, expert AIIMS faculty, NEET foundation. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/hauz-khas',
  },
  'kalu-sarai': {
    title: 'Biology Tuition Kalu Sarai | Classes 9-12 Coaching Capital | Cerebrum Academy',
    description:
      'Premium biology classes in Kalu Sarai for Classes 9-12. Delhi coaching capital, NEET prep, all boards. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/kalu-sarai',
  },
  'greater-kailash': {
    title: 'Biology Tuition Greater Kailash GK | Classes 9-12 | Cerebrum Academy',
    description:
      'Best biology tuition in Greater Kailash (GK-I, GK-II) for Classes 9-12. Premium coaching, NEET foundation. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/greater-kailash',
  },
  'defence-colony': {
    title: 'Biology Tuition Defence Colony | Classes 9-12 | Cerebrum Academy',
    description:
      'Top biology classes in Defence Colony for Classes 9-12. Expert faculty, all boards, NEET prep. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/defence-colony',
  },
  'vasant-vihar': {
    title: 'Biology Tuition Vasant Vihar | Classes 9-12 Premium | Cerebrum Academy',
    description:
      'Premium biology tuition in Vasant Vihar for DPS, Modern School students. Classes 9-12, NEET foundation. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/vasant-vihar',
  },
  'rk-puram': {
    title: 'Biology Tuition RK Puram | Classes 9-12 Govt Colony | Cerebrum Academy',
    description:
      'Best biology classes in RK Puram for Classes 9-12. All sectors covered, DPS RKP students welcome. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/rk-puram',
  },
  'sarojini-nagar': {
    title: 'Biology Tuition Sarojini Nagar | Affordable Classes 9-12 | Cerebrum Academy',
    description:
      'Quality biology tuition in Sarojini Nagar at affordable fees. Classes 9-12, NEET foundation. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/sarojini-nagar',
  },
  'lodhi-colony': {
    title: 'Biology Tuition Lodhi Colony | Premium Classes 9-12 | Cerebrum Academy',
    description:
      'Exclusive biology classes in Lodhi Colony for Classes 9-12. Near Lodhi Gardens, personalized attention. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/lodhi-colony',
  },
  saket: {
    title: 'Biology Tuition Saket | Classes 9-12 Metro Connected | Cerebrum Academy',
    description:
      'Best biology tuition in Saket for Classes 9-12. Metro connected, modern facilities, NEET prep. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/saket',
  },
  'malviya-nagar': {
    title: 'Biology Tuition Malviya Nagar | Affordable Classes 9-12 | Cerebrum Academy',
    description:
      'Quality biology classes in Malviya Nagar at student-friendly fees. Classes 9-12, metro access. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/malviya-nagar',
  },
  'green-park': {
    title: 'Biology Tuition Green Park | Central Location Classes 9-12 | Cerebrum Academy',
    description:
      'Best biology tuition in Green Park for Classes 9-12. Central location, expert faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/green-park',
  },
  'cr-park': {
    title: 'Biology Tuition CR Park | Academic Community Classes 9-12 | Cerebrum Academy',
    description:
      'Top biology classes in Chittaranjan Park (CR Park) for Classes 9-12. Academic culture, NEET prep. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/cr-park',
  },
  munirka: {
    title: 'Biology Tuition Munirka | Affordable Classes Near JNU | Cerebrum Academy',
    description:
      'Best biology tuition in Munirka for Classes 9-12. Near JNU, affordable fees, NEET foundation. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/munirka',
  },
  'lajpat-nagar': {
    title: 'Biology Tuition Lajpat Nagar | Metro Hub Classes 9-12 | Cerebrum Academy',
    description:
      'Top biology classes in Lajpat Nagar for Classes 9-12. Metro connected, easy access, NEET prep. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/lajpat-nagar',
  },
  kalkaji: {
    title: 'Biology Tuition Kalkaji | Near Nehru Place Classes 9-12 | Cerebrum Academy',
    description:
      'Best biology tuition in Kalkaji for Classes 9-12. Near Nehru Place, Lotus Temple area. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/kalkaji',
  },
  'east-of-kailash': {
    title: 'Biology Tuition East of Kailash | DPS EOK Students | Cerebrum Academy',
    description:
      'Premium biology classes in East of Kailash for Classes 9-12. DPS EOK students, near GK. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/east-of-kailash',
  },
}

export async function generateStaticParams() {
  return Object.keys(areaData).map((area) => ({
    area: area,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>
}): Promise<Metadata> {
  const { area } = await params
  const data = areaData[area]

  if (!data) {
    return {
      title: 'Biology Tuition South Delhi | Cerebrum Biology Academy',
      description: 'Best biology tuition in South Delhi for Classes 9-12. Expert faculty.',
    }
  }

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: data.canonical,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.canonical,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
    },
  }
}

export default function BiologyTuitionAreaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
