/**
 * Smart Subscription Tiers - Intelligently designed pricing tiers with AI-driven features
 * Optimized for different user segments with value-based pricing
 */

interface SubscriptionTiers {
  free: FreeTierConfig
  student: StudentTierConfig
  premium: PremiumTierConfig
  institutional: InstitutionalTierConfig
}

interface FreeTierConfig {
  name: 'Free Biology Explorer'
  description: 'Perfect for getting started with biology learning'
  price: 0
  currency: 'USD'
  features: {
    ai_queries: {
      daily_limit: 10
      reset_time: '00:00 UTC'
      query_types: ['basic_concept', 'definition', 'simple_explanation']
      advanced_features: false
    }
    content_access: {
      basic_lessons: true
      practice_questions: 50
      video_lectures: 5
      study_materials: 'limited'
      exam_prep: false
    }
    study_tools: {
      flashcards: 100
      note_taking: true
      basic_diagrams: true
      collaboration: false
      study_groups: false
    }
    support: {
      community_forum: true
      email_support: false
      priority_support: false
      response_time: 'best_effort'
    }
  }
  limitations: {
    concurrent_sessions: 1
    download_limit: 0
    storage_limit_mb: 50
    offline_access: false
    ads_displayed: true
  }
  trial_period: 0
  upgrade_incentives: [
    'Unlock unlimited AI queries',
    'Access premium content library',
    'Remove ads for distraction-free learning',
    'Join exclusive study groups',
  ]
}

interface StudentTierConfig {
  name: 'Student Pro'
  description: 'Comprehensive solution for serious biology students'
  price: 9.99
  currency: 'USD'
  regional_pricing: {
    india: { price: 699; currency: 'INR' }
    brazil: { price: 39.99; currency: 'BRL' }
    mexico: { price: 199; currency: 'MXN' }
    philippines: { price: 549; currency: 'PHP' }
  }
  features: {
    ai_queries: {
      daily_limit: -1 // Unlimited
      query_types: [
        'concept_explanation',
        'problem_solving',
        'diagram_analysis',
        'study_planning',
        'exam_preparation',
        'homework_help',
      ]
      advanced_features: true
      personalization: true
    }
    exam_preparation: {
      mock_tests: true
      adaptive_testing: true
      performance_analytics: true
      weak_area_identification: true
      study_schedule_optimization: true
      exam_specific_content: ['NEET', 'MCAT', 'AP Biology', 'IB Biology']
    }
    content_access: {
      premium_lessons: true
      unlimited_practice: true
      video_library: 'full_access'
      research_papers: true
      case_studies: true
      laboratory_simulations: true
    }
    study_tools: {
      unlimited_flashcards: true
      advanced_note_taking: true
      mind_maps: true
      collaboration_tools: true
      study_groups: 10
      peer_connections: true
    }
    ai_features: {
      study_buddy: true
      concept_clarification: true
      learning_path_optimization: true
      progress_tracking: true
      motivational_coaching: false
    }
    support: {
      email_support: true
      community_access: true
      response_time: 'twenty_four_hours'
      knowledge_base: true
    }
  }
  limitations: {
    concurrent_sessions: 3
    download_limit: 500
    storage_limit_gb: 5
    offline_access: true
    study_groups_created: 3
  }
  trial_period: 14
  student_verification: {
    required: true
    discount_percentage: 25
    verification_methods: ['edu_email', 'student_id', 'institution_verification']
  }
  upgrade_incentives: [
    'Get 1-on-1 AI tutoring sessions',
    'Access priority support',
    'Join premium mentorship program',
    'Unlock advanced analytics',
  ]
}

