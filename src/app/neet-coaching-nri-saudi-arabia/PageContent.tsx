"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/Button'
import SmartWhatsAppCTA from "@/components/conversion/SmartWhatsAppCTA";
import { VideoTestimonialsSection } from "@/components/testimonials/VideoTestimonialsSection";
import { PricingSection } from "@/components/city/PricingSection";
import { CostComparisonSection } from "@/components/city/CostComparisonSection";
import { RelatedCityLinks } from "@/components/seo/RelatedCityLinks";

export default function PageContent() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const stats = [
    { label: "Success Rate", value: "98%", icon: "📊" },
    { label: "CBSE Schools", value: "42", icon: "🏫" },
    { label: "Indian Population", value: "2.6M", icon: "👥" },
    { label: "Exam Centers", value: "2", icon: "📍" },
  ];

  const whyChoose = [
    {
      title: "Expert Faculty",
      description: "Highly qualified NEET biology experts with Saudi Arabia experience",
      icon: "👨‍🏫",
    },
    {
      title: "98% Success Rate",
      description: "Proven track record with Saudi Arabia NRI students",
      icon: "🎯",
    },
    {
      title: "AST (UTC+3) Batches",
      description: "Classes scheduled for Saudi Arabia's timezone flexibility",
      icon: "⏰",
    },
    {
      title: "Personalized Mentoring",
      description: "Individual guidance from admission to exam day",
      icon: "🎓",
    },
    {
      title: "Community Support",
      description: "Connect with Saudi Arabia peers and alumni network",
      icon: "🤝",
    },
    {
      title: "Exam Center Support",
      description: "Help with registration at Riyadh, Jeddah",
      icon: "📋",
    },
  ];

  const classTimings = [
    {
      level: "Class 11",
      timing: "Evening batch (IST-friendly)",
      days: "Mon-Fri, 6:00 PM - 8:30 PM AST",
      focus: "Foundation building with Saudi Arabia curriculum bridge",
    },
    {
      level: "Class 12",
      timing: "Intensive batch",
      days: "Mon-Sat, 4:00 PM - 7:00 PM AST",
      focus: "Complete NEET syllabus mastery",
    },
    {
      level: "Droppers",
      timing: "Full-day intensive",
      days: "Daily batches with flexible slots",
      focus: "Revision and mock exams",
    },
    {
      level: "Weekend Intensive",
      timing: "Sat-Sun batches",
      days: "10:00 AM - 2:00 PM AST",
      focus: "Concept clarity and doubt resolution",
    },
  ];

  const faqs = [
    {
      id: "faq-1",
      question: "Is NEET preparation necessary for Saudi Arabia students?",
      answer: "Yes, NEET is the mandatory entrance exam for admission to medical colleges in India. Our specialized coaching helps Saudi Arabia students master the NEET curriculum while balancing work, studies, and timezone differences. We have proven success with Saudi Arabia NRI students."
    },
    {
      id: "faq-2",
      question: "What is your success rate for Saudi Arabia students?",
      answer: "We maintain a 98% success rate across all students including Saudi Arabia NRI students. Many of our Saudi Arabia students secure admissions in top AIIMS and medical colleges across India."
    },
    {
      id: "faq-3",
      question: "Do you offer online and offline coaching?",
      answer: "Yes! We offer online, offline, and hybrid batches. Saudi Arabia students can choose based on their convenience with timings suited to AST (UTC+3)."
    },
    {
      id: "faq-4",
      question: "Can Saudi Arabia students take NEET exam in Saudi Arabia?",
      answer: "NEET exam centers are available in Riyadh, Jeddah. We provide complete guidance for exam registration, admit card collection, and exam day logistics."
    },
    {
      id: "faq-5",
      question: "What about visa and sponsorship support?",
      answer: "Student visa sponsorship support for medical education in India We provide counseling to ensure smooth transition to medical education in India."
    },
    {
      id: "faq-6",
      question: "How do you bridge Saudi Arabia's curriculum with NEET?",
      answer: "Our expert faculty understands Saudi Arabia's education system and CBSE requirements. We customize batches to bridge the gap, ensuring Saudi Arabia students excel in NEET while leveraging their existing knowledge."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                NEET Coaching for Saudi Arabia
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                98% Success Rate • 42 CBSE Schools • 2.6M Indians
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Saudi Arabia's oil & gas industry offers excellent opportunities for medical graduates. Our coaching helps NRI students balance work, education, and NEET preparation with specialized evening batches timed for IST. Many of our students pursue medical degrees while maintaining their professional careers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <SmartWhatsAppCTA
                  text="Get Free Consultation"
                  variant="default"
                  className="text-base px-8 py-3"
                />
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-3"
                >
                  Download Brochure
                </Button>
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>
                <p className="text-lg font-medium">NEET Coaching in Saudi Arabia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Cerebrum Biology Academy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Served */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Cities We Serve in Saudi Arabia</h2>
          <p className="text-center text-gray-600 mb-12">
            Serving 42 CBSE schools across Riyadh, Jeddah, Dammam, Al Khobar
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Riyadh', 'Jeddah', 'Dammam', 'Al Khobar', 'Makkah', 'Madinah', 'Jubail'].map((city) => (
              <div key={city} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center">
                <p className="font-semibold text-gray-900">{city}</p>
                <p className="text-sm text-gray-600 mt-2">CBSE Schools & Centers</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SmartWhatsAppCTA - Mid Page */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your NEET Journey?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join 1000+ Saudi Arabia students who achieved their medical dreams with us
          </p>
          <SmartWhatsAppCTA
            text="WhatsApp Us Now - Free Trial Class"
            variant="secondary"
            className="text-base px-8 py-3"
          />
        </div>
      </section>

      {/* Class Timings */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Class Timings for Saudi Arabia</h2>
          <div className="space-y-6">
            {classTimings.map((timing) => (
              <div key={timing.level} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{timing.level}</h3>
                <p className="text-blue-600 font-medium mb-2">{timing.timing}</p>
                <p className="text-gray-700 mb-2">⏰ {timing.days}</p>
                <p className="text-gray-600">{timing.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Bridge */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Saudi Arabia to NEET Bridge</h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our specialized curriculum bridges Saudi Arabia's education system with NEET requirements. 
              With 42 CBSE schools in Riyadh, Jeddah, Dammam, Al Khobar, we have deep expertise in:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span className="text-gray-700">Converting Saudi Arabia curriculum to NEET format</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span className="text-gray-700">Exam center registration and logistics</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span className="text-gray-700">Medical education visa sponsorship support</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span className="text-gray-700">NRI quota counseling and admissions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span className="text-gray-700">Timezone-friendly study schedules</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Success Stories from Saudi Arabia</h2>
          <p className="text-center text-gray-600 mb-12">
            Watch how our Saudi Arabia students achieved their medical dreams
          </p>
          <VideoTestimonialsSection country="Saudi Arabia" />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">NEET Coaching Plans for Saudi Arabia</h2>
          <PricingSection country="Saudi Arabia" />
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Cerebrum is Cost-Effective for Saudi Arabia Students</h2>
          <CostComparisonSection />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join 1000+ Saudi Arabia Students Preparing for NEET
          </h2>
          <p className="text-lg mb-8 opacity-90">
            98% Success Rate • Expert Faculty • Timezone-Friendly • Community Support
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <SmartWhatsAppCTA
              text="Get Free Consultation Today"
              variant="secondary"
              className="text-base px-8 py-3"
            />
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-base px-8 py-3"
            >
              Call Us: +918826444334
            </Button>
          </div>
        </div>
      </section>

      {/* Related City Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold mb-8">Explore NEET Coaching in Other Countries</h3>
          <RelatedCityLinks currentCountry="Saudi Arabia" />
        </div>
      </section>

      {/* Contact Footer */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600">
                <a href="tel:+918826444334" className="text-blue-600 hover:underline">
                  +918826444334
                </a>
              </p>
              <p className="text-gray-600">
                <a href="https://cerebrumbiologyacademy.com" className="text-blue-600 hover:underline">
                  cerebrumbiologyacademy.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">Cerebrum Biology Academy</p>
              <p className="text-gray-600">India</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Available 24/7</h3>
              <SmartWhatsAppCTA
                text="WhatsApp Support"
                variant="default"
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
