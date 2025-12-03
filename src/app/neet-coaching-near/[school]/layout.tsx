import type { Metadata } from 'next'

const schoolData: Record<string, { title: string; description: string; canonical: string }> = {
  'dps-rk-puram': {
    title: 'NEET Coaching Near DPS RK Puram | Biology Classes for DPS Students | Cerebrum Academy',
    description:
      'Best NEET coaching for DPS RK Puram students. Timings aligned with school, expert AIIMS faculty. Many DPS RKP students enrolled. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near/dps-rk-puram',
  },
  'dps-vasant-vihar': {
    title: 'NEET Coaching Near DPS Vasant Vihar | Biology Tuition | Cerebrum Academy',
    description:
      'Premium NEET coaching for DPS Vasant Vihar students. School-friendly schedule, expert faculty. Book free demo class today!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near/dps-vasant-vihar',
  },
  'vasant-valley-school': {
    title: 'NEET Coaching Near Vasant Valley School | Biology Classes | Cerebrum Academy',
    description:
      'Specialized NEET coaching for Vasant Valley School students. IB-aligned preparation, expert AIIMS faculty. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near/vasant-valley-school',
  },
  'modern-school-vasant-vihar': {
    title: 'NEET Coaching Near Modern School Vasant Vihar | Biology Tuition | Cerebrum Academy',
    description:
      'Best NEET coaching for Modern School students. Convenient location, expert faculty. Book free demo class!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near/modern-school-vasant-vihar',
  },
  'sanskriti-school': {
    title: 'NEET Coaching Near Sanskriti School | IB to NEET Transition | Cerebrum Academy',
    description:
      'NEET coaching for Sanskriti School students. IB curriculum bridge, expert guidance. Chanakyapuri area. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near/sanskriti-school',
  },
  'shri-ram-school': {
    title: 'NEET Coaching Near The Shri Ram School | Biology Classes | Cerebrum Academy',
    description:
      'Premium NEET coaching for Shri Ram School students. Expert AIIMS faculty, flexible timings. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near/shri-ram-school',
  },
  'springdales-pusa-road': {
    title: 'NEET Coaching Near Springdales School Pusa Road | Biology Tuition | Cerebrum Academy',
    description:
      'Best NEET coaching for Springdales students. Central Delhi location, expert faculty. Book demo class!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near/springdales-pusa-road',
  },
  'dps-east-of-kailash': {
    title: 'NEET Coaching Near DPS East of Kailash | Biology Classes EOK | Cerebrum Academy',
    description:
      'NEET coaching for DPS EOK students. South Delhi location, expert AIIMS faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near/dps-east-of-kailash',
  },
}

export async function generateStaticParams() {
  return Object.keys(schoolData).map((school) => ({
    school: school,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ school: string }>
}): Promise<Metadata> {
  const { school } = await params
  const data = schoolData[school]

  if (!data) {
    return {
      title: 'NEET Coaching Near Schools | Cerebrum Biology Academy',
      description: 'Best NEET coaching near top Delhi schools. Expert faculty, proven results.',
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

export default function SchoolNEETCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