interface PremiumTierConfig {
  name: 'Premium Master'
  description: 'Ultimate biology learning experience with personalized AI tutoring'
  price: 19.99
  currency: 'USD'
  regional_pricing: {
    india: { price: 1399; currency: 'INR' }
    brazil: { price: 79.99; currency: 'BRL' }
    mexico: { price: 399; currency: 'MXN' }
    philippines: { price: 1099; currency: 'PHP' }
  }
  features: {
    ai_queries: {
      daily_limit: -1 // Unlimited
      query_types: [
        'advanced_research',
        'thesis_assistance',
        'publication_review',
        'experimental_design',
        'data_analysis',
        'career_guidance',
      ]
      advanced_features: true
      personalization: true
      priority_processing: true
    }
    one_on_one_tutoring: {
      ai_tutor_sessions: 10 // per month
      session_duration: 60 // minutes
      personalized_curriculum: true
      real_time_feedback: true
      session_recordings: true
      homework_review: true
    }
    exam_preparation: {
      everything_from_student: true
      custom_test_creation: true
      detailed_performance_reports: true
      predictive_scoring: true
      success_probability: true
      personalized_study_plans: true
    }
    content_access: {
      everything_from_student: true
      exclusive_content: true
      early_access: true
      research_collaboration: true
      expert_interviews: true
      live_webinars: true
    }
    advanced_features: {
      ai_lab_assistant: true
      virtual_experiments: true
      ar_biology_models: true
      scientific_calculator: true
      citation_manager: true
      research_assistant: true
    }
    mentorship_program: {
      expert_mentors: true
      career_counseling: true
      university_admission_guidance: true
      scholarship_assistance: true
      networking_opportunities: true
    }
    support: {
      priority_support: true
      dedicated_success_manager: true
      phone_support: true
      response_time: 'four_hours'
      chat_support_24_7: true // 24/7 chat support available
    }
  }
  limitations: {
    concurrent_sessions: 10
    download_limit: -1 // Unlimited
    storage_limit_gb: 50
    offline_access: true
    study_groups_created: 20
  }
  trial_period: 30
  premium_perks: [
    'Monthly 1-on-1 expert sessions',
    'Exclusive research access',
    'Beta feature early access',
    'Premium community access',
    'Career guidance sessions',
  ]
}

interface InstitutionalTierConfig {
  name: 'Institutional Enterprise'
  description: 'Comprehensive solution for schools, colleges, and educational institutions'
  pricing_model: 'custom'
  base_price_per_student: 4.99
  currency: 'USD'
  minimum_students: 50
  volume_discounts: [
    { min_students: 50; discount_percentage: 0 },
    { min_students: 200; discount_percentage: 15 },
    { min_students: 500; discount_percentage: 25 },
    { min_students: 1000; discount_percentage: 35 },
    { min_students: 5000; discount_percentage: 50 },
  ]
  features: {
    all_premium_features: true
    bulk_licensing: {
      unlimited_student_accounts: true
      teacher_administrator_accounts: true
      custom_user_roles: true
      sso_integration: true
      ldap_integration: true
    }
    analytics_dashboard: {
      institutional_analytics: true
      student_progress_tracking: true
      usage_statistics: true
      performance_benchmarking: true
      custom_reports: true
      data_export: true
    }
    content_management: {
      custom_curriculum: true
      branded_platform: true
      content_creation_tools: true
      assignment_management: true
      grading_integration: true
      lms_integration: true
    }
    advanced_ai: {
      institutional_ai_models: true
      custom_training_data: true
      plagiarism_detection: true
      automated_grading: true
      learning_analytics: true
      predictive_modeling: true
    }
    collaboration_tools: {
      institutional_study_groups: true
      teacher_student_communication: true
      peer_learning_networks: true
      virtual_classrooms: true
      live_streaming: true
      screen_sharing: true
    }
    administrative_features: {
      user_management: true
      role_based_permissions: true
      usage_monitoring: true
      compliance_reporting: true
      security_controls: true
      audit_logs: true
    }
    support: {
      dedicated_account_manager: true
      implementation_support: true
      training_sessions: true
      priority_support_24_7: true
      custom_integrations: true
      on_site_training: true
    }
  }
  customization_options: {
    white_labeling: true
    custom_domains: true
    api_access: true
    custom_integrations: true
    dedicated_servers: true
    advanced_security: true
  }
  trial_period: 60
  implementation_timeline: '2-4 weeks'
  success_metrics: {
    student_engagement_increase: '40%'
    teacher_productivity_gain: '30%'
    assessment_accuracy_improvement: '25%'
    administrative_time_savings: '50%'
  }
}

export class SmartSubscriptionTiers {
  private tiers: SubscriptionTiers

  constructor() {
    this.tiers = this.initializeTiers()
  }

