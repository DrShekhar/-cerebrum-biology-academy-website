import type { Metadata } from 'next'

const areaData: Record<string, { title: string; description: string; canonical: string }> = {
  'hauz-khas': {
    title: 'Best NEET Coaching Hauz Khas | Biology Classes Near IIT Delhi | Cerebrum Academy',
    description:
      'Top NEET coaching in Hauz Khas, South Delhi. Near IIT Delhi, expert AIIMS faculty, 94% success rate. Online & offline batches. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/hauz-khas',
  },
  'kalu-sarai': {
    title: 'Best NEET Coaching Kalu Sarai | Biology Institute Near IIT | Cerebrum Academy',
    description:
      'Premium NEET coaching in Kalu Sarai - Delhi coaching capital. Near IIT Gate, expert faculty, proven results. Book free demo class!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/kalu-sarai',
  },
  'greater-kailash': {
    title: 'NEET Coaching Greater Kailash GK-1 GK-2 | Biology Tuition | Cerebrum Academy',
    description:
      'Best NEET biology coaching in Greater Kailash (GK-I, GK-II). Premium coaching for DPS students. Expert AIIMS faculty. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/greater-kailash',
  },
  'defence-colony': {
    title: 'NEET Coaching Defence Colony Delhi | Biology Classes | Cerebrum Academy',
    description:
      'Top NEET coaching in Defence Colony. Expert AIIMS faculty, 94% success rate, flexible timings. Book free demo class today!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/defence-colony',
  },
  'vasant-vihar': {
    title: 'Best NEET Coaching Vasant Vihar | Biology Tuition Near DPS | Cerebrum Academy',
    description:
      'Premium NEET coaching in Vasant Vihar. Students from DPS, Modern School, Vasant Valley. Expert faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/vasant-vihar',
  },
  saket: {
    title: 'NEET Coaching Saket Delhi | Biology Classes Near Select City Walk | Cerebrum Academy',
    description:
      'Best NEET biology coaching in Saket, South Delhi. Metro connected, expert faculty, proven results. Book free demo class!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/saket',
  },
  'malviya-nagar': {
    title: 'NEET Coaching Malviya Nagar | Affordable Biology Classes | Cerebrum Academy',
    description:
      'Quality NEET coaching in Malviya Nagar at affordable fees. Expert faculty, metro access, proven results. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/malviya-nagar',
  },
  'green-park': {
    title: 'NEET Coaching Green Park Delhi | Biology Tuition | Cerebrum Academy',
    description:
      'Best NEET biology coaching in Green Park, South Delhi. Central location, expert faculty, flexible batches. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/green-park',
  },
  'panchsheel-park': {
    title: 'NEET Coaching Panchsheel Park | Biology Classes | Cerebrum Academy',
    description:
      'Premium NEET coaching in Panchsheel Park. Expert AIIMS faculty, small batches, personalized attention. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/panchsheel-park',
  },
  'new-friends-colony': {
    title: 'NEET Coaching New Friends Colony NFC | Biology Tuition | Cerebrum Academy',
    description:
      'Top NEET coaching in New Friends Colony. Expert faculty, proven results, flexible timings. Book free demo class!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/new-friends-colony',
  },
  'cr-park': {
    title: 'NEET Coaching CR Park Chittaranjan Park | Biology Classes | Cerebrum Academy',
    description:
      'Best NEET coaching in CR Park (Chittaranjan Park). Academic community, expert faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/cr-park',
  },
  'vasant-kunj': {
    title: 'NEET Coaching Vasant Kunj | Biology Classes Near Vasant Valley | Cerebrum Academy',
    description:
      'NEET coaching in Vasant Kunj for DDA sectors. Near Vasant Valley School, expert faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/vasant-kunj',
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
      title: 'NEET Coaching South Delhi | Cerebrum Biology Academy',
      description: 'Best NEET coaching in South Delhi. Expert faculty, proven results.',
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

export default function SouthDelhiAreaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
