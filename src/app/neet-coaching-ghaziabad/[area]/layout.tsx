import type { Metadata } from 'next'

interface AreaMetadata {
  title: string
  description: string
  keywords: string
}

const areaMetadata: Record<string, AreaMetadata> = {
  indirapuram: {
    title:
      'NEET Coaching in Indirapuram Ghaziabad | Ahinsa Khand, Vaibhav Khand | Cerebrum Academy',
    description:
      'Best NEET coaching in Indirapuram Ghaziabad. 350+ students from ATS Advantage, Shipra Srishti, Saya Gold Avenue. AIIMS faculty, 98% success rate. Book free demo!',
    keywords:
      'NEET coaching Indirapuram, NEET classes Ahinsa Khand, biology coaching Vaibhav Khand, NEET tuition ATS Advantage, NEET coaching Shipra Srishti, medical coaching Indirapuram',
  },
  vaishali: {
    title: 'NEET Coaching in Vaishali Ghaziabad | Near Metro, Sector 1-9 | Cerebrum Academy',
    description:
      'Top NEET coaching in Vaishali Ghaziabad near Blue Line Metro. Ramprastha Greens, Mahagun Moderne. 180+ students. AIIMS faculty. Book free demo!',
    keywords:
      'NEET coaching Vaishali, NEET classes near Vaishali Metro, biology coaching Ramprastha Greens, NEET tuition Vaishali Sector, medical coaching Blue Line',
  },
  vasundhara: {
    title: 'NEET Coaching in Vasundhara Ghaziabad | Near Vaishali | Cerebrum Academy',
    description:
      'Best NEET coaching in Vasundhara Ghaziabad. Near Vaishali Metro. ABA Olive County, Amrapali. 120+ students. Book free demo!',
    keywords:
      'NEET coaching Vasundhara, NEET classes Vasundhara Ghaziabad, biology coaching ABA Olive County, NEET tuition near Vaishali, medical coaching Vasundhara',
  },
  'crossing-republik': {
    title: 'NEET Coaching in Crossing Republik Ghaziabad | Mahagun, Supertech | Cerebrum Academy',
    description:
      'Premium NEET coaching in Crossing Republik. Mahagun Montage, Supertech Livingston, Amrapali Sapphire. 200+ students. Book free demo!',
    keywords:
      'NEET coaching Crossing Republik, NEET classes Mahagun Montage, biology coaching Supertech Livingston, NEET tuition Crossing Republic, medical coaching NH-24',
  },
  'raj-nagar-extension': {
    title: 'NEET Coaching in Raj Nagar Extension Ghaziabad | NH-58, VVIP | Cerebrum Academy',
    description:
      'Top NEET coaching in Raj Nagar Extension. VVIP Addresses, KW Srishti, Mahagun Mywoods. 150+ students. Metro connected. Book free demo!',
    keywords:
      'NEET coaching Raj Nagar Extension, NEET classes VVIP Addresses, biology coaching KW Srishti, NEET tuition RNE, medical coaching NH-58',
  },
  kaushambi: {
    title: 'NEET Coaching in Kaushambi Ghaziabad | Blue Line Metro | Cerebrum Academy',
    description:
      'Best NEET coaching in Kaushambi near Blue Line Metro. Commercial hub. 95+ students. AIIMS faculty. Book free demo!',
    keywords:
      'NEET coaching Kaushambi, NEET classes Kaushambi Metro, biology coaching Kaushambi Ghaziabad, NEET tuition Blue Line, medical coaching Anand Vihar',
  },
  'mohan-nagar': {
    title: 'NEET Coaching in Mohan Nagar Ghaziabad | Red Line Metro | Cerebrum Academy',
    description:
      'Top NEET coaching in Mohan Nagar Ghaziabad. Red Line Metro connected. City center location. 85+ students. Book free demo!',
    keywords:
      'NEET coaching Mohan Nagar, NEET classes Ghaziabad center, biology coaching Red Line Metro, NEET tuition Mohan Nagar, medical coaching Navyug Market',
  },
  sahibabad: {
    title: 'NEET Coaching in Sahibabad Ghaziabad | Industrial Hub | Cerebrum Academy',
    description:
      'Best NEET coaching in Sahibabad Ghaziabad. Near Dilshad Garden Metro. 75+ students. AIIMS faculty. Book free demo!',
    keywords:
      'NEET coaching Sahibabad, NEET classes Sahibabad Industrial, biology coaching near Delhi border, NEET tuition Sahibabad Ghaziabad, medical coaching Dilshad Garden',
  },
}

type Props = {
  params: Promise<{ area: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params
  const meta = areaMetadata[area]

  if (!meta) {
    return {
      title: 'NEET Coaching in Ghaziabad | Cerebrum Biology Academy',
      description: 'Best NEET coaching in Ghaziabad with 98% success rate.',
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${area}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${area}`,
    },
  }
}

export function generateStaticParams() {
  return [
    { area: 'indirapuram' },
    { area: 'vaishali' },
    { area: 'vasundhara' },
    { area: 'crossing-republik' },
    { area: 'raj-nagar-extension' },
    { area: 'kaushambi' },
    { area: 'mohan-nagar' },
    { area: 'sahibabad' },
  ]
}

export default function GhaziabadAreaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
