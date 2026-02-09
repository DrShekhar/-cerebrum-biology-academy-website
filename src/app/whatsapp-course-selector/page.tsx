'use client';

import { useState, useEffect, FormEvent } from 'react';

/* ── Brand Tokens ── */
const C = {
  purple: '#6B5DC6',
  indigo: '#6366F1',
  blue: '#0066FF',
  green: '#10B981',
  gold: '#F59E0B',
  dark: '#272838',
  g800: '#1F2937',
  g600: '#4B5563',
  g400: '#9CA3AF',
  g200: '#E5E7EB',
  g100: '#F3F4F6',
  g50: '#F9FAFB',
  paper: '#FAFAFA',
};

/* ── Types ── */
interface Pricing {
  tier: string;
  batch: string;
  fee: string;
  total?: string;
}
interface CourseOption {
  goal: string;
  tag: string;
  desc: string;
  pricing: Pricing[];
  color: string;
  features: string[];
}
interface ClassData {
  subtitle: string;
  icon: string;
  color: string;
  options: CourseOption[];
}

/* ── Course Data ── */
const COURSES: Record<string, ClassData> = {
  'Class 9': {
    subtitle: 'Foundation Program',
    icon: '🌱',
    color: C.green,
    options: [
      {
        goal: 'Board / Academic Only',
        tag: 'Biology',
        desc: 'Build a strong Biology foundation early. Board-focused preparation with NCERT deep learning.',
        pricing: [
          { tier: 'Ascent', batch: '12–16 Students', fee: '₹60,000/yr' },
          { tier: 'Pinnacle', batch: 'Max 12 Students', fee: '₹68,000/yr' },
        ],
        color: C.purple,
        features: [
          'Classroom teaching by Dr. Shekhar (AIIMS alumnus)',
          'Complete Biology syllabus as per board curriculum',
          'Strong foundation building for NEET from early years',
          'Conceptual clarity with real-life examples & clinical insights',
          'Weekly tests and chapter-wise assessments',
          'Custom printed notes, worksheets & practice papers',
          'Recorded video lectures for revision',
          'Doubt resolution: in-person + WhatsApp support',
          'All boards: CBSE, ICSE, IB, IGCSE supported',
        ],
      },
      {
        goal: 'Board + NEET Foundation',
        tag: 'Recommended',
        desc: 'Board prep + early NEET foundation. MCQ thinking, competitive concepts & NCERT mastery from Day 1.',
        pricing: [
          { tier: 'Ascent', batch: '12–16 Students', fee: '₹76,000/yr' },
          { tier: 'Pinnacle', batch: 'Max 12 Students', fee: '₹98,000/yr' },
        ],
        color: C.blue,
        features: [
          'Everything in Board/Academic, PLUS:',
          'Early NEET foundation: MCQ-based thinking from Class 9',
          'Introduction to NEET-pattern questions alongside board prep',
          'Competitive Biology concepts introduced progressively',
          'NCERT-based deep learning (backbone of NEET)',
          'Mental aptitude and exam temperament building',
          'Smooth transition pathway to Class 11 NEET batch',
        ],
      },
      {
        goal: 'NEET PCB Foundation',
        tag: 'Complete Package',
        desc: 'Full PCB foundation — Biology by AIIMS doctor + expert Physics & Chemistry. Ultimate head start.',
        pricing: [
          { tier: 'Ascent PCB', batch: '12–16 (Bio) | Focused (P&C)', fee: '₹2,28,000/yr' },
          { tier: 'Pinnacle PCB', batch: 'Max 12 (Bio) | Small (P&C)', fee: '₹2,94,000/yr' },
        ],
        color: C.indigo,
        features: [
          'Biology by Dr. Shekhar (AIIMS) in signature small batches',
          'Expert Physics & Chemistry faculty for strong PCB foundation',
          'Complete board syllabus for all three subjects',
          'Early NEET foundation across Physics, Chemistry, Biology',
          'Printed notes, worksheets, practice papers for all subjects',
          'Subject-wise weekly tests and assessments',
          'Competitive thinking & MCQ approach introduced early',
          'Seamless transition to Class 11 NEET PCB batch',
          'PCB Fee = Biology Fee × 3',
        ],
      },
    ],
  },
  'Class 10': {
    subtitle: 'Foundation Program',
    icon: '📕',
    color: C.gold,
    options: [
      {
        goal: 'Board / Academic Only',
        tag: 'Biology',
        desc: 'Ace Class 10 Biology boards. Strong conceptual clarity with clinical insights from an AIIMS doctor.',
        pricing: [
          { tier: 'Ascent', batch: '12–16 Students', fee: '₹60,000/yr' },
          { tier: 'Pinnacle', batch: 'Max 12 Students', fee: '₹68,000/yr' },
        ],
        color: C.purple,
        features: [
          'Classroom teaching by Dr. Shekhar (AIIMS alumnus)',
          'Complete Biology syllabus as per board curriculum',
          'Strong foundation building for NEET from early years',
          'Conceptual clarity with real-life examples & clinical insights',
          'Weekly tests and chapter-wise assessments',
          'Custom printed notes, worksheets & practice papers',
          'Recorded video lectures for revision',
          'Doubt resolution: in-person + WhatsApp support',
          'All boards: CBSE, ICSE, IB, IGCSE supported',
        ],
      },
      {
        goal: 'Board + NEET Foundation',
        tag: 'Recommended',
        desc: 'Board mastery + NEET-readiness. Enter Class 11 already ahead of the competition.',
        pricing: [
          { tier: 'Ascent', batch: '12–16 Students', fee: '₹76,000/yr' },
          { tier: 'Pinnacle', batch: 'Max 12 Students', fee: '₹98,000/yr' },
        ],
        color: C.blue,
        features: [
          'Everything in Board/Academic, PLUS:',
          'Early NEET foundation: MCQ-based thinking from Class 10',
          'NEET-pattern questions alongside board prep',
          'Competitive Biology concepts introduced progressively',
          'NCERT-based deep learning (backbone of NEET)',
          'Mental aptitude and exam temperament building',
          'Smooth transition pathway to Class 11 NEET batch',
        ],
      },
      {
        goal: 'NEET PCB Foundation',
        tag: 'Complete Package',
        desc: 'Complete PCB foundation for board + NEET. Seamless transition to Class 11 NEET batch.',
        pricing: [
          { tier: 'Ascent PCB', batch: '12–16 (Bio) | Focused (P&C)', fee: '₹2,28,000/yr' },
          { tier: 'Pinnacle PCB', batch: 'Max 12 (Bio) | Small (P&C)', fee: '₹2,94,000/yr' },
        ],
        color: C.indigo,
        features: [
          'Biology by Dr. Shekhar (AIIMS) in signature small batches',
          'Expert Physics & Chemistry faculty for strong PCB foundation',
          'Complete board syllabus for all three subjects',
          'Early NEET foundation across Physics, Chemistry, Biology',
          'Printed notes, worksheets, practice papers for all subjects',
          'Subject-wise weekly tests and assessments',
          'Competitive thinking & MCQ approach introduced early',
          'Seamless transition to Class 11 NEET PCB batch',
          'PCB Fee = Biology Fee × 3',
        ],
      },
    ],
  },
  'Class 11': {
    subtitle: '2-Year Program',
    icon: '📘',
    color: C.blue,
    options: [
      {
        goal: 'Board / Academic Only',
        tag: 'Biology',
        desc: 'Score 95+ in Biology board exams. CBSE, ICSE, IB, IGCSE, A-Levels supported.',
        pricing: [
          { tier: 'Ascent', batch: '12–16 Students', fee: '₹60,000/yr', total: '₹1,20,000 (2yr)' },
          { tier: 'Pinnacle', batch: 'Max 12 Students', fee: '₹68,000/yr', total: '₹1,36,000 (2yr)' },
        ],
        color: C.purple,
        features: [
          '2-year program (Class 11 + 12 covered)',
          'Teaching by Dr. Shekhar (AIIMS alumnus)',
          'Complete Biology syllabus as per board curriculum',
          'Board exam preparation with subjective practice',
          'Weekly tests and chapter-wise assessments',
          'Custom printed notes, PYQ banks, worksheets',
          'Recorded video lectures for revision',
          'All boards: CBSE, ICSE, IB, IGCSE, A-Levels',
          'CUET Biology preparation included',
        ],
      },
      {
        goal: 'Board + NEET Biology',
        tag: 'Most Popular',
        desc: 'Dual-track: ace both Board exams & NEET Biology with parallel preparation over 2 years.',
        pricing: [
          { tier: 'Ascent', batch: '12–16 Students', fee: '₹76,000/yr', total: '₹1,52,000 (2yr)' },
          { tier: 'Pinnacle', batch: 'Max 12 Students', fee: '₹98,000/yr', total: '₹1,96,000 (2yr)' },
        ],
        color: C.blue,
        features: [
          '2-year comprehensive dual-track program',
          'Complete NEET Biology + Board syllabus',
          'Subjective answer writing & diagram-based board training',
          'Weekly NEET MCQ tests + board-pattern mock exams',
          'NEET PYQ analysis (2015–2025) chapter-wise',
          'Multiple revision cycles for boards + NEET',
          'CUET preparation included',
          'Personal mentorship with Dr. Shekhar (AIIMS)',
          'Detailed OMR-based performance analytics',
        ],
      },
      {
        goal: 'NEET PCB (Physics + Chemistry + Biology)',
        tag: 'Complete Package',
        desc: 'Full NEET solution — Biology by AIIMS doctor + expert Physics & Chemistry faculty.',
        pricing: [
          { tier: 'Ascent PCB', batch: '12–16 (Bio) | Focused (P&C)', fee: '₹2,28,000/yr', total: '₹4,56,000 (2yr)' },
          { tier: 'Pinnacle PCB', batch: 'Max 12 (Bio) | Small (P&C)', fee: '₹2,94,000/yr', total: '₹5,88,000 (2yr)' },
        ],
        color: C.indigo,
        features: [
          'Biology by Dr. Shekhar (AIIMS) + expert PCB faculty',
          'Complete PCB: NEET competitive + Board exams',
          'Printed notes, PYQ banks, worksheets for all 3 subjects',
          'Subject-wise weekly tests + full-length NEET mocks',
          'Board preparation: subjective practice in all subjects',
          'CUET preparation included',
          'Monthly parent-teacher meetings',
          'PCB Fee = Biology Fee × 3',
        ],
      },
    ],
  },
  'Class 12': {
    subtitle: '1-Year Program',
    icon: '📗',
    color: C.purple,
    options: [
      {
        goal: 'Board / Academic Only',
        tag: 'Boards Special',
        desc: 'Focused board prep for 95+ in Biology. All boards supported. CUET included.',
        pricing: [
          { tier: 'Ascent', batch: '12–16 Students', fee: '₹60,000' },
          { tier: 'Pinnacle', batch: 'Max 12 Students', fee: '₹68,000' },
        ],
        color: C.purple,
        features: [
          'Complete Board Biology syllabus (all boards)',
          'Subjective answer writing: long, short, diagram-based',
          'Chapter-wise board-pattern tests & sample papers',
          'Diagram mastery sessions',
          'Custom printed notes optimised for boards',
          'CUET Biology preparation included',
          'Pre-board mock exams with detailed feedback',
          'Recorded video classes for revision',
          'Upgrade to Board+NEET anytime',
        ],
      },
      {
        goal: 'Board + NEET Biology',
        tag: 'Most Popular',
        desc: 'Board exams in Feb + NEET in May — walk into both fully prepared.',
        pricing: [
          { tier: 'Ascent', batch: '12–16 Students', fee: '₹76,000' },
          { tier: 'Pinnacle', batch: 'Max 12 Students', fee: '₹98,000' },
          { tier: '12th+11th Combo', batch: 'Both years in 1 year', fee: '₹1,56,000' },
        ],
        color: C.blue,
        features: [
          'Complete NEET Biology + Board syllabus',
          'NEET MCQ training with PYQ analysis & strategy',
          'Board-pattern subjective tests & answer training',
          'Multiple revision cycles: boards Feb + NEET May',
          'CUET preparation included',
          '12th+11th Combo: full 2-year syllabus in 1 year',
          'Detailed OMR-based performance analytics',
          'Personal mentorship with Dr. Shekhar (AIIMS)',
        ],
      },
      {
        goal: 'NEET PCB (Physics + Chemistry + Biology)',
        tag: 'Complete Package',
        desc: 'Complete PCB coaching with Biology at the centre. Board + NEET for all 3 subjects.',
        pricing: [
          { tier: 'Ascent PCB', batch: '12–16 (Bio) | Focused (P&C)', fee: '₹2,28,000' },
          { tier: 'Pinnacle PCB', batch: 'Max 12 (Bio) | Small (P&C)', fee: '₹2,94,000' },
        ],
        color: C.indigo,
        features: [
          'Biology by Dr. Shekhar (AIIMS) + expert PCB faculty',
          'Complete PCB: NEET competitive + Board exams',
          'Subject-wise weekly tests + full-length NEET mocks',
          'Board preparation in all subjects',
          'CUET preparation included',
          'Monthly parent-teacher meetings',
          'PCB Fee = Biology Fee × 3',
        ],
      },
    ],
  },
  Dropper: {
    subtitle: '1-Year Intensive',
    icon: '🎯',
    color: C.indigo,
    options: [
      {
        goal: 'NEET Biology Intensive',
        tag: 'Biology Focus',
        desc: 'Rebuild Biology from scratch. Weakness analysis, PYQ mastery, strategic mock tests.',
        pricing: [
          { tier: 'Ascent', batch: '12–16 Students', fee: '₹76,000' },
          { tier: 'Pinnacle', batch: 'Max 12 Students', fee: '₹98,000' },
        ],
        color: C.purple,
        features: [
          'Dropper-exclusive batch',
          'Complete Class 11+12 Biology revision from scratch',
          'Weakness analysis based on previous NEET score',
          'Intensive PYQ solving: 2015–2025 chapter-wise',
          'Weekly full-length NEET Biology mock tests',
          'Personalised study plan tailored to your gaps',
          'Strategy sessions: time management, exam temperament',
          'Motivational & psychological support',
        ],
      },
      {
        goal: 'Complete NEET Biology',
        tag: 'Most Popular',
        desc: '4-phase system: Foundation → Building → Practice → Revision. Target 650+.',
        pricing: [
          { tier: 'Ascent', batch: '12–16 Students', fee: '₹76,000' },
          { tier: 'Pinnacle', batch: 'Max 12 Students', fee: '₹98,000' },
        ],
        color: C.blue,
        features: [
          '4-phase: Foundation → Building → Practice → Revision',
          'Dropper-exclusive batch with competitive peer group',
          'Full Class 11+12 Biology: deep revision from basics',
          '5000+ MCQ practice bank: topic-wise & full-length',
          'PYQ analysis: every NEET question (2015–2025) decoded',
          'Weekly full mock tests simulating real NEET',
          'Personalised weakness report after every test',
          'Direct mentorship with Dr. Shekhar (AIIMS)',
        ],
      },
      {
        goal: 'NEET PCB Intensive',
        tag: 'Complete Package',
        desc: 'Full PCB overhaul — Biology by AIIMS doctor + expert Physics & Chemistry faculty.',
        pricing: [
          { tier: 'Ascent PCB', batch: '12–16 (Bio) | Focused (P&C)', fee: '₹2,28,000' },
          { tier: 'Pinnacle PCB', batch: 'Max 12 (Bio) | Small (P&C)', fee: '₹2,94,000' },
        ],
        color: C.indigo,
        features: [
          'Biology by Dr. Shekhar (AIIMS) in dropper-exclusive batch',
          'Expert Physics & Chemistry NEET-specialist faculty',
          'Full Class 11+12 PCB revision from scratch',
          '4-phase approach across all subjects',
          'Subject-wise weekly tests + full-length NEET mocks',
          '5000+ MCQ bank per subject',
          'PYQ chapter-wise analysis for all subjects',
          'Daily doubt clearing, mentorship & strategy',
          'PCB Fee = Biology Fee × 3',
        ],
      },
    ],
  },
};

