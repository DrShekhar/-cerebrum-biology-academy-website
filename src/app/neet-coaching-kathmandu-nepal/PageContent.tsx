'use client';

import { useState } from 'react';
import { ChevronDown, MapPin, Clock, Users, Trophy, Phone, MessageSquare } from 'lucide-react';
import { SmartWhatsAppCTA } from '@/components/conversion/SmartWhatsAppCTA';
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection';
import { PricingSection, CostComparisonSection } from '@/components/city';
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks';

interface PageContentProps {
  city: string;
  country: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export function PageContent({ city, country }: PageContentProps) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    { id: 'faq-1', question: 'Can Nepali students directly take NEET from Kathmandu?', answer: 'Yes. NMC (Nepal Medical Council) recognizes NEET scores. NEET exam is held twice yearly in Kathmandu since 2023.' },
    { id: 'faq-2', question: 'What\'s the cost advantage of studying in Kathmandu vs India?', answer: 'Our fees are 30-40% cheaper than equivalent coaching in Delhi/Mumbai. Plus, living expenses are significantly lower in Kathmandu.' },
    { id: 'faq-3', question: 'Do you teach in Hindi medium?', answer: 'Yes, we offer bilingual classes in Hindi and English both. Most Nepali students prefer Hindi medium initially.' },
    { id: 'faq-4', question: 'What about the Nepal to NEET curriculum bridge?', answer: 'Our special transition module covers the differences between Nepal School Board and NEET syllabus in the first 4 weeks.' },
    { id: 'faq-5', question: 'Is there transportation from nearby areas?', answer: 'Direct buses from Pokhara, Chitwan, and Narayanghat. Many students stay in PG accommodations near our center.' },
    { id: 'faq-6', question: 'What\'s the success rate for Nepali students?', answer: '98% qualified rate for NEET in 2023-24. 15+ Nepali students scored 650+ marks.' },
  ];

  const schools = [
    'Budhanilkantha School, Kathmandu',
    'DAV School Lalitpur',
    'St. Xavier\'s School, Kathmandu',
    'Siddhartha School, Kathmandu',
    'Tribhuvan University School of Sciences',
    'Little Angels\' School, Kathmandu',
    'Madan Bhandari Memorial Academy',
    'Global Higher Secondary School, Kathmandu',
  ];

  return (
    <div className="w-full">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">NEET Excellence in {country}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            NEET Coaching in {city}, {country}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            98% Success Rate • Expert Faculty • Proven Results
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <SmartWhatsAppCTA text="Start Free Consultation" variant="light" className="px-8 py-3 font-semibold text-lg" />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">Download Syllabus</button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <p className="text-gray-600">Students Qualified</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">Expert</div>
              <p className="text-gray-600">Faculty</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Cerebrum for NEET?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-3">Nepal Board Bridge</h3>
              <p className="text-gray-600">Nepal board to NEET transition bridge program</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-3">Cost Advantage</h3>
              <p className="text-gray-600">Cost advantage compared to India (30-40% cheaper)</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-3">Hindi Medium</h3>
              <p className="text-gray-600">Hindi medium option available</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-3">Easy Access</h3>
              <p className="text-gray-600">Direct bus access from North India</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
            <div className="flex items-start gap-4 mb-6">
              <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-2">NEET Exam Center in {city}</h3>
                <p className="text-gray-700 text-lg">Nepal's first official NEET exam center in Kathmandu with 500+ seats</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Schools We Serve</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {schools.map((school) => (
              <div key={school} className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
                <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">{school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Class Timings</h2>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg">
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Flexible Learning Schedule</h3>
                <p className="text-lg whitespace-pre-wrap">6:00 AM - 10:00 AM IST (Morning) | 4:00 PM - 8:00 PM IST (Evening)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection city={city} country={country} />
      <PricingSection city={city} country={country} />
      <CostComparisonSection city={city} country={country} />

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`} />
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ace Your NEET?</h2>
          <p className="text-xl mb-8">Join thousands of successful students preparing in {city}</p>
          <SmartWhatsAppCTA text="Start Your NEET Journey Today" variant="light" className="px-8 py-4 font-semibold text-lg" />
        </div>
      </section>

      <RelatedCityLinks currentCity={city} country={country} />

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center gap-3">
              <Phone className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Call us at</p>
                <p className="text-xl font-bold">+918826444334</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">WhatsApp us at</p>
                <p className="text-xl font-bold">+918826444334</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