  private initializeTiers(): SubscriptionTiers {
    return {
      free: {
        name: 'Free Biology Explorer',
        description: 'Perfect for getting started with biology learning',
        price: 0,
        currency: 'USD',
        features: {
          ai_queries: {
            daily_limit: 10,
            reset_time: '00:00 UTC',
            query_types: ['basic_concept', 'definition', 'simple_explanation'],
            advanced_features: false,
          },
          content_access: {
            basic_lessons: true,
            practice_questions: 50,
            video_lectures: 5,
            study_materials: 'limited',
            exam_prep: false,
          },
          study_tools: {
            flashcards: 100,
            note_taking: true,
            basic_diagrams: true,
            collaboration: false,
            study_groups: false,
          },
          support: {
            community_forum: true,
            email_support: false,
            priority_support: false,
            response_time: 'best_effort',
          },
        },
        limitations: {
          concurrent_sessions: 1,
          download_limit: 0,
          storage_limit_mb: 50,
          offline_access: false,
          ads_displayed: true,
        },
        trial_period: 0,
        upgrade_incentives: [
          'Unlock unlimited AI queries',
          'Access premium content library',
          'Remove ads for distraction-free learning',
          'Join exclusive study groups',
        ],
      },
      student: {
        name: 'Student Pro',
        description: 'Comprehensive solution for serious biology students',
        price: 9.99,
        currency: 'USD',
        regional_pricing: {
          india: { price: 699, currency: 'INR' },
          brazil: { price: 39.99, currency: 'BRL' },
          mexico: { price: 199, currency: 'MXN' },
          philippines: { price: 549, currency: 'PHP' },
        },
        features: {
          ai_queries: {
            daily_limit: -1,
            query_types: [
              'concept_explanation',
              'problem_solving',
              'diagram_analysis',
              'study_planning',
              'exam_preparation',
              'homework_help',
            ],
            advanced_features: true,
            personalization: true,
          },
          exam_preparation: {
            mock_tests: true,
            adaptive_testing: true,
            performance_analytics: true,
            weak_area_identification: true,
            study_schedule_optimization: true,
            exam_specific_content: ['NEET', 'MCAT', 'AP Biology', 'IB Biology'],
          },
          content_access: {
            premium_lessons: true,
            unlimited_practice: true,
            video_library: 'full_access',
            research_papers: true,
            case_studies: true,
            laboratory_simulations: true,
          },
          study_tools: {
            unlimited_flashcards: true,
            advanced_note_taking: true,
            mind_maps: true,
            collaboration_tools: true,
            study_groups: 10,
            peer_connections: true,
          },
          ai_features: {
            study_buddy: true,
            concept_clarification: true,
            learning_path_optimization: true,
            progress_tracking: true,
            motivational_coaching: false,
          },
          support: {
            email_support: true,
            community_access: true,
            response_time: 'twenty_four_hours',
            knowledge_base: true,
          },
        },
        limitations: {
          concurrent_sessions: 3,
          download_limit: 500,
          storage_limit_gb: 5,
          offline_access: true,
          study_groups_created: 3,
        },
        trial_period: 14,
        student_verification: {
          required: true,
          discount_percentage: 25,
          verification_methods: ['edu_email', 'student_id', 'institution_verification'],
        },
        upgrade_incentives: [
          'Get 1-on-1 AI tutoring sessions',
          'Access priority support',
          'Join premium mentorship program',
          'Unlock advanced analytics',
        ],
      },
      premium: {
        name: 'Premium Master',
        description: 'Ultimate biology learning experience with personalized AI tutoring',
        price: 19.99,
        currency: 'USD',
        regional_pricing: {
          india: { price: 1399, currency: 'INR' },
          brazil: { price: 79.99, currency: 'BRL' },
          mexico: { price: 399, currency: 'MXN' },
          philippines: { price: 1099, currency: 'PHP' },
        },
        features: {
          ai_queries: {
            daily_limit: -1,
            query_types: [
              'advanced_research',
              'thesis_assistance',
              'publication_review',
              'experimental_design',
              'data_analysis',
              'career_guidance',
            ],
            advanced_features: true,
            personalization: true,
            priority_processing: true,
          },
          one_on_one_tutoring: {
            ai_tutor_sessions: 10,
            session_duration: 60,
            personalized_curriculum: true,
            real_time_feedback: true,
            session_recordings: true,
            homework_review: true,
          },
          exam_preparation: {
            everything_from_student: true,
            custom_test_creation: true,
            detailed_performance_reports: true,
            predictive_scoring: true,
            success_probability: true,
            personalized_study_plans: true,
          },
          content_access: {
            everything_from_student: true,
            exclusive_content: true,
            early_access: true,
            research_collaboration: true,
            expert_interviews: true,
            live_webinars: true,
          },
          advanced_features: {
            ai_lab_assistant: true,
            virtual_experiments: true,
            ar_biology_models: true,
            scientific_calculator: true,
            citation_manager: true,
            research_assistant: true,
          },
          mentorship_program: {
            expert_mentors: true,
            career_counseling: true,
            university_admission_guidance: true,
            scholarship_assistance: true,
            networking_opportunities: true,
          },
          support: {
            priority_support: true,
            dedicated_success_manager: true,
            phone_support: true,
            response_time: 'four_hours',
            chat_support_24_7: true,
          },
        },
        limitations: {
          concurrent_sessions: 10,
          download_limit: -1,
          storage_limit_gb: 50,
          offline_access: true,
          study_groups_created: 20,
        },
        trial_period: 30,
        premium_perks: [
          'Monthly 1-on-1 expert sessions',
          'Exclusive research access',
          'Beta feature early access',
          'Premium community access',
          'Career guidance sessions',
        ],
      },
      institutional: {
        name: 'Institutional Enterprise',
        description: 'Comprehensive solution for schools, colleges, and educational institutions',
        pricing_model: 'custom',
        base_price_per_student: 4.99,
        currency: 'USD',
        minimum_students: 50,
        volume_discounts: [
          { min_students: 50, discount_percentage: 0 },
          { min_students: 200, discount_percentage: 15 },
          { min_students: 500, discount_percentage: 25 },
          { min_students: 1000, discount_percentage: 35 },
          { min_students: 5000, discount_percentage: 50 },
        ],
        features: {
          all_premium_features: true,
          bulk_licensing: {
            unlimited_student_accounts: true,
            teacher_administrator_accounts: true,
            custom_user_roles: true,
            sso_integration: true,
            ldap_integration: true,
          },
          analytics_dashboard: {
            institutional_analytics: true,
            student_progress_tracking: true,
            usage_statistics: true,
            performance_benchmarking: true,
            custom_reports: true,
            data_export: true,
          },
          content_management: {
            custom_curriculum: true,
            branded_platform: true,
            content_creation_tools: true,
            assignment_management: true,
            grading_integration: true,
            lms_integration: true,
          },
          advanced_ai: {
            institutional_ai_models: true,
            custom_training_data: true,
            plagiarism_detection: true,
            automated_grading: true,
            learning_analytics: true,
            predictive_modeling: true,
          },
          collaboration_tools: {
            institutional_study_groups: true,
            teacher_student_communication: true,
            peer_learning_networks: true,
            virtual_classrooms: true,
            live_streaming: true,
            screen_sharing: true,
          },
          administrative_features: {
            user_management: true,
            role_based_permissions: true,
            usage_monitoring: true,
            compliance_reporting: true,
            security_controls: true,
            audit_logs: true,
          },
          support: {
            dedicated_account_manager: true,
            implementation_support: true,
            training_sessions: true,
            priority_support_24_7: true,
            custom_integrations: true,
            on_site_training: true,
          },
        },
        customization_options: {
          white_labeling: true,
          custom_domains: true,
          api_access: true,
          custom_integrations: true,
          dedicated_servers: true,
          advanced_security: true,
        },
        trial_period: 60,
        implementation_timeline: '2-4 weeks',
        success_metrics: {
          student_engagement_increase: '40%',
          teacher_productivity_gain: '30%',
          assessment_accuracy_improvement: '25%',
          administrative_time_savings: '50%',
        },
      },
    }
  }

