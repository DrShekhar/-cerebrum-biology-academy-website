import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { getDictionary } from '@/lib/i18n'
import { CONTACT_INFO, getPhoneLink } from '@/lib/constants/contactInfo'
import {
  GraduationCap,
  Users,
  Target,
  Video,
  MessageCircle,
  BookOpen,
  Phone,
  ArrowRight,
  Trophy,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'செரிப்ரம் பயாலஜி அகாடமி | இந்தியாவின் #1 NEET பயாலஜி கோச்சிங் | 98% வெற்றி விகிதம்',
  description:
    'AIIMS பயிற்சி பெற்ற ஆசிரியர்களால் இந்தியாவின் சிறந்த NEET பயாலஜி கோச்சிங். 98% வெற்றி விகிதம், 2000+ மாணவர்கள். 11, 12 வகுப்பு மற்றும் ட்ராப்பர் பேட்ச். ஆன்லைன் மற்றும் ஆஃப்லைன் வகுப்புகள். இலவச டெமோ புக் செய்யுங்கள்!',
  keywords: [
    'NEET பயாலஜி கோச்சிங்',
    'NEET கோச்சிங் தமிழ்',
    'பயாலஜி கோச்சிங் சென்னை',
    'AIIMS பயிற்சி ஆசிரியர்',
    'NEET தயாரிப்பு',
    'மருத்துவ நுழைவு கோச்சிங்',
    'ஆன்லைன் NEET கோச்சிங்',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ta',
    languages: {
      'en-IN': 'https://cerebrumbiologyacademy.com',
      'hi-IN': 'https://cerebrumbiologyacademy.com/hi',
      'ta-IN': 'https://cerebrumbiologyacademy.com/ta',
    },
  },
  openGraph: {
    title: 'செரிப்ரம் பயாலஜி அகாடமி | NEET பயாலஜி கோச்சிங்',
    description: 'இந்தியாவின் #1 NEET பயாலஜி கோச்சிங். 98% வெற்றி விகிதம். AIIMS ஆசிரியர்.',
    type: 'website',
    locale: 'ta_IN',
    url: 'https://cerebrumbiologyacademy.com/ta',
  },
}

export default function TamilHomePage() {
  const dict = getDictionary('ta')

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'செரிப்ரம் பயாலஜி அகாடமி',
    alternateName: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com/ta',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    description: 'இந்தியாவின் முன்னணி NEET பயாலஜி கோச்சிங். AIIMS பயிற்சி பெற்ற ஆசிரியர்களால் விரிவான தயாரிப்பு.',
    inLanguage: 'ta',
    availableLanguage: ['ta', 'hi', 'en'],
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  }

  return (
    <>
      <Script
        id="tamil-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Language Switcher Banner */}
        <div className="bg-green-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <span>🇮🇳 நீங்கள் தமிழ் பக்கத்தில் இருக்கிறீர்கள்</span>
            <div className="flex gap-4">
              <Link href="/" className="hover:text-green-200 transition-colors">
                English
              </Link>
              <Link href="/hi" className="hover:text-green-200 transition-colors">
                हिंदी
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">{dict.tagline}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                NEET பயாலஜியில்{' '}
                <span className="text-yellow-300">98% வெற்றி விகிதம்</span>
              </h1>

              <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
                {dict.hero.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300">98%</div>
                  <div className="text-sm text-green-100">{dict.stats.successRate}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300">2000+</div>
                  <div className="text-sm text-green-100">{dict.stats.studentsTaught}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300">15+</div>
                  <div className="text-sm text-green-100">{dict.stats.yearsExperience}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300">695/720</div>
                  <div className="text-sm text-green-100">{dict.stats.topScore}</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
                >
                  <Video className="w-5 h-5" />
                  {dict.hero.ctaDemo}
                </Link>
                <a
                  href={getPhoneLink()}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
                >
                  <Phone className="w-5 h-5" />
                  {dict.hero.ctaCall}: {CONTACT_INFO.phone.display.hyphenated.primary}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {dict.features.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { icon: GraduationCap, ...dict.features.aiimsFaculty },
                { icon: Users, ...dict.features.smallBatch },
                { icon: Target, ...dict.features.successRate },
                { icon: Video, ...dict.features.hybridMode },
                { icon: MessageCircle, ...dict.features.doubtSupport },
                { icon: BookOpen, ...dict.features.ncertMaterial },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tamil Nadu Specific Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                தமிழ்நாடு மாணவர்களுக்கு சிறப்பு
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                சென்னை, கோயம்புத்தூர், மதுரை, திருச்சி மற்றும் அனைத்து மாவட்டங்களிலிருந்தும் மாணவர்கள் எங்கள் ஆன்லைன் வகுப்புகளில் கலந்துகொள்கின்றனர்.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">67+</div>
                  <div className="text-gray-600">தமிழ்நாடு மாணவர்கள்</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">47</div>
                  <div className="text-gray-600">AIIMS/JIPMER தேர்வுகள்</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">156</div>
                  <div className="text-gray-600">அரசு மருத்துவ கல்லூரி இடங்கள்</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict.cta.title}</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">{dict.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                {dict.cta.button}
              </Link>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
              >
                <Phone className="w-5 h-5" />
                WhatsApp-ல் தொடர்பு கொள்ளுங்கள்
              </a>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="bg-gray-900 text-gray-400 py-4 text-center text-sm">
          <p>{dict.footer.copyright}</p>
        </div>
      </div>
    </>
  )
}
