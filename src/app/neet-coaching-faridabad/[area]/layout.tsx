import type { Metadata } from 'next'

interface AreaMetadata {
  title: string
  description: string
  keywords: string
}

const areaMetadata: Record<string, AreaMetadata> = {
  'greater-faridabad': {
    title: 'NEET Coaching in Greater Faridabad | Sector 81-89, BPTP | Cerebrum Academy',
    description:
      'Best NEET coaching in Greater Faridabad. BPTP Parklands, Crown Greens, Sectors 81-89. 280+ students. AIIMS faculty, 98% success rate. Book free demo!',
    keywords:
      'NEET coaching Greater Faridabad, NEET classes BPTP Parklands, biology coaching Sector 86, NEET tuition Crown Greens, medical coaching Neharpar',
  },
  'sector-21': {
    title: 'NEET Coaching in Sector 21 Faridabad | Crown Mall, NHPC Chowk | Cerebrum Academy',
    description:
      'Top NEET coaching in Sector 21 Faridabad near Crown Interiorz Mall, NHPC Chowk Metro. 150+ students. Book free demo!',
    keywords:
      'NEET coaching Sector 21 Faridabad, NEET classes Crown Mall, biology coaching NHPC Chowk, NEET tuition central Faridabad, medical coaching Badkhal',
  },
  'nit-faridabad': {
    title: 'NEET Coaching in NIT Faridabad | YMCA, DAV School Area | Cerebrum Academy',
    description:
      'Best NEET coaching in NIT Faridabad. Near YMCA University, DAV School. Educational hub. 120+ students. Book free demo!',
    keywords:
      'NEET coaching NIT Faridabad, NEET classes YMCA area, biology coaching NIT, NEET tuition DAV School, medical coaching educational hub',
  },
  ballabgarh: {
    title: 'NEET Coaching in Ballabgarh Faridabad | Industrial Town | Cerebrum Academy',
    description:
      'Top NEET coaching in Ballabgarh Faridabad. Industrial town, metro connected. 180+ students. AIIMS faculty. Book free demo!',
    keywords:
      'NEET coaching Ballabgarh, NEET classes Ballabgarh Faridabad, biology coaching industrial area, NEET tuition Escorts Mujesar, medical coaching Ballabgarh',
  },
  'sector-15': {
    title: 'NEET Coaching in Sector 15 Faridabad | Neelam Chowk Metro | Cerebrum Academy',
    description:
      'Best NEET coaching in Sector 15 Faridabad. Near Neelam Chowk Metro. Established area. 95+ students. Book free demo!',
    keywords:
      'NEET coaching Sector 15 Faridabad, NEET classes Neelam Chowk, biology coaching central Faridabad, NEET tuition old Faridabad, medical coaching Sector 15',
  },
  neharpar: {
    title: 'NEET Coaching in Neharpar Faridabad | BPTP, Omaxe Townships | Cerebrum Academy',
    description:
      'Premium NEET coaching in Neharpar Greater Faridabad. BPTP, Omaxe, SRS townships. 200+ students. Book free demo!',
    keywords:
      'NEET coaching Neharpar, NEET classes beyond canal, biology coaching BPTP township, NEET tuition Omaxe, medical coaching Greater Faridabad',
  },
  'sector-86': {
    title: 'NEET Coaching in Sector 86 Faridabad | BPTP Princess Park | Cerebrum Academy',
    description:
      'Top NEET coaching in Sector 86 Greater Faridabad. BPTP Princess Park, Omaxe The Lake. 110+ students. Book free demo!',
    keywords:
      'NEET coaching Sector 86, NEET classes BPTP Princess Park, biology coaching Greater Faridabad, NEET tuition Sector 86, medical coaching Surajkund area',
  },
  'old-faridabad': {
    title: 'NEET Coaching in Old Faridabad | Heritage Area, Metro Connected | Cerebrum Academy',
    description:
      'Best NEET coaching in Old Faridabad. Heritage area, Violet Line Metro. 90+ students. AIIMS faculty. Book free demo!',
    keywords:
      'NEET coaching Old Faridabad, NEET classes heritage area, biology coaching Violet Line, NEET tuition Sarai Khawaja, medical coaching Old Faridabad',
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
      title: 'NEET Coaching in Faridabad | Cerebrum Biology Academy',
      description: 'Best NEET coaching in Faridabad with 98% success rate.',
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${area}`,
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
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${area}`,
    },
  }
}

export function generateStaticParams() {
  return [
    { area: 'greater-faridabad' },
    { area: 'sector-21' },
    { area: 'nit-faridabad' },
    { area: 'ballabgarh' },
    { area: 'sector-15' },
    { area: 'neharpar' },
    { area: 'sector-86' },
    { area: 'old-faridabad' },
  ]
}

export default function FaridabadAreaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
