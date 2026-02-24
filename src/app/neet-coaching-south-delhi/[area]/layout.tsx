import type { Metadata } from 'next'

const areaData: Record<string, { title: string; description: string; canonical: string }> = {
  'hauz-khas': {
    title: 'Best NEET Coaching Hauz Khas | Biology Classes Near IIT Delhi',
    description:
      'Top NEET coaching in Hauz Khas, South Delhi. Near IIT Delhi, expert AIIMS faculty, 98% success rate. Online & offline batches. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/hauz-khas',
  },
  'kalu-sarai': {
    title: 'Best NEET Coaching Kalu Sarai | Biology Institute Near IIT',
    description:
      'Premium NEET coaching in Kalu Sarai - Delhi coaching capital. Near IIT Gate, expert faculty, proven results. Book free demo class!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/kalu-sarai',
  },
  'greater-kailash': {
    title: 'NEET Coaching Greater Kailash GK-1 GK-2 | Biology Tuition',
    description:
      'Best NEET biology coaching in Greater Kailash (GK-I, GK-II). Premium coaching for DPS students. Expert AIIMS faculty. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/greater-kailash',
  },
  'defence-colony': {
    title: 'NEET Coaching Defence Colony Delhi | Biology Classes',
    description:
      'Top NEET coaching in Defence Colony. Expert AIIMS faculty, 98% success rate, flexible timings. Book free demo class today!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/defence-colony',
  },
  'vasant-vihar': {
    title: 'Best NEET Coaching Vasant Vihar | Biology Tuition Near DPS',
    description:
      'Premium NEET coaching in Vasant Vihar. Students from DPS, Modern School, Vasant Valley. Expert faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/vasant-vihar',
  },
  saket: {
    title: 'NEET Coaching Saket Delhi | Biology Classes Near Select City Walk',
    description:
      'Best NEET biology coaching in Saket, South Delhi. Metro connected, expert faculty, proven results. Book free demo class!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/saket',
  },
  'malviya-nagar': {
    title: 'NEET Coaching Malviya Nagar | Affordable Biology Classes',
    description:
      'Quality NEET coaching in Malviya Nagar at affordable fees. Expert faculty, metro access, proven results. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/malviya-nagar',
  },
  'green-park': {
    title: 'NEET Coaching Green Park Delhi | Biology Tuition',
    description:
      'Best NEET biology coaching in Green Park, South Delhi. Central location, expert faculty, flexible batches. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/green-park',
  },
  'panchsheel-park': {
    title: 'NEET Coaching Panchsheel Park | Biology Classes',
    description:
      'Premium NEET coaching in Panchsheel Park. Expert AIIMS faculty, small batches, personalized attention. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/panchsheel-park',
  },
  'new-friends-colony': {
    title: 'NEET Coaching New Friends Colony NFC | Biology Tuition',
    description:
      'Top NEET coaching in New Friends Colony. Expert faculty, proven results, flexible timings. Book free demo class!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/new-friends-colony',
  },
  'cr-park': {
    title: 'NEET Coaching CR Park Chittaranjan Park | Biology Classes',
    description:
      'Best NEET coaching in CR Park (Chittaranjan Park). Academic community, expert faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/cr-park',
  },
  'vasant-kunj': {
    title: 'NEET Coaching Vasant Kunj | Biology Classes Near Vasant Valley',
    description:
      'NEET coaching in Vasant Kunj for DDA sectors. Near Vasant Valley School, expert faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/vasant-kunj',
  },
  // Government Officer Colonies
  'rk-puram': {
    title: 'NEET Coaching RK Puram | Biology Classes for Govt Officer Children',
    description:
      'Best NEET coaching in RK Puram for CPWD officer families. All sectors covered, expert AIIMS faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/rk-puram',
  },
  'sarojini-nagar': {
    title: 'NEET Coaching Sarojini Nagar | Biology Tuition Govt Quarters',
    description:
      'Top NEET coaching in Sarojini Nagar for DDA flats and govt quarters. Expert faculty, affordable fees. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/sarojini-nagar',
  },
  'lodhi-colony': {
    title: 'NEET Coaching Lodhi Colony | Biology Classes for IAS Officers',
    description:
      'Premium NEET coaching in Lodhi Colony for IAS/IPS officer families. Expert AIIMS faculty, personalized attention. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/lodhi-colony',
  },
  'andrews-ganj': {
    title: 'NEET Coaching Andrews Ganj | Biology Tuition South Delhi',
    description:
      'NEET coaching in Andrews Ganj for senior govt official families. Expert faculty, proven results. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/andrews-ganj',
  },
  'kidwai-nagar': {
    title: 'NEET Coaching Kidwai Nagar | Biology Classes East Kidwai Nagar',
    description:
      'Best NEET coaching in Kidwai Nagar for govt employee families. AIIMS faculty, affordable fees. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/kidwai-nagar',
  },
  'netaji-nagar': {
    title: 'NEET Coaching Netaji Nagar | Biology Tuition Govt Colony',
    description:
      'NEET coaching in Netaji Nagar for government quarter residents. Expert faculty, flexible timings. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/netaji-nagar',
  },
  'moti-bagh': {
    title: 'NEET Coaching Moti Bagh | Biology Classes South Delhi',
    description:
      'Top NEET coaching in Moti Bagh for govt officer families. Expert AIIMS faculty, proven track record. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/moti-bagh',
  },
  // Ultra-Premium Lutyens Delhi
  'golf-links': {
    title: 'NEET Coaching Golf Links Delhi | Premium Biology Tuition',
    description:
      'Exclusive NEET coaching for Golf Links elite families. Personal mentoring, AIIMS faculty, highest success rate. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/golf-links',
  },
  'jor-bagh': {
    title: 'NEET Coaching Jor Bagh | Biology Classes Near Lodhi Gardens',
    description:
      'Premium NEET coaching in Jor Bagh for elite families. Personalized attention, AIIMS faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/jor-bagh',
  },
  'sunder-nagar': {
    title: 'NEET Coaching Sunder Nagar | Biology Tuition Embassy Area',
    description:
      'Exclusive NEET coaching in Sunder Nagar for diplomat and elite families. Expert AIIMS faculty. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/sunder-nagar',
  },
  // Student Hub Areas
  munirka: {
    title: 'NEET Coaching Munirka | Biology Classes Near JNU',
    description:
      'Best NEET coaching in Munirka for JNU area students. Affordable fees, expert faculty, metro access. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/munirka',
  },
  'ber-sarai': {
    title: 'NEET Coaching Ber Sarai | Biology Tuition Near IIT JNU',
    description:
      'Top NEET coaching in Ber Sarai for students near IIT Delhi and JNU. Affordable, expert faculty. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/ber-sarai',
  },
  'katwaria-sarai': {
    title: 'NEET Coaching Katwaria Sarai | Biology Classes IIT Area',
    description:
      'NEET coaching in Katwaria Sarai near IIT Delhi. Student-friendly prices, expert faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/katwaria-sarai',
  },
  'lajpat-nagar': {
    title: 'NEET Coaching Lajpat Nagar | Biology Tuition South Delhi',
    description:
      'Best NEET coaching in Lajpat Nagar. Near Defence Colony, metro connected, expert AIIMS faculty. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/lajpat-nagar',
  },
  kalkaji: {
    title: 'NEET Coaching Kalkaji | Biology Classes Near Nehru Place',
    description:
      'Top NEET coaching in Kalkaji for students near Nehru Place. Expert faculty, proven results. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/kalkaji',
  },
  // Additional Premium Residential
  'safdarjung-enclave': {
    title: 'NEET Coaching Safdarjung Enclave | Premium Biology Tuition',
    description:
      'Premium NEET coaching in Safdarjung Enclave. Expert AIIMS faculty, small batches. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/safdarjung-enclave',
  },
  'gulmohar-park': {
    title: 'NEET Coaching Gulmohar Park | Elite Biology Classes',
    description:
      'Exclusive NEET coaching in Gulmohar Park for elite families. Personal mentoring, AIIMS faculty. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/gulmohar-park',
  },
  'east-of-kailash': {
    title: 'NEET Coaching East of Kailash EOK | Biology Tuition',
    description:
      'Best NEET coaching in East of Kailash. Near GK, DPS EOK students, expert AIIMS faculty. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/east-of-kailash',
  },
  alaknanda: {
    title: 'NEET Coaching Alaknanda | Biology Classes South Delhi',
    description:
      'Top NEET coaching in Alaknanda for South Delhi students. Expert faculty, proven results. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/alaknanda',
  },
  'sukhdev-vihar': {
    title: 'NEET Coaching Sukhdev Vihar | Biology Tuition Near Okhla',
    description:
      'NEET coaching in Sukhdev Vihar for students near Okhla. Expert faculty, affordable fees. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/sukhdev-vihar',
  },
  okhla: {
    title: 'NEET Coaching Okhla | Biology Classes South Delhi',
    description:
      'Best NEET coaching in Okhla industrial and residential area. Expert AIIMS faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/okhla',
  },
  // Central Delhi Areas
  'rajendra-nagar': {
    title: 'NEET Coaching Rajendra Nagar | Biology Classes Coaching Hub',
    description:
      'Top NEET coaching in Old Rajendra Nagar coaching hub. Expert AIIMS faculty, proven results. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/rajendra-nagar',
  },
  'karol-bagh': {
    title: 'NEET Coaching Karol Bagh | Biology Tuition Central Delhi',
    description:
      'Best NEET coaching in Karol Bagh. Metro connected, coaching hub, expert AIIMS faculty. Book free demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/karol-bagh',
  },
  'civil-lines': {
    title: 'NEET Coaching Civil Lines | Biology Classes North Delhi Premium',
    description:
      'Premium NEET coaching in Civil Lines for North Delhi elite families. Expert AIIMS faculty. Book demo!',
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/civil-lines',
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
      title: 'NEET Coaching South Delhi',
      description: 'Best NEET coaching in South Delhi. Expert faculty, proven results.',
    }
  }

  return {
    title: data.title,
    description: data.description,
    twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching Hauz Khas | Biology Classes Near IIT Delhi',
    description: 'Top NEET coaching in Hauz Khas, South Delhi. Near IIT Delhi, expert AIIMS faculty, 98% success rate.',
  },
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