  /**
   * Get tier information
   */
  getTier(tierName: keyof SubscriptionTiers) {
    return this.tiers[tierName]
  }

  /**
   * Calculate pricing for a specific region
   */
  calculateRegionalPricing(
    tierName: 'student' | 'premium',
    region: string
  ): { price: number; currency: string; savings?: number } {
    const tier = this.tiers[tierName]
    const regionalPricing = tier.regional_pricing?.[region]

    if (regionalPricing) {
      // Calculate purchasing power parity savings
      const usdEquivalent = this.convertToUSD(regionalPricing.price, regionalPricing.currency)
      const savings = tier.price - usdEquivalent

      return {
        price: regionalPricing.price,
        currency: regionalPricing.currency,
        savings: savings > 0 ? savings : undefined,
      }
    }

    return {
      price: tier.price,
      currency: tier.currency,
    }
  }

  /**
   * Calculate institutional pricing
   */
  calculateInstitutionalPricing(studentCount: number): {
    base_price: number
    discount_percentage: number
    discounted_price: number
    total_monthly_cost: number
    annual_savings: number
  } {
    const institutional = this.tiers.institutional
    const basePrice = institutional.base_price_per_student

    // Find applicable volume discount
    let discountPercentage = 0
    for (const discount of institutional.volume_discounts) {
      if (studentCount >= discount.min_students) {
        discountPercentage = discount.discount_percentage
      }
    }

    const discountedPrice = basePrice * (1 - discountPercentage / 100)
    const totalMonthlyCost = discountedPrice * studentCount
    const annualSavings = (basePrice - discountedPrice) * studentCount * 12

    return {
      base_price: basePrice,
      discount_percentage: discountPercentage,
      discounted_price: discountedPrice,
      total_monthly_cost: totalMonthlyCost,
      annual_savings: annualSavings,
    }
  }