const ADDONS = [
  { name: 'Test Series', fee: '₹12,000', icon: '📝', desc: 'Full NEET-pattern test series with OMR, analysis, ranking & error tracking' },
  { name: '1-on-1 Mentorship', fee: '₹1,50,000', icon: '🧑‍🏫', desc: 'Personal mentorship with Dr. Shekhar (AIIMS). Custom study plan, weekly reviews' },
  { name: 'SGP', fee: 'Discuss with us', icon: '⭐', desc: 'Special Guidance Programme — exclusive intensive, limited seats' },
];

const CENTRES = [
  { name: 'Rohini', loc: 'Delhi', type: 'offline' },
  { name: 'Gurugram', loc: 'Haryana', type: 'offline' },
  { name: 'South Delhi', loc: 'Delhi', type: 'offline' },
  { name: 'Online Live', loc: 'Pan-India & Global', type: 'online' },
];

const STATS = [
  { num: '695/720', label: 'NEET 2023 Topper' },
  { num: 'AIR 448', label: 'Sadhna Sirin' },
  { num: '100%ile', label: 'Biology Score' },
  { num: '10,000+', label: 'Students Mentored' },
  { num: '15+ Yrs', label: 'Teaching Excellence' },
];

/* ── Helper ── */
const rgba = (hex: string, a: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};

