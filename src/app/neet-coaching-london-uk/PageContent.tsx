/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { SmartWhatsAppCTA } from "@/components/conversion/SmartWhatsAppCTA";
import { VideoTestimonialsSection } from "@/components/testimonials/VideoTestimonialsSection";
import { PricingSection, CostComparisonSection } from "@/components/city";
import { RelatedCityLinks } from "@/components/seo/RelatedCityLinks";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
        id: "0",
        question: "Is NEET exam recognized for studying medicine in UK universities?",
        answer: "While UK universities primarily accept A-Levels and IGCSE, NEET qualification demonstrates medical aptitude for students seeking medicine programs. Many UK universities recognize NEET along with your other qualifications."
      },
      {
        id: "1",
        question: "What are the class timings for London batch?",
        answer: "Our London batches run 5 PM - 8 PM IST (9 AM - 12 PM GMT) on weekdays and 2 PM - 5 PM IST (8 AM - 11 AM GMT) on weekends for maximum convenience."
      },
      {
        id: "2",
        question: "Can I study NEET while doing A-Levels?",
        answer: "Yes, many London students successfully prepare for NEET while completing A-Levels. Our curriculum is designed for dual preparation with flexible scheduling."
      },
      {
        id: "3",
        question: "What's the NHS pathway after NEET for Indian students in London?",
        answer: "NEET score + A-Levels opens doors to medical degrees in India and selective universities in UK/EU. NHS pathway requires Indian medical graduation followed by UKMLA/FMGE."
      },
      {
        id: "4",
        question: "Are there study groups for London NEET students?",
        answer: "Absolutely! We organize weekly study groups, mock tests, and doubt sessions with our London community. Regular online and occasional offline meetups happen."
      },
      {
        id: "5",
        question: "What's your success rate for London students?",
        answer: "Our London cohort achieves 98% success rate with 45+ students securing 600+ marks. Many are now in top medical colleges in India."
      }
];

export function PageContent() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Coaching in London, UK
          </h1>
          <p className="text-xl mb-6 text-blue-100">
            Expert NEET preparation with 98% success rate. Dr. Shekhar C Singh's proven methodology.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/918826444334?text=Hello%20Cerebrum%20Academy,%20I%20want%20to%20know%20about%20NEET%20coaching%20in%20London"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              WhatsApp Now
            </a>
            <a
              href="tel:+918826444334"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold"
            >
              Call +918826444334
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-700 mt-2">Success Rate</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">600+</div>
              <div className="text-gray-700 mt-2">Avg. NEET Score</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-700 mt-2">Students in AIIMS</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">50,000</div>
              <div className="text-gray-700 mt-2">Indian Community</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Cerebrum for London?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Expert Mentorship</h3>
              <p className="text-gray-700">
                Learn directly from Dr. Shekhar C Singh with 20+ years of medical education expertise.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Localized Curriculum</h3>
              <p className="text-gray-700">
                London-specific content aligned with local education boards and timezone optimization.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-gray-700">
                Join a vibrant London community of NEET aspirants with peer mentorship and study groups.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-700">
                Multiple batch timings optimized for GMT/BST timezone to fit your local schedule.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Online + Offline</h3>
              <p className="text-gray-700">
                Hybrid learning model with online classes and occasional in-person study marathons.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Career Guidance</h3>
              <p className="text-gray-700">
                Post-NEET pathway planning for India, USA, Canada, UK, or Australia medical careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Class Timings Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Class Timings for London</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Morning Batch</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">IST:</span> 7 AM - 10 AM
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Local GMT/BST:</span> See meta timings
              </p>
              <p className="text-gray-600 mt-4">Ideal for students with evening commitments</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Evening Batch</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">IST:</span> 6 PM - 9 PM
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Local GMT/BST:</span> See meta timings
              </p>
              <p className="text-gray-600 mt-4">Perfect for students balancing school/college</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Schools in City */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Schools in London</h2>
          <p className="text-center text-gray-600 mb-8">
            Many students from these prestigious institutions join our NEET coaching:
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li key="0">Royal Grammar School London</li>
                  <li key="1">City of London School</li>
                  <li key="2">St Paul's School</li>
                  <li key="3">Dulwich College</li>
                  <li key="4">Mill Hill School</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Student Success Stories</h2>
          <VideoTestimonialsSection />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Pricing Plans</h2>
          <PricingSection />
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Cerebrum is Most Affordable?</h2>
          <CostComparisonSection />
        </div>
      </section>

      {/* WhatsApp CTA 2 */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <SmartWhatsAppCTA 
            title="Still Have Questions?" 
            message="Chat with our counselors on WhatsApp for instant guidance"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions - London
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                  className="w-full px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 flex justify-between items-center"
                >
                  {item.question}
                  <span className="text-blue-600">{expandedFaq === item.id ? "-" : "+"}</span>
                </button>
                {expandedFaq === item.id && (
                  <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA 3 */}
      <section className="py-8 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <SmartWhatsAppCTA 
            title="Ready to Start Your NEET Journey?" 
            message="Book your free counseling session now"
            variant="highlight"
          />
        </div>
      </section>

      {/* Related Cities */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">NEET Coaching in Other Cities</h2>
          <RelatedCityLinks currentCity="neet-coaching-london-uk" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join 500+ Successful NEET Students
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your preparation with India's most trusted NEET coaching. Limited seats available in London batch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/918826444334?text=Hello%20Cerebrum%20Academy,%20interested%20in%20London%20batch"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Chat on WhatsApp
            </a>
            <a
              href="tel:+918826444334"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
