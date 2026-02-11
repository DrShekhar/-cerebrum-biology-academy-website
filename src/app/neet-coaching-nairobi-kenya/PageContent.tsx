import { Suspense } from 'react';
import SmartWhatsAppCTA from '@/components/conversion/SmartWhatsAppCTA';
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection';
import LocalitySchema from '@/components/seo/LocalitySchema';
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks';
import { PricingSection } from '@/components/city/PricingSection';
import { CostComparisonSection } from '@/components/city/CostComparisonSection';

export default function PageContent() {
  const cityData = {
    name: 'Nairobi',
    country: 'Kenya',
    slug: 'neet-coaching-nairobi-kenya',
    coordinates: {
      latitude: -1.2921,
      longitude: 36.8219,
    },
    timezone: 'EAT (UTC+3)',
    community: '50K+ Indians, Largest Indian community in East Africa',
  };

  const faqs = [
    {
      question: 'Why choose Cerebrum Biology Academy for NEET coaching in Nairobi, Kenya?',
      answer: 'Cerebrum Biology Academy offers a 98% success rate with personalized coaching tailored to the Kenya educational context. Our expert faculty, led by Dr. Shekhar C Singh, uses evidence-based teaching methods proven to maximize student performance.',
    },
    {
      question: 'What is the course duration for NEET preparation in Nairobi?',
      answer: 'Our comprehensive NEET coaching program is designed for flexibility. We offer both intensive 12-month programs and accelerated 6-month tracks, depending on your current level and target timeline.',
    },
    {
      question: 'Are there Kenya board-specific coaching modules?',
      answer: 'Yes, we provide curriculum customization for Kenya boards while maintaining NEET alignment. Our biology-focused approach ensures mastery of all concepts required for top scores.',
    },
    {
      question: 'What support do students from Nairobi receive during the coaching?',
      answer: 'Beyond classroom instruction, students get 1-on-1 mentoring, doubt-clearing sessions, mock tests, and personalized study schedules. We also provide nutrition and stress management guidance.',
    },
    {
      question: 'How affordable is NEET coaching in Nairobi?',
      answer: 'Our pricing is competitive and transparent with no hidden charges. We offer flexible payment plans and scholarships for merit students. Contact us for customized packages.',
    },
    {
      question: "Can I join from Nairobi if I'm still in Grade 10 or 11?",
      answer: 'Absolutely! Early-bird enrollment gives students a significant advantage. We offer foundational courses for Grade 10-11 students to build strong fundamentals before intensive NEET prep.',
    },
  ];

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>NEET Coaching in Nairobi, Kenya</h1>
          <p className="lead">
            Nairobi, Kenya's vibrant capital, hosts the largest Indian community in East Africa with over 50,000 residents, making it a major hub for NEET coaching. Cerebrum Biology Academy brings expert NEET coaching to Nairobi with a proven 98% success rate and personalized learning paths.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>Community Size</h3>
              <p>50K+ Indians, Largest Indian community in East Africa</p>
            </div>
            <div className="info-card">
              <h3>Timezone</h3>
              <p>EAT (UTC+3)</p>
            </div>
            <div className="info-card">
              <h3>Key Schools</h3>
              <p>Aga Khan Academy, Nairobi International School, British School of East Africa & more</p>
            </div>
          </div>

          <SmartWhatsAppCTA 
            ctaText="Get NEET Coaching Details"
            message="Hi! I'm interested in NEET coaching in Nairobi, Kenya."
          />
        </div>
      </section>

      <section className="highlights-section">
        <div className="container">
          <h2>Why Nairobi for NEET Coaching?</h2>
          <p>Aga Khan Academy focus, East African Indian heritage, cricket community ties, thriving business district</p>
          <ul>
              <li>Aga Khan Academy</li>
              <li>Nairobi International School</li>
              <li>British School of East Africa</li>
              <li>Nairobi School</li>
          </ul>
        </div>
      </section>

      <Suspense fallback={<div>Loading testimonials...</div>}>
        <VideoTestimonialsSection city="Nairobi" country="Kenya" />
      </Suspense>

      <section className="faq-section">
        <div className="container">
          <h2>FAQs About NEET Coaching in Nairobi</h2>
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
        message="I'd like to schedule a free NEET counseling session. I'm from Nairobi, Kenya."
      />

      <Suspense fallback={<div>Loading pricing...</div>}>
        <PricingSection city="Nairobi" />
      </Suspense>

      <Suspense fallback={<div>Loading cost comparison...</div>}>
        <CostComparisonSection city="Nairobi" />
      </Suspense>

      <section className="cta-final">
        <div className="container">
          <h2>Start Your NEET Success Journey in Nairobi</h2>
          <p>Dr. Shekhar C Singh and the Cerebrum Biology Academy team are ready to guide you to NEET success.</p>
          
          <SmartWhatsAppCTA 
            ctaText="Connect on WhatsApp Now"
            message="Hi Dr. Shekhar! I want to enroll in NEET coaching. I'm based in Nairobi, Kenya."
          />
        </div>
      </section>

      <Suspense fallback={<div>Loading related cities...</div>}>
        <RelatedCityLinks currentCity="Nairobi" />
      </Suspense>

      <LocalitySchema 
        city="Nairobi"
        country="Kenya"
        coordinates={{
          latitude: -1.2921,
          longitude: 36.8219,
        }}
      />
    </main>
  );
}