const WA_BASE = 'https://wa.me/918826444334';

/* ── Component ── */
export default function WhatsAppCourseSelector() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);

  /* Lead capture */
  const [showModal, setShowModal] = useState(false);
  const [pendingCard, setPendingCard] = useState<{ key: string; idx: number } | null>(null);
  const [userRegistered, setUserRegistered] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCity, setLeadCity] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserRegistered(!!localStorage.getItem('cerebrum_user'));
    }
  }, []);

  const classKeys = Object.keys(COURSES);

  /* ── Card toggle with lead gate ── */
  function toggleCard(key: string, idx: number) {
    if (expandedCard === key) {
      setExpandedCard(null);
      return;
    }
    if (!userRegistered) {
      setPendingCard({ key, idx });
      setShowModal(true);
      return;
    }
    setExpandedCard(key);
    trackView(selectedClass!, COURSES[selectedClass!].options[idx].goal);
  }

  function trackView(cls: string, course: string) {
    try {
      const views = JSON.parse(localStorage.getItem('cerebrum_views') || '[]');
      views.push({ class: cls, course, timestamp: new Date().toISOString() });
      localStorage.setItem('cerebrum_views', JSON.stringify(views));
    } catch {}
  }

  function handleLeadSubmit(e: FormEvent) {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim() || !selectedClass || !pendingCard) return;

    const opt = COURSES[selectedClass].options[pendingCard.idx];
    const lead = {
      name: leadName.trim(),
      phone: leadPhone.trim(),
      city: leadCity.trim(),
      class: selectedClass,
      course: opt.goal,
      timestamp: new Date().toISOString(),
      source: 'whatsapp-course-selector',
    };

    /* Save lead locally */
    try {
      const leads = JSON.parse(localStorage.getItem('cerebrum_leads') || '[]');
      leads.push(lead);
      localStorage.setItem('cerebrum_leads', JSON.stringify(leads));
      localStorage.setItem('cerebrum_user', JSON.stringify({ name: leadName, phone: leadPhone, city: leadCity }));
    } catch {}

    /* WhatsApp notification to academy */
    const waMsg = encodeURIComponent(
      `🔔 NEW LEAD — Course Selector\n\n👤 ${lead.name}\n📞 ${lead.phone}\n🏙️ ${lead.city || 'Not specified'}\n📚 ${lead.class}\n🎯 ${lead.course}\n⏰ ${new Date().toLocaleString('en-IN')}`
    );
    window.open(`${WA_BASE}?text=${waMsg}`, '_blank');

    /* Unlock */
    setUserRegistered(true);
    setShowModal(false);
    setExpandedCard(pendingCard.key);
    setPendingCard(null);
  }

  function handleSkip() {
    try { localStorage.setItem('cerebrum_user', 'skipped'); } catch {}
    setUserRegistered(true);
    setShowModal(false);
    if (pendingCard && selectedClass) {
      setExpandedCard(pendingCard.key);
      trackView(selectedClass, COURSES[selectedClass].options[pendingCard.idx].goal);
      setPendingCard(null);
    }
  }

  /* ── Styles (inline for portability) ── */
  const sty = {
    page: { minHeight: '100vh', background: C.paper, fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: C.dark } as React.CSSProperties,
    brandStrip: { height: 4, background: `linear-gradient(90deg, ${C.purple}, ${C.indigo}, ${C.blue}, ${C.green})` } as React.CSSProperties,
    header: { textAlign: 'center' as const, padding: '24px 16px 12px', background: '#fff', borderBottom: `1px solid ${C.g200}` },
    tag: { display: 'inline-block', padding: '4px 12px', borderRadius: 6, background: rgba(C.indigo, 0.08), fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, color: C.indigo, marginBottom: 8 },
    resultsStrip: { background: C.indigo, padding: '12px 16px', display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'center', gap: 12 },
    classWrap: { display: 'flex', justifyContent: 'center', gap: 8, padding: '14px 12px', flexWrap: 'wrap' as const, background: '#fff', borderBottom: `1px solid ${C.g200}` },
    grid: { maxWidth: 860, margin: '0 auto', padding: '16px 14px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14 } as React.CSSProperties,
    bottomCta: { textAlign: 'center' as const, padding: '24px 20px 20px', background: '#fff', borderTop: `1px solid ${C.g200}`, marginTop: 8 },
    footer: { background: C.dark, padding: '14px 20px', textAlign: 'center' as const },
    overlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(4px)' },
    modal: { background: '#fff', borderRadius: 12, padding: '28px 24px', maxWidth: 380, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
  };

  return (
    <div style={sty.page}>
      <div style={sty.brandStrip} />

      {/* Header */}
      <div style={sty.header}>
        <div style={sty.tag}>An AIIMSonian&apos;s Initiative</div>
        <h1 style={{ fontSize: 'clamp(22px, 5vw, 32px)', fontWeight: 800, color: C.dark, lineHeight: 1.1, margin: 0 }}>
          Cerebrum Academy
        </h1>
        <h2 style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 600, color: C.purple, margin: '2px 0 0' }}>
          Course Selector
        </h2>
        <p style={{ fontSize: 12, color: C.g600, maxWidth: 380, margin: '4px auto 0' }}>
          Select your class → choose your goal → view complete details
        </p>
      </div>

      {/* Results strip */}
      <div style={sty.resultsStrip}>
        {STATS.map((s, i) => (
          <div key={i} style={{ textAlign: 'center', minWidth: 80 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{s.num}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.75)', marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Class buttons */}
      <div style={sty.classWrap}>
        {classKeys.map((cls) => {
          const d = COURSES[cls];
          const active = selectedClass === cls;
          const hov = hoveredClass === cls;
          return (
            <button
              key={cls}
              onClick={() => { setSelectedClass(active ? null : cls); setExpandedCard(null); }}
              onMouseEnter={() => setHoveredClass(cls)}
              onMouseLeave={() => setHoveredClass(null)}
              style={{
                padding: '10px 16px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, transition: 'all 0.25s',
                border: `2px solid ${active ? d.color : hov ? d.color : C.g200}`,
                background: active ? d.color : '#fff',
                color: active ? '#fff' : hov ? d.color : C.g600,
                boxShadow: active ? `0 3px 12px ${rgba(d.color, 0.3)}` : '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <span style={{ fontSize: 18 }}>{d.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ lineHeight: 1.2 }}>{cls}</div>
                <div style={{ fontSize: 9, fontWeight: 500, opacity: 0.75 }}>{d.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Course cards */}
      {selectedClass && (
        <div style={sty.grid}>
          {COURSES[selectedClass].options.map((opt, i) => {
            const key = `${selectedClass}-${i}`;
            const isExp = expandedCard === key;
            const isHov = hoveredCard === key;
            return (
              <div
                key={i}
                onClick={() => toggleCard(key, i)}
                onMouseEnter={() => setHoveredCard(key)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderRadius: 10, background: '#fff', padding: '20px 16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.25s',
                  border: `1.5px solid ${isExp ? opt.color : isHov ? rgba(opt.color, 0.5) : C.g200}`,
                  transform: isHov && !isExp ? 'translateY(-2px)' : 'none',
                  boxShadow: isExp ? `0 4px 20px ${rgba(opt.color, 0.12)}` : isHov ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ height: 3, borderRadius: 4, background: opt.color, marginBottom: 12, width: 40 }} />
                <span style={{ alignSelf: 'flex-start', padding: '3px 10px', borderRadius: 4, background: rgba(opt.color, 0.1), color: opt.color, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>
                  {opt.tag}
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.3 }}>{opt.goal}</h3>
                <p style={{ fontSize: 12, color: C.g600, lineHeight: 1.5, margin: '0 0 14px' }}>{opt.desc}</p>

                {/* Pricing */}
                <div style={{ borderTop: `1px solid ${C.g100}`, paddingTop: 10, marginBottom: 6 }}>
                  {opt.pricing.map((p, j) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                      <div>
                        <span style={{ fontSize: 11, color: C.g600, fontWeight: 600 }}>{p.tier}</span>
                        {!isExp && <span style={{ fontSize: 9, color: C.g400, marginLeft: 5 }}>{p.batch}</span>}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: opt.color }}>{p.fee}</span>
                        {p.total && <div style={{ fontSize: 9, color: C.g400 }}>{p.total}</div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center', padding: '6px 0 0', fontSize: 11, color: opt.color, fontWeight: 600 }}>
                  {isExp ? '▾ Hide Details' : '▸ View Full Details'}
                </div>

                {/* Expanded details */}
                {isExp && (
                  <div style={{ marginTop: 14 }} onClick={(e) => e.stopPropagation()}>
                    {/* Batch */}
                    <Section title="Batch Details" color={opt.color}>
                      {opt.pricing.map((p, j) => (
                        <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: 11.5 }}>
                          <span style={{ color: C.dark, fontWeight: 600 }}>{p.tier}</span>
                          <span style={{ color: C.g600 }}>{p.batch}</span>
                        </div>
                      ))}
                    </Section>

                    {/* Features */}
                    <Section title="What's Included" color={opt.color}>
                      {opt.features.map((f, k) => (
                        <div key={k} style={{ fontSize: 11.5, color: C.g800, lineHeight: 1.55, padding: '2.5px 0', display: 'flex', gap: 6 }}>
                          <span style={{ color: opt.color, flexShrink: 0, fontWeight: 700 }}>✓</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </Section>

                    {/* Centres */}
                    <Section title="Available Modes & Centres" color={C.blue}>
                      {CENTRES.map((c, k) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 11.5 }}>
                          <span style={{ color: C.dark }}>{c.type === 'online' ? '💻' : '📍'} {c.name}</span>
                          <span style={{ color: C.g600, fontSize: 10.5 }}>{c.loc}</span>
                        </div>
                      ))}
                      <div style={{ fontSize: 9.5, color: C.g400, marginTop: 5, fontStyle: 'italic' }}>Same curriculum, same faculty, same results — regardless of mode.</div>
                    </Section>

                    {/* Add-ons */}
                    <Section title="Add-On Services" color={C.gold}>
                      {ADDONS.map((a, k) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderTop: k > 0 ? `1px solid ${C.g100}` : 'none' }}>
                          <div>
                            <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark }}>{a.icon} {a.name}</span>
                            <div style={{ fontSize: 9.5, color: C.g600, marginTop: 1 }}>{a.desc}</div>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: C.purple, whiteSpace: 'nowrap', marginLeft: 8 }}>{a.fee}</span>
                        </div>
                      ))}
                    </Section>

                    <div style={{ fontSize: 9.5, color: C.g400, padding: '4px 0 8px', lineHeight: 1.4 }}>
                      Payment: 1st instalment on Day 1 after demo, 2nd on Day 45, 3rd on Day 61. GST extra. Scholarship via Cerebrum Aptitude Test (CAT).
                    </div>

                    {/* WhatsApp CTA */}
                    <a
                      href={`${WA_BASE}?text=${encodeURIComponent(`Hi, I'm interested in ${selectedClass} — ${opt.goal} at Cerebrum Academy. Please share more details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, borderRadius: 8,
                        background: C.green, color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none',
                        boxShadow: `0 3px 10px ${rgba(C.green, 0.3)}`,
                      }}
                    >
                      💬 Enquire on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom CTA */}
      <div style={sty.bottomCta}>
        <a
          href={`${WA_BASE}?text=${encodeURIComponent("Hi, I'm interested in Cerebrum Academy courses. Please share more details.")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 8,
            background: C.blue, color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none',
            boxShadow: `0 3px 12px ${rgba(C.blue, 0.3)}`,
          }}
        >
          💬 Book FREE Demo Class
        </a>
        <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: C.dark }}>📞 +91 88264 44334</div>
        <div style={{ marginTop: 4, fontSize: 10, color: C.g400 }}>CBSE • ICSE • IB • IGCSE • A-Levels</div>
      </div>

      {/* Footer */}
      <div style={sty.footer}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Cerebrum Biology Academy</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Rohini • Gurugram • South Delhi • Online | www.cerebrumbiologyacademy.com</div>
      </div>

      {/* Lead Modal */}
      {showModal && selectedClass && pendingCard && (
        <div style={sty.overlay}>
          <div style={sty.modal}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.dark, margin: '0 0 4px' }}>📋 Get Full Course Details</h3>
            <p style={{ fontSize: 12, color: C.g600, marginBottom: 12, lineHeight: 1.4 }}>
              Share your details to explore the complete program, fee structure, and book a FREE demo class.
            </p>
            <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, marginBottom: 14, background: rgba(COURSES[selectedClass].options[pendingCard.idx].color, 0.1), color: COURSES[selectedClass].options[pendingCard.idx].color }}>
              {selectedClass} — {COURSES[selectedClass].options[pendingCard.idx].goal}
            </div>
            <form onSubmit={handleLeadSubmit}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: C.g600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Student&apos;s Name</label>
              <input value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="Enter name" required
                style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${C.g200}`, borderRadius: 6, fontSize: 14, fontFamily: 'inherit', marginBottom: 12, outline: 'none' }} />
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: C.g600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>WhatsApp / Phone Number</label>
              <input value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} placeholder="+91 98XXX XXXXX" required type="tel"
                style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${C.g200}`, borderRadius: 6, fontSize: 14, fontFamily: 'inherit', marginBottom: 12, outline: 'none' }} />
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: C.g600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>City</label>
              <input value={leadCity} onChange={(e) => setLeadCity(e.target.value)} placeholder="e.g. Delhi, Gurugram, Mumbai"
                style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${C.g200}`, borderRadius: 6, fontSize: 14, fontFamily: 'inherit', marginBottom: 14, outline: 'none' }} />
              <button type="submit"
                style={{ width: '100%', padding: 12, border: 'none', borderRadius: 8, background: C.blue, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                View Full Details →
              </button>
            </form>
            <span onClick={handleSkip} style={{ display: 'block', textAlign: 'center', marginTop: 10, fontSize: 11, color: C.g400, cursor: 'pointer', textDecoration: 'underline' }}>
              Skip for now
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Section wrapper ── */
function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ background: C.g50, borderRadius: 8, padding: 12, marginBottom: 10, border: `1px solid ${C.g100}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{title}</div>
      {children}
    </div>
  );
}
