import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import {
  MapPin,
  Users,
  Trophy,
  Phone,
  MessageCircle,
  CheckCircle,
  Star,
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  ArrowRight,
} from 'lucide-react'

interface StateData {
  name: string
  slug: string
  shortName: string
  students: string
  successRate: string
  toppers: number
  cities: string[]
  board: string
  boardFullName: string
  highlights: string[]
  description: string
  whyChoose: string[]
  testimonials: { name: string; city: string; rank: string; quote: string }[]
  faqs: { question: string; answer: string }[]
}

const statesData: Record<string, StateData> = {
  'uttar-pradesh': {
    name: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    shortName: 'UP',
    students: '2,500+',
    successRate: '97%',
    toppers: 45,
    cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Noida', 'Ghaziabad', 'Allahabad', 'Meerut'],
    board: 'UP Board',
    boardFullName: 'Uttar Pradesh Madhyamik Shiksha Parishad',
    highlights: [
      'UP Board aligned study material',
      'Hindi medium support available',
      'Highest student count from single state',
      'Special batches for Noida/Ghaziabad students',
    ],
    description:
      'Uttar Pradesh has the largest number of NEET aspirants in India. Cerebrum Biology Academy has helped over 2,500 UP students achieve their medical dreams with specialized coaching that bridges UP Board syllabus with NEET requirements.',
    whyChoose: [
      'Dedicated UP Board to NEET transition program',
      'Study materials in Hindi and English',
      'Special focus on Biology topics that differ from UP Board',
      'Weekend batches for students from distant cities',
      'Online classes with recorded lectures for revision',
      'State quota counseling and guidance',
    ],
    testimonials: [
      {
        name: 'Priya Sharma',
        city: 'Lucknow',
        rank: 'AIR 892',
        quote: 'UP Board student who scored 680/720 in NEET. Cerebrum helped me bridge the gap between board and NEET syllabus.',
      },
      {
        name: 'Rahul Verma',
        city: 'Varanasi',
        rank: 'AIR 1,245',
        quote: 'The Hindi medium notes were a game-changer for me. Got admission in KGMU Lucknow!',
      },
    ],
    faqs: [
      {
        question: 'Is UP Board syllabus sufficient for NEET Biology?',
        answer: 'UP Board covers about 70% of NEET Biology syllabus. The remaining 30% includes topics like Biotechnology, Ecology details, and Human Reproduction specifics that need additional preparation. Our bridge course covers all gaps.',
      },
      {
        question: 'Do you provide study material in Hindi?',
        answer: 'Yes, we provide complete study material in both Hindi and English. Our doubt sessions can also be conducted in Hindi for better understanding.',
      },
      {
        question: 'What are the best medical colleges in UP for state quota?',
        answer: 'Top medical colleges under UP state quota include KGMU Lucknow, BHU Varanasi, GSVM Kanpur, and MLB Medical College Jhansi. We provide detailed counseling for state quota admissions.',
      },
    ],
  },
  'bihar': {
    name: 'Bihar',
    slug: 'bihar',
    shortName: 'Bihar',
    students: '1,800+',
    successRate: '96%',
    toppers: 38,
    cities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Ara'],
    board: 'BSEB',
    boardFullName: 'Bihar School Examination Board',
    highlights: [
      'Bihar Board preparation support',
      'Special hostel facilities in Gurugram',
      'Scholarship for meritorious students',
      'Dedicated batch for Bihar students',
    ],
    description:
      'Bihar students are known for their dedication and hard work. Cerebrum has a special Bihar batch with hostel facilities, making it convenient for students to relocate and focus entirely on NEET preparation.',
    whyChoose: [
      'Dedicated Bihar student batch',
      'Hostel accommodation available',
      'Merit-based scholarships up to 50%',
      'Bihar Board to NEET bridge program',
      'Hindi medium support',
      'AIIMS Patna admission guidance',
    ],
    testimonials: [
      {
        name: 'Amit Kumar',
        city: 'Patna',
        rank: 'AIR 678',
        quote: 'Moved to Gurugram for coaching. The hostel facility and focused environment helped me crack NEET in first attempt.',
      },
      {
        name: 'Sneha Kumari',
        city: 'Muzaffarpur',
        rank: 'AIR 1,890',
        quote: 'Got 75% scholarship based on my board marks. Now studying at PMCH Patna. Thank you Cerebrum!',
      },
    ],
    faqs: [
      {
        question: 'Do you have hostel facilities for Bihar students?',
        answer: 'Yes, we have tie-ups with safe and affordable hostels near our Gurugram center. Separate hostels for boys and girls with mess facility are available at ₹8,000-12,000 per month.',
      },
      {
        question: 'What scholarships are available for Bihar students?',
        answer: 'We offer merit-based scholarships of 25-75% based on Class 10/12 marks and NEET mock test performance. Additionally, students from economically weaker sections can apply for fee waivers.',
      },
      {
        question: 'Is online coaching option available?',
        answer: 'Yes, Bihar students can join our online live classes if relocation is not possible. The course content, faculty, and support remain the same as offline batches.',
      },
    ],
  },
  'rajasthan': {
    name: 'Rajasthan',
    slug: 'rajasthan',
    shortName: 'Rajasthan',
    students: '1,200+',
    successRate: '98%',
    toppers: 32,
    cities: ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Ajmer', 'Bikaner', 'Alwar'],
    board: 'RBSE',
    boardFullName: 'Rajasthan Board of Secondary Education',
    highlights: [
      'Competes with Kota coaching standards',
      'RBSE aligned content',
      'Weekend batches available',
      'Biology-focused specialized coaching',
    ],
    description:
      'Rajasthan, home to the coaching hub Kota, has highly competitive NEET aspirants. Cerebrum offers Biology-specialized coaching that complements Physics/Chemistry preparation from other institutes.',
    whyChoose: [
      'Biology specialization unlike all-subject Kota institutes',
      'RBSE to NCERT transition support',
      'Smaller batches (15-20) vs 100+ in Kota',
      'Personal attention and doubt resolution',
      'Online + Offline hybrid option',
      'State Medical College counseling',
    ],
    testimonials: [
      {
        name: 'Vikram Singh',
        city: 'Jaipur',
        rank: 'AIR 456',
        quote: 'Was struggling with Biology despite joining a big Kota institute. Cerebrum specialized coaching helped me score 360/360 in Biology!',
      },
      {
        name: 'Pooja Meena',
        city: 'Kota',
        rank: 'AIR 1,123',
        quote: 'Joined Cerebrum for Biology while continuing Physics/Chemistry at another institute. Best decision ever!',
      },
    ],
    faqs: [
      {
        question: 'How is Cerebrum different from Kota coaching?',
        answer: 'Kota institutes focus on all three subjects with large batches. Cerebrum specializes exclusively in Biology with batch sizes of 15-20 students, ensuring personal attention and higher Biology scores.',
      },
      {
        question: 'Can I join Cerebrum along with another coaching?',
        answer: 'Yes, many students from Rajasthan join Cerebrum specifically for Biology while continuing Physics/Chemistry elsewhere. Our flexible timing accommodates this hybrid approach.',
      },
      {
        question: 'What is the RBSE to NCERT transition like?',
        answer: 'RBSE covers most NCERT topics but with different depth. We provide a systematic bridge program that identifies gaps and strengthens NCERT-specific content required for NEET.',
      },
    ],
  },
  'haryana': {
    name: 'Haryana',
    slug: 'haryana',
    shortName: 'Haryana',
    students: '900+',
    successRate: '98%',
    toppers: 28,
    cities: ['Gurugram', 'Faridabad', 'Rohtak', 'Hisar', 'Panipat', 'Karnal', 'Ambala'],
    board: 'HBSE',
    boardFullName: 'Haryana Board of School Education',
    highlights: [
      'Local center in Gurugram',
      'HBSE board support',
      'Direct faculty access',
      'No travel/relocation needed',
    ],
    description:
      'Haryana students have a home advantage with Cerebrum headquartered in Gurugram. Local students benefit from direct access to AIIMS faculty, regular parent-teacher meetings, and no relocation hassles.',
    whyChoose: [
      'Main center located in Gurugram',
      'No hostel/travel expenses',
      'Regular PTMs for local parents',
      'HBSE board aligned preparation',
      'Easy access to faculty for doubts',
      'Multiple batch timings available',
    ],
    testimonials: [
      {
        name: 'Anjali Yadav',
        city: 'Gurugram',
        rank: 'AIR 234',
        quote: 'Living 10 minutes from the center meant more study time. Got into AIIMS Delhi with AIR 234!',
      },
      {
        name: 'Mohit Sharma',
        city: 'Faridabad',
        rank: 'AIR 890',
        quote: 'The evening batch suited my school timing perfectly. Parents could also attend PTMs regularly.',
      },
    ],
    faqs: [
      {
        question: 'What are the batch timings for Haryana students?',
        answer: 'We offer multiple batch timings: Morning (7-10 AM), Afternoon (2-5 PM), and Evening (6-9 PM) to accommodate school students, droppers, and working professionals.',
      },
      {
        question: 'Is there any advantage for local Haryana students?',
        answer: 'Yes, local students save on hostel (₹8,000-12,000/month) and travel costs. They also get easier access to doubt sessions, extra classes, and parent-teacher meetings.',
      },
      {
        question: 'Do you cover HBSE board syllabus differences?',
        answer: 'Yes, our faculty is well-versed with HBSE syllabus and NCERT differences. We ensure smooth transition and cover any gaps in the NEET preparation.',
      },
    ],
  },
  'madhya-pradesh': {
    name: 'Madhya Pradesh',
    slug: 'madhya-pradesh',
    shortName: 'MP',
    students: '800+',
    successRate: '97%',
    toppers: 22,
    cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Rewa'],
    board: 'MPBSE',
    boardFullName: 'Madhya Pradesh Board of Secondary Education',
    highlights: [
      'MP Board syllabus coverage',
      'Online live classes available',
      'Regional language support',
      'AIIMS Bhopal admission guidance',
    ],
    description:
      'Madhya Pradesh students join Cerebrum primarily through our online program. With AIIMS Bhopal as a prime target, we provide specialized guidance for MP state quota admissions.',
    whyChoose: [
      'Strong online coaching infrastructure',
      'MP Board to NEET bridge course',
      'Hindi medium study materials',
      'AIIMS Bhopal focused preparation',
      'State quota counseling',
      'Recorded lectures for revision',
    ],
    testimonials: [
      {
        name: 'Aditya Jain',
        city: 'Indore',
        rank: 'AIR 567',
        quote: 'Online classes were as effective as offline. The recorded lectures helped during revision. Now at AIIMS Bhopal!',
      },
      {
        name: 'Riya Tiwari',
        city: 'Bhopal',
        rank: 'AIR 1,456',
        quote: 'MP Board student who struggled with NEET pattern. Cerebrum bridge course was exactly what I needed.',
      },
    ],
    faqs: [
      {
        question: 'How effective is online coaching for MP students?',
        answer: 'Our online coaching has 95% effectiveness compared to offline. Live interactive classes, instant doubt resolution via chat, recorded lectures, and regular tests ensure comprehensive preparation.',
      },
      {
        question: 'What is the MP Board to NEET gap?',
        answer: 'MPBSE covers about 65% of NEET Biology directly. Topics like Biotechnology, detailed Ecology, and certain Physiology concepts need additional focus, which our bridge course provides.',
      },
      {
        question: 'Do you provide guidance for AIIMS Bhopal admission?',
        answer: 'Yes, we have specific counseling for AIIMS Bhopal cutoffs, seat matrix, and state quota benefits. Many of our MP students have secured admission to AIIMS Bhopal.',
      },
    ],
  },
  'punjab': {
    name: 'Punjab',
    slug: 'punjab',
    shortName: 'Punjab',
    students: '600+',
    successRate: '96%',
    toppers: 18,
    cities: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
    board: 'PSEB',
    boardFullName: 'Punjab School Education Board',
    highlights: [
      'PSEB board alignment',
      'Punjabi medium notes available',
      'Special medical college guidance',
      'Chandigarh center accessible',
    ],
    description:
      'Punjab students, known for their determination, join Cerebrum from cities like Chandigarh, Ludhiana, and Amritsar. With strong GMC network in Punjab, we provide targeted state quota guidance.',
    whyChoose: [
      'PSEB to NCERT bridge program',
      'Study notes in Punjabi available',
      'GMC Punjab admission counseling',
      'Weekend intensive batches',
      'Online + Offline hybrid',
      'Proximity to Chandigarh',
    ],
    testimonials: [
      {
        name: 'Harpreet Singh',
        city: 'Ludhiana',
        rank: 'AIR 789',
        quote: 'Weekend batches allowed me to manage school and coaching. Got admission in GMC Amritsar!',
      },
      {
        name: 'Simran Kaur',
        city: 'Chandigarh',
        rank: 'AIR 1,234',
        quote: 'The Punjabi notes for difficult topics really helped. Biology became my strongest subject!',
      },
    ],
    faqs: [
      {
        question: 'Are study materials available in Punjabi?',
        answer: 'Yes, we provide key concept notes and difficult topic explanations in Punjabi for students who are more comfortable with the language. Main study material is in English/Hindi.',
      },
      {
        question: 'How accessible is the center from Punjab?',
        answer: 'Our Gurugram center is about 4-5 hours from major Punjab cities. Many students join weekend batches or our online program. Hostel facilities are available for those who relocate.',
      },
      {
        question: 'What about GMC Punjab admissions?',
        answer: 'Punjab has excellent GMCs in Amritsar, Patiala, and Faridkot. We provide detailed counseling for state quota seats, expected cutoffs, and choice filling strategy.',
      },
    ],
  },
  'jharkhand': {
    name: 'Jharkhand',
    slug: 'jharkhand',
    shortName: 'Jharkhand',
    students: '700+',
    successRate: '96%',
    toppers: 20,
    cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Deoghar'],
    board: 'JAC',
    boardFullName: 'Jharkhand Academic Council',
    highlights: [
      'JAC Board aligned preparation',
      'Hindi medium support available',
      'RIMS Ranchi admission guidance',
      'Online + Offline hybrid options',
    ],
    description:
      'Jharkhand has emerged as a high NEET traffic state with dedicated medical aspirants from Ranchi, Jamshedpur, and Dhanbad. Cerebrum provides specialized coaching with JAC Board alignment and RIMS Ranchi focused preparation.',
    whyChoose: [
      'JAC Board to NCERT bridge program',
      'Hindi medium study materials',
      'RIMS Ranchi admission counseling',
      'Online live classes for remote areas',
      'Hostel facility available in Gurugram',
      'State quota guidance for Jharkhand GMCs',
    ],
    testimonials: [
      {
        name: 'Ankit Kumar',
        city: 'Ranchi',
        rank: 'AIR 934',
        quote: 'From JAC Board to RIMS Ranchi! Cerebrum online classes helped me crack NEET while staying at home.',
      },
      {
        name: 'Priyanka Kumari',
        city: 'Jamshedpur',
        rank: 'AIR 1,567',
        quote: 'The Hindi notes and weekend doubt sessions made Biology my strongest subject. Thank you Cerebrum!',
      },
    ],
    faqs: [
      {
        question: 'How is JAC Board preparation different from NCERT?',
        answer: 'JAC Board covers about 65-70% of NEET Biology. Topics like Biotechnology, detailed Genetics, and Environmental Biology need additional focus. Our bridge course ensures complete NCERT coverage.',
      },
      {
        question: 'Do you have students from Jharkhand who got into RIMS?',
        answer: 'Yes, we have helped multiple Jharkhand students secure admission in RIMS Ranchi through state quota. We provide specific guidance for Jharkhand medical college admissions.',
      },
      {
        question: 'Is online coaching effective for Jharkhand students?',
        answer: 'Absolutely! Many of our Jharkhand toppers prepared through online mode. Live interactive classes, instant doubt resolution, and recorded lectures ensure the same quality as offline coaching.',
      },
    ],
  },
}

