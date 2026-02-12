import Image from 'next/image';
import Link from 'next/link';
import SmartWhatsAppCTA from '@/components/conversion/SmartWhatsAppCTA';
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection';
import LocalitySchema from '@/components/seo/LocalitySchema';
import { PricingSection } from '@/components/city/PricingSection';
import { CostComparisonSection } from '@/components/city/CostComparisonSection';
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks';

export default function NEETCoachingPageContent() {
  const faqData = [
    {
      question: 'Why choose Cerebrum Biology Academy for NEET coaching in Brampton?',
      answer: 'Cerebrum Academy offers 98% success rate with personalized coaching from Dr. Shekhar C Singh. We understand Brampton student needs and provide curriculum-aligned preparation.'
    },
    {
      question: 'What is the success rate for students in Brampton?',
      answer: 'Our Brampton center maintains a consistent 98% success rate with students regularly scoring in top percentiles.'
    },
    {
      question: 'Do you offer online NEET coaching for Brampton students?',
      answer: 'Yes, we offer both online and offline coaching. Online platform is accessible 24/7 with live classes and recorded sessions.'
    },
    {
      question: 'What are the class timings at Brampton center?',
      answer: 'We offer flexible batches in morning, afternoon, and evening aligned with EST timezone, accommodating school schedules.'
    },
    {
      question: 'How does Cerebrum Academy help with curriculum transition?',
      answer: 'We provide comprehensive curriculum bridge programs connecting Canada school education with NEET requirements.'
    },
    {
      question: 'What is the fee structure?',
      answer: 'Flexible fee structure with multiple payment plans. Contact us via WhatsApp at +918826444334 for detailed pricing.'
    },
    {
      question: 'Do you provide doubt-solving sessions?',
      answer: 'Yes, unlimited doubt-solving sessions are part of our premium package. 24/7 WhatsApp support with Dr. Shekhar C Singh.'
    },
    {
      question: 'How are mock tests conducted?',
      answer: 'Monthly NEET-standard mock tests both online and offline with detailed performance analysis and feedback.'
    }
  ];

  return (
    <>
      <LocalitySchema
        name="Cerebrum Biology Academy - Brampton Center"
        address="Brampton, Canada"
        city="Brampton"
        country="Canada"
        latitude={43.7315}
        longitude={-79.7624}
        phone="+918826444334"
      />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              NEET Coaching in Brampton, Canada
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              NEET Coaching in Brampton - Canada's premier medical entrance prep in the largest Indian community with Ontario curriculum bridge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <SmartWhatsAppCTA 
                text="Start Free Consultation"
                variant="light"
              />
              <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition duration-300">
                Download Success Stories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-700 font-semibold">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">67+</div>
              <p className="text-gray-700 font-semibold">Students Coached</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-purple-600 mb-2">15+</div>
              <p className="text-gray-700 font-semibold">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-pink-600 mb-2">24/7</div>
              <p className="text-gray-700 font-semibold">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">
            Why Choose Cerebrum Academy in Brampton?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div key="0" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Largest Indian community in Canada</h3>
              <p className="text-gray-700">Expert coaching aligned with local education standards.</p>
            </div>
            <div key="1" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Deep 'Little Punjab' cultural connection</h3>
              <p className="text-gray-700">Expert coaching aligned with local education standards.</p>
            </div>
            <div key="2" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Ontario curriculum to NEET transition program</h3>
              <p className="text-gray-700">Expert coaching aligned with local education standards.</p>
            </div>
            <div key="3" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Queen Street Indian corridor headquarters</h3>
              <p className="text-gray-700">Expert coaching aligned with local education standards.</p>
            </div>
            <div key="4" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Affordable alternative to Toronto coaching</h3>
              <p className="text-gray-700">Expert coaching aligned with local education standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Served */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">
            We Coach Students From
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div key="0" className="bg-blue-50 p-4 rounded-lg border border-blue-200">Brampton Christian School</div>
            <div key="1" className="bg-blue-50 p-4 rounded-lg border border-blue-200">Applewood Heights Secondary School</div>
            <div key="2" className="bg-blue-50 p-4 rounded-lg border border-blue-200">Georgetown District High School</div>
            <div key="3" className="bg-blue-50 p-4 rounded-lg border border-blue-200">Bramalea Secondary School</div>
            <div key="4" className="bg-blue-50 p-4 rounded-lg border border-blue-200">Bhartiya Heritage School</div>
          </div>
        </div>
      </section>

      {/* Class Timings */}
      <section className="py-16 sm:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
            Class Timings in Brampton
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Evening and weekend batches aligned with EST timezone, flexible for Canadian family schedules
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Weekday Classes</h3>
              <p className="text-gray-700">Evening: 6:00 PM - 8:30 PM (EST)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Weekend Classes</h3>
              <p className="text-gray-700">Saturday & Sunday: 10:00 AM - 1:00 PM (EST)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* Pricing Section */}
      <PricingSection city="Brampton" />

      {/* Cost Comparison */}
      <CostComparisonSection />

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <details key={index} className="bg-white p-6 rounded-lg shadow cursor-pointer group">
                <summary className="font-bold text-lg text-gray-900 group-open:text-blue-600">
                  {item.question}
                </summary>
                <p className="text-gray-700 mt-4">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Excel in NEET?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contact Dr. Shekhar C Singh today for personalized NEET coaching in Brampton
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SmartWhatsAppCTA 
              text="Chat on WhatsApp Now"
              variant="light"
            />
            <a 
              href="tel:+918826444334"
              className="px-8 py-4 bg-white text-purple-700 font-bold rounded-lg hover:bg-blue-50 transition"
            >
              Call: +918826444334
            </a>
          </div>
        </div>
      </section>

      {/* Related Cities */}
      <RelatedCityLinks currentCity="Brampton" />
    </>
  );
}
