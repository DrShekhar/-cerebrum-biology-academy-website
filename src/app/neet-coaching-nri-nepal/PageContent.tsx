"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import SmartWhatsAppCTA from "@/components/conversion/SmartWhatsAppCTA";
import { VideoTestimonialsSection } from "@/components/testimonials/VideoTestimonialsSection";
import { PricingSection } from "@/components/city/PricingSection";
import { CostComparisonSection } from "@/components/city/CostComparisonSection";
import { RelatedCityLinks } from "@/components/seo/RelatedCityLinks";

export default function PageContent() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const stats = [
    { label: "Success Rate", value: "98%", icon: "📊" },
    { label: "CBSE Schools", value: "15", icon: "🏫" },
    { label: "Indian Population", value: "Nepali students", icon: "👥" },
    { label: "Exam Centers", value: "2", icon: "📍" },
  ];

  const whyChoose = [
    {
      title: "Expert Faculty",
      description: "Highly qualified NEET biology experts with Nepal experience",
      icon: "👨‍🏫",
    },
    {
      title: "98% Success Rate",
      description: "Proven track record with Nepal NRI students",
      icon: "🎯",
    },
    {
      title: "NPT (UTC+5:45) Batches",
      description: "Classes scheduled for Nepal's timezone flexibility",
      icon: "⏰",
    },
    {
      title: "Personalized Mentoring",
      description: "Individual guidance from admission to exam day",
      icon: "🎓",
    },
    {
      title: "Community Support",
      description: "Connect with Nepal peers and alumni network",
      icon: "🤝",
    },
    {
      title: "Exam Center Support",
      description: "Help with registration at Kathmandu, Pokhara",
      icon: "📋",
    },
  ];

  const classTimings = [
    {
      level: "Class 11",
      timing: "Evening batch (IST-friendly)",
      days: "Mon-Fri, 6:00 PM - 8:30 PM NPT",
      focus: "Foundation building with Nepal curriculum bridge",
    },
    {
      level: "Class 12",
      timing: "Intensive batch",
      days: "Mon-Sat, 4:00 PM - 7:00 PM NPT",
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
      days: "10:00 AM - 2:00 PM NPT",
      focus: "Concept clarity and doubt resolution",
    },
  ];

  const faqs = [
    {
      id: "faq-1",
      question: "Is NEET preparation necessary for Nepal students?",
      answer: "Yes, NEET is the mandatory entrance exam for admission to medical colleges in India. Our specialized coaching helps Nepal students master the NEET curriculum while balancing work, studies, and timezone differences. We have proven success with Nepal NRI students."
    },
    {
      id: "faq-2",
      question: "What is your success rate for Nepal students?",
      answer: "We maintain a 98% success rate across all students including Nepal NRI students. Many of our Nepal students secure admissions in top AIIMS and medical colleges across India."
    },
    {
      id: "faq-3",
      question: "Do you offer online and offline coaching?",
      answer: "Yes! We offer online, offline, and hybrid batches. Nepal students can choose based on their convenience with timings suited to NPT (UTC+5:45)."
    },
    {
      id: "faq-4",
      question: "Can Nepal students take NEET exam in Nepal?",
      answer: "NEET exam centers are available in Kathmandu, Pokhara. We provide complete guidance for exam registration, admit card collection, and exam day logistics."
    },
    {
      id: "faq-5",
      question: "What about visa and sponsorship support?",
      answer: "NEET exam registration and medical education in India support We provide counseling to ensure smooth transition to medical education in India."
    },
    {
      id: "faq-6",
      question: "How do you bridge Nepal's curriculum with NEET?",
      answer: "Our expert faculty understands Nepal's education system and CBSE requirements. We customize batches to bridge the gap, ensuring Nepal students excel in NEET while leveraging their existing knowledge."
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
                NEET Coaching for Nepal
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                98% Success Rate • 15 CBSE Schools • Nepali students Indians
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Nepal's medical education system relies heavily on NEET. We specialize in bridging the Nepali Class 11-12 curriculum with NEET requirements, helping Nepali students successfully transition to medical education. Many of our students secure admissions in top Indian medical colleges.
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
            <div className="relative h-96">
              <Image
                src="/images/neet-coaching-nepal.jpg"
                alt="NEET Coaching in Nepal"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
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
          <h2 className="text-3xl font-bold text-center mb-6">Cities We Serve in Nepal</h2>
          <p className="text-center text-gray-600 mb-12">
            Serving 15 CBSE schools across Kathmandu, Pokhara, Lalitpur, Bhaktapur
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {config['cities'].map((city) => (
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
            Join 1000+ Nepal students who achieved their medical dreams with us
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
          <h2 className="text-3xl font-bold text-center mb-12">Class Timings for Nepal</h2>
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
          <h2 className="text-3xl font-bold text-center mb-12">Nepal to NEET Bridge</h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our specialized curriculum bridges Nepal's education system with NEET requirements. 
              With 15 CBSE schools in Kathmandu, Pokhara, Lalitpur, Bhaktapur, we have deep expertise in:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span className="text-gray-700">Converting Nepal curriculum to NEET format</span>
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
          <h2 className="text-3xl font-bold text-center mb-4">Success Stories from Nepal</h2>
          <p className="text-center text-gray-600 mb-12">
            Watch how our Nepal students achieved their medical dreams
          </p>
          <VideoTestimonialsSection country="Nepal" />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">NEET Coaching Plans for Nepal</h2>
          <PricingSection country="Nepal" />
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Cerebrum is Cost-Effective for Nepal Students</h2>
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
            Join 1000+ Nepal Students Preparing for NEET
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
          <RelatedCityLinks currentCountry="Nepal" />
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
