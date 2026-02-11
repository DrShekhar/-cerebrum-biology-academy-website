import Image from 'next/image';
import Link from 'next/link';
import SmartWhatsAppCTA from '@/components/conversion/SmartWhatsAppCTA';
import VideoTestimonialsSection from '@/components/testimonials/VideoTestimonialsSection';
import LocalitySchema from '@/components/seo/LocalitySchema';
import PricingSection from '@/components/city/PricingSection';
import CostComparisonSection from '@/components/city/CostComparisonSection';
import RelatedCityLinks from '@/components/seo/RelatedCityLinks';

export default function NEETCoachingPageContent() {
  const faqData = [
    {
      question: 'Why choose Cerebrum Biology Academy for NEET coaching in Chicago?',
      answer: 'Cerebrum Academy offers 98% success rate with personalized coaching from Dr. Shekhar C Singh. We understand Chicago student needs and provide curriculum-aligned preparation.'
    },
    {
      question: 'What is the success rate for students in Chicago?',
      answer: 'Our Chicago center maintains a consistent 98% success rate with students regularly scoring in top percentiles.'
    },
    {
      question: 'Do you offer online NEET coaching for Chicago students?',
      answer: 'Yes, we offer both online and offline coaching. Online platform is accessible 24/7 with live classes and recorded sessions.'
    },
    {
      question: 'What are the class timings at Chicago center?',
      answer: 'We offer flexible batches in morning, afternoon, and evening aligned with CST timezone, accommodating school schedules.'
    },
    {
      question: 'How does Cerebrum Academy help with curriculum transition?',
      answer: 'We provide comprehensive curriculum bridge programs connecting USA school education with NEET requirements.'
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
        name="Cerebrum Biology Academy - Chicago Center"
        address="Chicago, USA"
        city="Chicago"
        country="USA"
        latitude={41.8781}
        longitude={-87.6298}
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
              NEET Coaching in Chicago, USA
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              NEET Coaching in Chicago - Leading medical entrance exam preparation in Illinois with expert guidance from Dr. Shekhar C Singh.
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
              <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">500+</div>
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
            Why Choose Cerebrum Academy in Chicago?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div key="0" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Strong presence on Devon Avenue Indian hub</h3>
              <p className="text-gray-700">Expert coaching aligned with local education standards.</p>
            </div>
            <div key="1" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Proximity to University of Chicago research partnerships</h3>
              <p className="text-gray-700">Expert coaching aligned with local education standards.</p>
            </div>
            <div key="2" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Support for Naperville Indian families</h3>
              <p className="text-gray-700">Expert coaching aligned with local education standards.</p>
            </div>
            <div key="3" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">AP Biology bridge program to NEET prep</h3>
              <p className="text-gray-700">Expert coaching aligned with local education standards.</p>
            </div>
            <div key="4" className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Chicago Medical Society student mentorship</h3>
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
            <div key="0" className="bg-blue-50 p-4 rounded-lg border border-blue-200">Lincoln Park High School</div>
            <div key="1" className="bg-blue-50 p-4 rounded-lg border border-blue-200">New Trier High School (Winnetka)</div>
            <div key="2" className="bg-blue-50 p-4 rounded-lg border border-blue-200">Barrington High School</div>
            <div key="3" className="bg-blue-50 p-4 rounded-lg border border-blue-200">Illinois Mathematics and Science Academy</div>
            <div key="4" className="bg-blue-50 p-4 rounded-lg border border-blue-200">Sri Vaishnava School</div>
          </div>
        </div>
      </section>

      {/* Class Timings */}
      <section className="py-16 sm:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
            Class Timings in Chicago
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Evening and weekend batches aligned with CST timezone
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Weekday Classes</h3>
              <p className="text-gray-700">Evening: 6:00 PM - 8:30 PM (CST)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Weekend Classes</h3>
              <p className="text-gray-700">Saturday & Sunday: 10:00 AM - 1:00 PM (CST)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* Pricing Section */}
      <PricingSection city="Chicago" />

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
            Contact Dr. Shekhar C Singh today for personalized NEET coaching in Chicago
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
      <RelatedCityLinks currentCity="Chicago" />
    </>
  );
}
