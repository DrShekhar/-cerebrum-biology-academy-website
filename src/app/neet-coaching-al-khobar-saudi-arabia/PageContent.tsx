import { Suspense } from 'react';
import SmartWhatsAppCTA from '@/components/conversion/SmartWhatsAppCTA';
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection';
import LocalitySchema from '@/components/seo/LocalitySchema';
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks';
import { PricingSection } from '@/components/city/PricingSection';
import { CostComparisonSection } from '@/components/city/CostComparisonSection';

export default function PageContent() {
  const cityData = {
    name: 'Al Khobar',
    country: 'Saudi Arabia',
    slug: 'neet-coaching-al-khobar-saudi-arabia',
    coordinates: {
      latitude: 26.2172,
      longitude: 50.1971,
    },
    timezone: 'AST (UTC+3)',
    community: '15+ CBSE schools, ARAMCO families',
  };

  const faqs = [
    {
      question: 'Why choose Cerebrum Biology Academy for NEET coaching in Al Khobar, Saudi Arabia?',
      answer: 'Cerebrum Biology Academy offers a 98% success rate with personalized coaching tailored to the Saudi Arabia educational context. Our expert faculty, led by Dr. Shekhar C Singh, uses evidence-based teaching methods proven to maximize student performance.',
    },
    {
      question: 'What is the course duration for NEET preparation in Al Khobar?',
      answer: 'Our comprehensive NEET coaching program is designed for flexibility. We offer both intensive 12-month programs and accelerated 6-month tracks, depending on your current level and target timeline.',
    },
    {
      question: 'Are there Saudi Arabia board-specific coaching modules?',
      answer: 'Yes, we provide curriculum customization for Saudi Arabia boards while maintaining NEET alignment. Our biology-focused approach ensures mastery of all concepts required for top scores.',
    },
    {
      question: 'What support do students from Al Khobar receive during the coaching?',
      answer: 'Beyond classroom instruction, students get 1-on-1 mentoring, doubt-clearing sessions, mock tests, and personalized study schedules. We also provide nutrition and stress management guidance.',
    },
    {
      question: 'How affordable is NEET coaching in Al Khobar?',
      answer: 'Our pricing is competitive and transparent with no hidden charges. We offer flexible payment plans and scholarships for merit students. Contact us for customized packages.',
    },
    {
      question: "Can I join from Al Khobar if I'm still in Grade 10 or 11?",
      answer: 'Absolutely! Early-bird enrollment gives students a significant advantage. We offer foundational courses for Grade 10-11 students to build strong fundamentals before intensive NEET prep.',
    },
  ];

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>NEET Coaching in Al Khobar, Saudi Arabia</h1>
          <p className="lead">
            Al Khobar, a major hub in Saudi Arabia's Eastern Province, is home to numerous international schools serving ARAMCO families and business professionals. Cerebrum Biology Academy brings expert NEET coaching to Al Khobar with a proven 98% success rate and personalized learning paths.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>Community Size</h3>
              <p>15+ CBSE schools, ARAMCO families</p>
            </div>
            <div className="info-card">
              <h3>Timezone</h3>
              <p>AST (UTC+3)</p>
            </div>
            <div className="info-card">
              <h3>Key Schools</h3>
              <p>International Indian School Al Khobar, Al Khobar Academy, Al Ghad International School & more</p>
            </div>
          </div>

          <SmartWhatsAppCTA 
            ctaText="Get NEET Coaching Details"
            message="Hi! I'm interested in NEET coaching in Al Khobar, Saudi Arabia."
          />
        </div>
      </section>

      <section className="highlights-section">
        <div className="container">
          <h2>Why Al Khobar for NEET Coaching?</h2>
          <p>ARAMCO families, Dhahran/Dammam corridor, Eastern Province CBSE belt, business hub</p>
          <ul>
              <li>International Indian School Al Khobar</li>
              <li>Al Khobar Academy</li>
              <li>Al Ghad International School</li>
              <li>Eastern Province Schools Network</li>
          </ul>
        </div>
      </section>

      <Suspense fallback={<div>Loading testimonials...</div>}>
        <VideoTestimonialsSection city="Al Khobar" country="Saudi Arabia" />
      </Suspense>

      <section className="faq-section">
        <div className="container">
          <h2>FAQs About NEET Coaching in Al Khobar</h2>
          <div className="faq-items">
            {faqs.map((faq, idx) => (
              <details key={idx} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SmartWhatsAppCTA 
        ctaText="Schedule Your Free Counseling"
        message="I'd like to schedule a free NEET counseling session. I'm from Al Khobar, Saudi Arabia."
      />

      <Suspense fallback={<div>Loading pricing...</div>}>
        <PricingSection city="Al Khobar" />
      </Suspense>

      <Suspense fallback={<div>Loading cost comparison...</div>}>
        <CostComparisonSection city="Al Khobar" />
      </Suspense>

      <section className="cta-final">
        <div className="container">
          <h2>Start Your NEET Success Journey in Al Khobar</h2>
          <p>Dr. Shekhar C Singh and the Cerebrum Biology Academy team are ready to guide you to NEET success.</p>
          
          <SmartWhatsAppCTA 
            ctaText="Connect on WhatsApp Now"
            message="Hi Dr. Shekhar! I want to enroll in NEET coaching. I'm based in Al Khobar, Saudi Arabia."
          />
        </div>
      </section>

      <Suspense fallback={<div>Loading related cities...</div>}>
        <RelatedCityLinks currentCity="Al Khobar" />
      </Suspense>

      <LocalitySchema 
        city="Al Khobar"
        country="Saudi Arabia"
        coordinates={{
          latitude: 26.2172,
          longitude: 50.1971,
        }}
      />
    </main>
  );
}
