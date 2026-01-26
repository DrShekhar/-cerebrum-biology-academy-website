/**
 * GitHub Spec Kit Configuration for Cerebrum Biology Academy
 *
 * Integrates spec-driven development with our Next.js 15.5.3 + TypeScript
 * education platform, enabling 40% faster development and 25% fewer bugs.
 */

module.exports = {
  // Project metadata
  project: {
    name: 'Cerebrum Biology Academy',
    version: '1.0.0',
    description: 'AI-powered Biology education platform for NEET preparation',
    repository: 'https://github.com/drshekhar/cerebrum-biology-academy-website',
    website: 'https://cerebrumbiologyacademy.com',
  },

  // Technology stack configuration
  techStack: {
    frontend: {
      framework: 'Next.js 15.5.3',
      language: 'TypeScript 5+',
      styling: 'Tailwind CSS 4',
      ui: 'Radix UI, Framer Motion',
      state: 'React 19.1.0 built-in state',
    },
    backend: {
      api: 'Next.js API Routes',
      database: 'PostgreSQL with Prisma ORM',
      auth: 'NextAuth.js 5.0',
      payments: 'Razorpay (Indian market)',
      communication: 'WhatsApp Business API',
    },
    ai: {
      primary: 'OpenAI GPT-4',
      sdk: '@anthropic-ai/sdk',
      mcp: '@modelcontextprotocol/sdk',
      agents: 'Claude Code compatible',
    },
    mobile: {
      framework: 'React Native with Expo',
      language: 'TypeScript',
      navigation: 'Expo Router',
    },
    deployment: {
      web: 'Vercel',
      mobile: 'App Store, Google Play Store',
      analytics: 'Google Analytics 4',
    },
  },

  // Education-specific requirements
  education: {
    curriculum: 'NEET Biology (720 marks total, 360 Biology)',
    targetStudents: '10,000+ enrolled students',
    successRate: '94.2% NEET qualification',
    markets: {
      primary: ['Kota', 'Delhi', 'Hyderabad', 'Bangalore', 'Mumbai', 'Pune'],
      international: ['US', 'UK', 'Canada', 'Australia', 'UAE', 'Singapore'],
    },
    languages: ['English', 'Hindi', 'Regional Indian languages'],
  },

  // Development workflow integration
  workflow: {
    aiAgent: 'claude',
    claudePromptAgent: './scripts/claude-prompt-agent.js',
    specCommands: {
      specify: '/specify - Create feature specifications',
      plan: '/plan - Generate implementation plans',
      tasks: '/tasks - Break down into actionable tasks',
    },
    integrations: {
      existing: [
        'claude:ai - AI integration prompts',
        'claude:payments - Payment processing workflows',
        'claude:whatsapp - WhatsApp automation',
        'claude:analytics - Analytics dashboard',
      ],
    },
  },

  // Revenue-driven development constraints
  revenue: {
    budgetTiers: {
      'Month 1-3': '₹50K tech budget → ₹2L revenue target',
      'Month 4-6': '₹1L tech budget → ₹5L revenue target',
      'Month 7-12': '₹2L-4L tech budget → ₹10L-20L revenue target',
      'Year 2': '₹7L-10L tech budget → ₹35L-50L revenue target',
    },
    kpis: {
      enrollmentConversion: '5-10% (vs industry 2-3%)',
      studentRetention: '90%+ (current 94.2%)',
      monthlyGrowth: '25-50%',
      cac: '<₹2000 per student',
      ltv: '₹75,000+ per student',
    },
  },

  // Quality gates and standards
  quality: {
    performance: {
      web: 'Core Web Vitals green, <3s load on 3G',
      mobile: '<2MB bundle, offline core features',
      seo: "Top 3 for 'Biology coaching [city]'",
      uptime: '99.9% during NEET prep months',
    },
    testing: {
      coverage: '80%+ payments, 100% AI responses',
      tdd: 'Required for student-facing features',
      integration: 'Payment flows, AI accuracy, WhatsApp',
    },
    security: {
      payments: 'Razorpay compliance',
      data: 'Student data protection (GDPR/local)',
      api: 'Rate limiting, input validation',
    },
  },

  // Spec Kit specific settings
  specKit: {
    templateDir: './.specify/templates',
    outputDir: './specs',
    memoryDir: './.specify/memory',
    scriptsDir: './.specify/scripts',
    constitution: './.specify/memory/constitution.md',

    // AI education feature templates
    featureTypes: {
      'ai-chatbot': '24/7 Biology doubt resolution',
      'personalized-learning': 'Adaptive learning paths',
      'progress-tracking': 'Student performance analytics',
      'payment-system': 'Enrollment and fee management',
      communication: 'WhatsApp and email automation',
      'mobile-app': 'React Native student app',
    },

    // Integration with existing scripts
    hooks: {
      preSpec: 'npm run type-check',
      postSpec: 'npm run lint:fix',
      prePlan: 'npm run workflow:check',
      postTasks: 'npm run test:coverage',
    },
  },

  // Team collaboration
  team: {
    primaryDeveloper: 'Dr. Shekhar (Technical Lead)',
    aiAgents: ['Claude Code', 'GitHub Copilot'],
    stakeholders: ['Students', 'Teachers', 'Parents'],
    reviewProcess: 'Spec → Plan → Tasks → Implementation → Testing',
  },
}
