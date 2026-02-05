import { Metadata } from 'next'
import Link from 'next/link'
import {
  GraduationCap,
  Users,
  Trophy,
  Phone,
  MessageCircle,
  CheckCircle,
  Star,
  BookOpen,
  Target,
  Clock,
  Award,
  ArrowRight,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export const metadata: Metadata = {
  title: 'सेरेब्रम बायोलॉजी अकादमी | NEET जीव विज्ञान कोचिंग | दिल्ली NCR',
  description:
    'NEET के लिए सर्वश्रेष्ठ जीव विज्ञान कोचिंग। AIIMS फैकल्टी, 98% सफलता दर, छोटे बैच। ऑनलाइन और ऑफलाइन क्लासेस उपलब्ध। फ्री डेमो बुक करें!',
  keywords: [
    'neet biology coaching hindi',
    'neet coaching delhi hindi',
    'जीव विज्ञान कोचिंग',
    'नीट कोचिंग दिल्ली',
    'बायोलॉजी क्लासेस',
    'मेडिकल एंट्रेंस कोचिंग',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/hi',
    languages: {
      'en': 'https://cerebrumbiologyacademy.com',
      'hi': 'https://cerebrumbiologyacademy.com/hi',
    },
  },
  openGraph: {
    title: 'सेरेब्रम बायोलॉजी अकादमी | NEET जीव विज्ञान कोचिंग',
    description: 'NEET के लिए सर्वश्रेष्ठ जीव विज्ञान कोचिंग। AIIMS फैकल्टी, 98% सफलता दर।',
    locale: 'hi_IN',
  },
}

const stats = [
  { value: '98%', label: 'सफलता दर', icon: Trophy },
  { value: '15+', label: 'वर्षों का अनुभव', icon: Clock },
  { value: '500+', label: 'NEET क्वालिफायर्स', icon: GraduationCap },
  { value: '15-20', label: 'छात्र प्रति बैच', icon: Users },
]

const features = [
  {
    title: 'AIIMS प्रशिक्षित फैकल्टी',
    description: 'डॉ. शेखर सी सिंह, AIIMS नई दिल्ली एलुमनस, 15+ वर्षों के अनुभव के साथ',
    icon: GraduationCap,
  },
  {
    title: 'छोटे बैच साइज',
    description: 'हर छात्र पर व्यक्तिगत ध्यान के लिए केवल 15-20 छात्र प्रति बैच',
    icon: Users,
  },
  {
    title: '98% सफलता दर',
    description: 'हजारों NEET क्वालिफायर्स के साथ सिद्ध ट्रैक रिकॉर्ड',
    icon: Target,
  },
  {
    title: 'NCERT केंद्रित पाठ्यक्रम',
    description: 'NEET पैटर्न के अनुसार व्यापक अध्ययन सामग्री',
    icon: BookOpen,
  },
  {
    title: '24/7 डाउट सपोर्ट',
    description: 'WhatsApp के माध्यम से कभी भी अपने संदेह दूर करें',
    icon: MessageCircle,
  },
  {
    title: 'हाइब्रिड लर्निंग',
    description: 'सुविधा के अनुसार ऑनलाइन या ऑफलाइन क्लासेस',
    icon: Star,
  },
]

const courses = [
  {
    name: 'क्लास 11 NEET कोर्स',
    duration: '1 वर्ष',
    price: '₹48,000 से',
    features: ['संपूर्ण NCERT', 'साप्ताहिक टेस्ट', 'डाउट सेशन'],
  },
  {
    name: 'क्लास 12 NEET कोर्स',
    duration: '1 वर्ष',
    price: '₹70,000 से',
    features: ['बोर्ड + NEET', '100+ मॉक टेस्ट', 'PYQ एनालिसिस'],
  },
  {
    name: 'ड्रॉपर/रिपीटर बैच',
    duration: '10 महीने',
    price: '₹70,000 से',
    features: ['इंटेंसिव रिवीजन', 'डेली प्रैक्टिस', 'पर्सनल मेंटरिंग'],
  },
]

const faqs = [
  {
    question: 'सेरेब्रम बायोलॉजी अकादमी क्या है?',
    answer:
      'सेरेब्रम बायोलॉजी अकादमी दिल्ली NCR में NEET जीव विज्ञान के लिए एक विशेष कोचिंग संस्थान है। हमारे AIIMS प्रशिक्षित फैकल्टी छोटे बैच में पढ़ाते हैं जिससे हर छात्र को व्यक्तिगत ध्यान मिलता है।',
  },
  {
    question: 'फीस कितनी है?',
    answer:
      'हमारी फीस ₹45,000 से ₹1,80,000 प्रति वर्ष है, जो कोर्स और टियर पर निर्भर करती है। EMI विकल्प और योग्य छात्रों के लिए 50% तक की छात्रवृत्ति उपलब्ध है।',
  },
  {
    question: 'क्या ऑनलाइन क्लासेस उपलब्ध हैं?',
    answer:
      'हां, हम लाइव इंटरैक्टिव ऑनलाइन क्लासेस प्रदान करते हैं जो ऑफलाइन क्लासेस जितनी ही प्रभावी हैं। रिकॉर्डेड लेक्चर, डिजिटल स्टडी मटेरियल और 24/7 डाउट सपोर्ट शामिल है।',
  },
  {
    question: 'फ्री डेमो कैसे बुक करें?',
    answer: `हमारे नंबर ${CONTACT_INFO.phone.display.primary} पर कॉल करें या WhatsApp करें। आप हमारी वेबसाइट पर भी डेमो बुक कर सकते हैं। डेमो क्लास में ₹2,000 की फ्री स्टडी मटेरियल भी मिलती है।`,
  },
]

export default function HindiHomePage() {
  return (
    <div className="min-h-screen">
      {/* Language Switcher Banner */}
      <div className="bg-blue-600 text-white py-2 text-center text-sm">
        <span>हिंदी में देखें | </span>
        <Link href="/" className="underline hover:no-underline">
          Switch to English
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
              <Award className="w-4 h-4 text-yellow-400" />
              दिल्ली NCR में #1 NEET बायोलॉजी कोचिंग
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              NEET में सफलता का मार्ग
              <br />
              <span className="text-yellow-400">सेरेब्रम बायोलॉजी अकादमी</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              AIIMS प्रशिक्षित फैकल्टी से सीखें। 98% सफलता दर के साथ अपने मेडिकल सपने को साकार करें।
              छोटे बैच, व्यक्तिगत ध्यान, और सिद्ध परिणाम।
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-xl p-4">
                  <stat.icon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=नमस्ते, मुझे NEET कोचिंग के बारे में जानकारी चाहिए`}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp पर संपर्क करें
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.primary}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <Phone className="w-5 h-5" />
                कॉल करें: {CONTACT_INFO.phone.display.primary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              हमें क्यों चुनें?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              सेरेब्रम बायोलॉजी अकादमी NEET जीव विज्ञान की तैयारी के लिए सर्वश्रेष्ठ विकल्प है
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">हमारे कोर्सेस</h2>
            <p className="text-gray-600">हर छात्र के लिए उपयुक्त कोर्स</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.name}
                className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100 hover:border-blue-500 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                <div className="text-sm text-gray-500 mb-4">अवधि: {course.duration}</div>
                <div className="text-2xl font-bold text-blue-600 mb-4">{course.price}</div>
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  फ्री डेमो बुक करें
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">अपना NEET सफर आज शुरू करें</h2>
          <p className="text-blue-100 mb-8 text-lg">
            फ्री डेमो क्लास बुक करें और ₹2,000 की स्टडी मटेरियल मुफ्त पाएं
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              फ्री डेमो बुक करें
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              <Phone className="w-5 h-5" />
              {CONTACT_INFO.phone.display.primary}
            </a>
          </div>
        </div>
      </section>

      {/* Back to English */}
      <div className="py-8 text-center bg-gray-100">
        <Link href="/" className="text-blue-600 hover:underline inline-flex items-center gap-2">
          <ArrowRight className="w-4 h-4 rotate-180" />
          View in English
        </Link>
      </div>
    </div>
  )
}