  /**
   * Get upgrade recommendations
   */
  getUpgradeRecommendations(
    currentTier: keyof SubscriptionTiers,
    usage: UserUsageData
  ): UpgradeRecommendation[] {
    const recommendations: UpgradeRecommendation[] = []

    if (currentTier === 'free') {
      if (usage.daily_ai_queries_avg > 8) {
        recommendations.push({
          target_tier: 'student',
          reason: "You're hitting AI query limits frequently",
          benefit: 'Get unlimited AI queries and advanced features',
          potential_savings: 'Save 4+ hours per week on studying',
        })
      }
    }

    if (currentTier === 'student') {
      if (usage.study_time_hours_per_week > 20) {
        recommendations.push({
          target_tier: 'premium',
          reason: "You're a dedicated student who could benefit from 1-on-1 tutoring",
          benefit: 'Get personalized AI tutoring and expert mentorship',
          potential_savings: 'Equivalent to $200+ in private tutoring',
        })
      }
    }

    return recommendations
  }

  /**
   * Compare tiers
   */
  compareTiers(tier1: keyof SubscriptionTiers, tier2: keyof SubscriptionTiers): TierComparison {
    const t1 = this.tiers[tier1]
    const t2 = this.tiers[tier2]

    // Get price for each tier (handle institutional tier differently)
    const t1Price = 'price' in t1 ? t1.price : t1.base_price_per_student
    const t2Price = 'price' in t2 ? t2.price : t2.base_price_per_student

    return {
      tier1: {
        name: t1.name,
        price: t1Price,
        currency: t1.currency,
      },
      tier2: {
        name: t2.name,
        price: t2Price,
        currency: t2.currency,
      },
      price_difference: t2Price - t1Price,
      feature_comparison: this.generateFeatureComparison(t1, t2),
      value_proposition: this.generateValueProposition(t1, t2),
    }
  }

  private convertToUSD(price: number, currency: string): number {
    // Simplified conversion rates (in real implementation, use live rates)
    const rates: { [key: string]: number } = {
      INR: 0.012,
      BRL: 0.2,
      MXN: 0.058,
      PHP: 0.018,
      USD: 1.0,
    }

    return price * (rates[currency] || 1.0)
  }

  private generateFeatureComparison(tier1: any, tier2: any): string[] {
    // Simplified feature comparison
    return [
      'Unlimited AI queries vs Limited queries',
      'Premium content access',
      'Advanced study tools',
      'Priority support',
    ]
  }

  private generateValueProposition(tier1: any, tier2: any): string {
    const tier1Price = 'price' in tier1 ? tier1.price : tier1.base_price_per_student
    const tier2Price = 'price' in tier2 ? tier2.price : tier2.base_price_per_student
    const priceDiff = tier2Price - tier1Price
    return `For just $${priceDiff} more per month, get 10x more value with advanced features`
  }
}

// Supporting interfaces
interface UserUsageData {
  daily_ai_queries_avg: number
  study_time_hours_per_week: number
  feature_usage: { [key: string]: number }
  engagement_score: number
}

interface UpgradeRecommendation {
  target_tier: keyof SubscriptionTiers
  reason: string
  benefit: string
  potential_savings: string
}

interface TierComparison {
  tier1: { name: string; price: number; currency: string }
  tier2: { name: string; price: number; currency: string }
  price_difference: number
  feature_comparison: string[]
  value_proposition: string
}

export const subscriptionTiers = new SmartSubscriptionTiers()