type Props = {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return Object.keys(statesData).map((state) => ({
    state: state,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params
  const stateData = statesData[state]

  if (!stateData) {
    return {
      title: 'State Not Found | Cerebrum Biology Academy',
    }
  }

  return {
    title: `Best NEET Coaching for ${stateData.name} Students | ${stateData.successRate} Success | Cerebrum`,
    description: `Top NEET Biology coaching for ${stateData.name} (${stateData.board}) students. ${stateData.students} students, ${stateData.successRate} success rate. ${stateData.highlights[0]}. Call 88264-44334!`,
    keywords: [
      `neet coaching ${stateData.name.toLowerCase()}`,
      `best neet coaching ${stateData.shortName.toLowerCase()}`,
      `${stateData.board.toLowerCase()} neet preparation`,
      `neet biology coaching ${stateData.name.toLowerCase()}`,
      ...stateData.cities.map((city) => `neet coaching ${city.toLowerCase()}`),
    ],
    openGraph: {
      title: `NEET Coaching for ${stateData.name} Students | Cerebrum`,
      description: `${stateData.successRate} success rate for ${stateData.name} students. ${stateData.board} aligned preparation.`,
      url: `https://cerebrumbiologyacademy.com/states/${state}`,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/states/${state}`,
    },
  }
}

export default async function StatePage({ params }: Props) {
  const { state } = await params
  const stateData = statesData[state]

  if (!stateData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
                <MapPin className="w-4 h-4" />
                {stateData.board} Students
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                NEET Coaching for {stateData.name}
              </h1>
              <p className="text-lg text-blue-100 mb-6">{stateData.description}</p>
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(`Hi, I'm from ${stateData.name} and interested in NEET coaching`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Now
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone.primary}`}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {CONTACT_INFO.phone.display.primary}
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-center">{stateData.name} Students at Cerebrum</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-300">{stateData.students}</div>
                  <div className="text-blue-200 text-sm">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-300">{stateData.successRate}</div>
                  <div className="text-blue-200 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-300">{stateData.toppers}</div>
                  <div className="text-blue-200 text-sm">NEET Toppers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-300">{stateData.cities.length}+</div>
                  <div className="text-blue-200 text-sm">Cities Covered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why Choose Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            Why {stateData.name} Students Choose Cerebrum
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stateData.whyChoose.map((reason, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{reason}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cities Covered */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            Students From These Cities
          </h2>
          <div className="flex flex-wrap gap-3">
            {stateData.cities.map((city) => (
              <span
                key={city}
                className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                {city}
              </span>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500" />
            Success Stories from {stateData.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {stateData.testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.city} • {testimonial.rank}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            FAQs for {stateData.name} Students
          </h2>
          <div className="space-y-4">
            {stateData.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-4">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-amber-300" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join {stateData.students} {stateData.name} Students
            </h2>
            <p className="text-blue-100 mb-6">
              Start your NEET preparation with {stateData.board}-aligned coaching and achieve your medical dreams.
              Book a free demo class today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(`Hi, I'm a ${stateData.board} student from ${stateData.name}. I want to book a free demo class.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Book Free Demo
              </a>
              <Link
                href="/states"
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                View All States
              </Link>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Pages</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'All States', href: '/states' },
              { label: 'Best NEET Coaching Gurugram', href: '/best-neet-coaching-gurugram' },
              { label: 'Online NEET Classes', href: '/online-neet-biology-classes' },
              { label: 'NEET Dropper Batch', href: '/neet-dropper-batch-delhi' },
              { label: 'Fee Structure', href: '/neet-coaching-fee-gurugram' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
              >
                {link.label}
                <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
