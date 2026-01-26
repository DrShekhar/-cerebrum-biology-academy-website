import { Star, Quote } from 'lucide-react'
import { type CountryConfig } from '@/lib/international/countries'

interface CountryTestimonialsProps {
  country: CountryConfig
}

interface Testimonial {
  name: string
  exam: string
  score: string
  quote: string
  avatar: string
}

// Regional testimonials that can be shared across similar countries
const regionalTestimonials: Record<string, Testimonial[]> = {
  'north-america': [
    {
      name: 'Sarah M.',
      exam: 'AP Biology',
      score: '5/5',
      quote:
        'The tutoring sessions were incredibly helpful. My tutor understood exactly what the AP exam requires and helped me focus on the right areas. Went from a 3 to a 5!',
      avatar: '👩‍🎓',
    },
    {
      name: 'Michael R.',
      exam: 'MCAT Biology',
      score: '95th percentile',
      quote:
        'The structured approach to MCAT biology was game-changing. Complex topics like biochemistry became so much clearer. Highly recommend!',
      avatar: '👨‍⚕️',
    },
    {
      name: 'Emily T.',
      exam: 'SAT Biology',
      score: '780/800',
      quote:
        'The small group sessions were perfect. Learning with peers kept me motivated, and the practice tests were spot-on for the actual exam.',
      avatar: '👩‍🔬',
    },
  ],
  europe: [
    {
      name: 'James W.',
      exam: 'A-Level Biology',
      score: 'A*',
      quote:
        'My tutor was brilliant at explaining complex topics like genetics and ecology. The exam technique sessions were invaluable - went from predicted B to A*!',
      avatar: '👨‍🎓',
    },
    {
      name: 'Sophie L.',
      exam: 'GCSE Biology',
      score: 'Grade 9',
      quote:
        'Started struggling in Year 10 but the tutoring turned things around. My confidence in biology has completely transformed.',
      avatar: '👩‍🔬',
    },
    {
      name: 'David H.',
      exam: 'BMAT',
      score: '6.2 average',
      quote:
        'The BMAT prep was exactly what I needed. Focused practice on scientific reasoning and problem-solving. Got into my first choice medical school!',
      avatar: '👨‍⚕️',
    },
  ],
  'asia-pacific': [
    {
      name: 'Tan Wei Lin',
      exam: 'A-Level Biology',
      score: 'A',
      quote:
        'The tutoring sessions perfectly complemented my school lessons. My tutor helped me understand the deeper concepts that are tested in A-Levels.',
      avatar: '👩‍🎓',
    },
    {
      name: 'Raj Kumar',
      exam: 'HSC Biology',
      score: 'Band 6',
      quote:
        'The practice papers and feedback were incredibly detailed. My tutor knew exactly what NESA markers look for. Achieved Band 6!',
      avatar: '👨‍🔬',
    },
    {
      name: 'Lisa Chen',
      exam: 'HKDSE Biology',
      score: 'Level 5**',
      quote:
        'Online tutoring fit perfectly with my busy schedule. The recordings helped me revise before exams. Exceeded my expectations!',
      avatar: '👩‍⚕️',
    },
  ],
  'middle-east-africa': [
    {
      name: 'Fatima A.',
      exam: 'IGCSE Biology',
      score: 'A*',
      quote:
        'The tutoring sessions were so well-structured. My tutor made complex topics simple and the exam prep was exactly what I needed.',
      avatar: '👩‍🎓',
    },
    {
      name: 'Mohammed S.',
      exam: 'IB Biology HL',
      score: '7',
      quote:
        'Getting a 7 in IB Biology seemed impossible until I found these tutors. The internal assessment guidance was exceptional!',
      avatar: '👨‍🔬',
    },
    {
      name: 'Thabo M.',
      exam: 'NSC Life Sciences',
      score: '95%',
      quote:
        'My tutor understood the CAPS curriculum perfectly. The practice papers and marking feedback helped me excel in Matric!',
      avatar: '👨‍🎓',
    },
  ],
}

function getTestimonialsForCountry(country: CountryConfig): Testimonial[] {
  // Map countries to regions for testimonials
  const regionMap: Record<string, string> = {
    us: 'north-america',
    ca: 'north-america',
    uk: 'europe',
    ie: 'europe',
    au: 'asia-pacific',
    sg: 'asia-pacific',
    hk: 'asia-pacific',
    nz: 'asia-pacific',
    ae: 'middle-east-africa',
    za: 'middle-east-africa',
  }

  const region = regionMap[country.code] || 'north-america'
  return regionalTestimonials[region] || regionalTestimonials['north-america']
}

export function CountryTestimonials({ country }: CountryTestimonialsProps) {
  const testimonials = getTestimonialsForCountry(country)

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
          Student Success Stories
        </h2>
        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Hear from students who have achieved their biology goals with our expert tutoring.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 relative"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-green-500/20 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">
                    {testimonial.exam} -{' '}
                    <span className="text-green-600 font-medium">{testimonial.score}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CountryTestimonials
