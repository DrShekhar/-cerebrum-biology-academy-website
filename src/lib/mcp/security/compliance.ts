/**
 * Compliance Manager - GDPR & Indian Data Protection
 * Educational data compliance for global operations
 * Student privacy protection with regulatory adherence
 */

import type { AuditLog, DataRetentionPolicy, UserType, AuditAction, AuditStatus } from '../types'

interface ComplianceRule {
  id: string
  name: string
  description: string
  regulation: 'GDPR' | 'PDPB' | 'COPPA' | 'FERPA'
  applicableRegions: string[]
  dataTypes: string[]
  requirements: string[]
  isActive: boolean
}

interface DataProcessingConsent {
  userId: string
  userType: UserType
  consentId: string
  purpose: string
  dataTypes: string[]
  consentGiven: boolean
  consentDate: Date
  expiryDate?: Date
  withdrawalDate?: Date
  lawfulBasis: string
  isMinor: boolean
  parentalConsent?: boolean
}

interface PrivacyRequest {
  id: string
  userId: string
  requestType: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction'
  status: 'pending' | 'processing' | 'completed' | 'rejected'
  requestDate: Date
  completionDate?: Date
  responseData?: any
  reason?: string
}

interface DataMapping {
  dataElement: string
  purpose: string
  lawfulBasis: string
  retentionPeriod: number // months
  dataLocation: string
  securityMeasures: string[]
  sharingPartners: string[]
  isPersonalData: boolean
  isSensitiveData: boolean
}

/**
 * ComplianceManager ensures adherence to global data protection regulations
 * Features: GDPR compliance, Indian PDPB readiness, COPPA compliance for minors
 */
export class ComplianceManager {
  private complianceRules: Map<string, ComplianceRule> = new Map()
  private consentRecords: Map<string, DataProcessingConsent[]> = new Map()
  private privacyRequests: Map<string, PrivacyRequest> = new Map()
  private dataMapping: Map<string, DataMapping> = new Map()
  private retentionPolicy: DataRetentionPolicy

  // Compliance configuration
  private readonly SUPPORTED_REGULATIONS = ['GDPR', 'PDPB', 'COPPA', 'FERPA']
  private readonly LAWFUL_BASES = [
    'consent',
    'contract',
    'legal_obligation',
    'vital_interests',
    'public_task',
    'legitimate_interests',
  ]

  constructor() {
    this.initializeComplianceRules()
    this.initializeDataMapping()
    this.initializeRetentionPolicy()
  }

  /**
   * Validate data processing against compliance rules
   */
  validateDataProcessing(
    userId: string,
    userType: UserType,
    dataType: string,
    purpose: string,
    region: string = 'IN'
  ): {
    isCompliant: boolean
    violations: string[]
    requiredActions: string[]
    applicableRules: string[]
  } {
    const violations: string[] = []
    const requiredActions: string[] = []
    const applicableRules: string[] = []

    // Get applicable compliance rules for region and data type
    const rules = this.getApplicableRules(region, dataType)
    applicableRules.push(...rules.map((rule) => rule.name))

    for (const rule of rules) {
      const ruleValidation = this.validateAgainstRule(rule, userId, userType, dataType, purpose)

      if (!ruleValidation.isCompliant) {
        violations.push(...ruleValidation.violations)
        requiredActions.push(...ruleValidation.requiredActions)
      }
    }

    return {
      isCompliant: violations.length === 0,
      violations,
      requiredActions,
      applicableRules,
    }
  }

  /**
   * Record data processing consent
   */
  async recordConsent(
    userId: string,
    userType: UserType,
    purpose: string,
    dataTypes: string[],
    lawfulBasis: string = 'consent',
    isMinor: boolean = false,
    parentalConsent: boolean = false
  ): Promise<string> {
    const consentId = this.generateConsentId()
    const expiryDate = this.calculateConsentExpiry(purpose, isMinor)

    const consent: DataProcessingConsent = {
      userId,
      userType,
      consentId,
      purpose,
      dataTypes,
      consentGiven: true,
      consentDate: new Date(),
      expiryDate,
      lawfulBasis,
      isMinor,
      parentalConsent: isMinor ? parentalConsent : undefined,
    }

    // Validate consent requirements
    if (isMinor && !parentalConsent) {
      throw new Error('Parental consent required for users under 16')
    }

    if (!this.LAWFUL_BASES.includes(lawfulBasis)) {
      throw new Error(`Invalid lawful basis: ${lawfulBasis}`)
    }

    // Store consent record
    const userConsents = this.consentRecords.get(userId) || []
    userConsents.push(consent)
    this.consentRecords.set(userId, userConsents)

    // Log consent recording
    this.logComplianceEvent('consent_recorded', userId, {
      consentId,
      purpose,
      dataTypes,
      lawfulBasis,
      isMinor,
      parentalConsent,
    })

    return consentId
  }

  /**
   * Withdraw consent for data processing
   */
  async withdrawConsent(userId: string, consentId: string): Promise<boolean> {
    const userConsents = this.consentRecords.get(userId) || []
    const consent = userConsents.find((c) => c.consentId === consentId)

    if (!consent) {
      throw new Error('Consent record not found')
    }

    if (consent.withdrawalDate) {
      throw new Error('Consent already withdrawn')
    }

    // Update consent record
    consent.withdrawalDate = new Date()
    consent.consentGiven = false

    // Log withdrawal
    this.logComplianceEvent('consent_withdrawn', userId, {
      consentId,
      withdrawalDate: consent.withdrawalDate,
      originalPurpose: consent.purpose,
    })

    return true
  }

  /**
   * Handle GDPR data subject rights requests
   */
  async handlePrivacyRequest(
    userId: string,
    requestType: PrivacyRequest['requestType'],
    details?: any
  ): Promise<string> {
    const requestId = this.generateRequestId()

    const privacyRequest: PrivacyRequest = {
      id: requestId,
      userId,
      requestType,
      status: 'pending',
      requestDate: new Date(),
    }

    this.privacyRequests.set(requestId, privacyRequest)

    // Log privacy request
    this.logComplianceEvent('privacy_request_received', userId, {
      requestId,
      requestType,
      details,
    })

    // Auto-process certain request types
    if (requestType === 'access') {
      await this.processDataAccessRequest(requestId)
    }

    return requestId
  }

  /**
   * Process data access request (GDPR Article 15)
   */
  private async processDataAccessRequest(requestId: string): Promise<void> {
    const request = this.privacyRequests.get(requestId)
    if (!request) return

    request.status = 'processing'

    try {
      // Collect all data associated with the user
      const userData = await this.collectUserData(request.userId)

      request.responseData = {
        personalData: userData.personalData,
        processingPurposes: userData.purposes,
        dataRetention: userData.retentionPeriods,
        dataSharing: userData.sharingPartners,
        userRights: this.getUserRights(),
        contactInformation: this.getDataControllerContact(),
      }

      request.status = 'completed'
      request.completionDate = new Date()

      this.logComplianceEvent('data_access_completed', request.userId, {
        requestId,
        dataElementsProvided: Object.keys(userData.personalData).length,
      })
    } catch (error) {
      request.status = 'rejected'
      request.reason = error.message

      this.logComplianceEvent('data_access_failed', request.userId, {
        requestId,
        error: error.message,
      })
    }
  }

  /**
   * Check consent validity for data processing
   */
  hasValidConsent(userId: string, purpose: string, dataType: string): boolean {
    const userConsents = this.consentRecords.get(userId) || []

    const validConsent = userConsents.find(
      (consent) =>
        consent.consentGiven &&
        !consent.withdrawalDate &&
        consent.purpose === purpose &&
        consent.dataTypes.includes(dataType) &&
        (!consent.expiryDate || consent.expiryDate > new Date())
    )

    return !!validConsent
  }

  /**
   * Generate privacy notice for data collection
   */
  generatePrivacyNotice(
    dataTypes: string[],
    purposes: string[],
    region: string = 'IN'
  ): {
    notice: string
    requiredDisclosures: string[]
    userRights: string[]
  } {
    const applicableRules = this.getApplicableRules(region, dataTypes[0])
    const requiredDisclosures: string[] = []
    const userRights: string[] = []

    // GDPR requirements
    if (region === 'EU' || applicableRules.some((rule) => rule.regulation === 'GDPR')) {
      requiredDisclosures.push(
        'Identity and contact details of the data controller',
        'Purposes of processing and legal basis',
        'Categories of personal data',
        'Recipients or categories of recipients',
        'Retention period or criteria',
        'Right to withdraw consent'
      )

      userRights.push(
        'Right of access (Article 15)',
        'Right to rectification (Article 16)',
        'Right to erasure (Article 17)',
        'Right to restrict processing (Article 18)',
        'Right to data portability (Article 20)',
        'Right to object (Article 21)'
      )
    }

    // Indian PDPB requirements
    if (region === 'IN') {
      requiredDisclosures.push(
        'Purpose and means of processing',
        'Categories of personal data',
        'Source of personal data',
        'Right to grievance redressal'
      )

      userRights.push(
        'Right to confirmation and access',
        'Right to correction and erasure',
        'Right to data portability',
        'Right to be forgotten'
      )
    }

    const notice = this.buildPrivacyNoticeText(dataTypes, purposes, requiredDisclosures)

    return {
      notice,
      requiredDisclosures,
      userRights,
    }
  }

  /**
   * Audit data processing activities
   */
  auditDataProcessing(): {
    complianceScore: number
    violations: string[]
    recommendations: string[]
    auditDate: Date
  } {
    const violations: string[] = []
    const recommendations: string[] = []

    // Check consent records
    let totalConsents = 0
    let expiredConsents = 0
    const now = new Date()

    for (const [userId, consents] of this.consentRecords) {
      for (const consent of consents) {
        totalConsents++

        if (consent.expiryDate && consent.expiryDate < now) {
          expiredConsents++
          violations.push(`Expired consent for user ${userId}: ${consent.purpose}`)
        }

        if (consent.isMinor && !consent.parentalConsent) {
          violations.push(`Missing parental consent for minor user ${userId}`)
        }
      }
    }

    // Check data retention compliance
    const retentionViolations = this.checkRetentionCompliance()
    violations.push(...retentionViolations)

    // Calculate compliance score
    const totalChecks = totalConsents + this.dataMapping.size + this.privacyRequests.size
    const violationCount = violations.length
    const complianceScore = Math.max(0, 100 - (violationCount / totalChecks) * 100)

    // Generate recommendations
    if (expiredConsents > 0) {
      recommendations.push('Refresh expired consent records')
    }

    if (violationCount > 0) {
      recommendations.push('Address identified compliance violations')
    }

    recommendations.push('Conduct regular compliance training')
    recommendations.push('Update privacy policies quarterly')

    return {
      complianceScore: Math.round(complianceScore),
      violations,
      recommendations,
      auditDate: new Date(),
    }
  }

  /**
   * Generate compliance report
   */
  generateComplianceReport(): {
    summary: any
    consentMetrics: any
    privacyRequests: any
    dataMapping: any
    recommendations: string[]
  } {
    const totalUsers = this.consentRecords.size
    const totalConsents = Array.from(this.consentRecords.values()).reduce(
      (sum, consents) => sum + consents.length,
      0
    )

    const activeConsents = Array.from(this.consentRecords.values()).reduce(
      (sum, consents) => sum + consents.filter((c) => c.consentGiven && !c.withdrawalDate).length,
      0
    )

    const pendingRequests = Array.from(this.privacyRequests.values()).filter(
      (req) => req.status === 'pending'
    ).length

    return {
      summary: {
        totalUsers,
        totalConsents,
        activeConsents,
        consentRate: Math.round((activeConsents / totalConsents) * 100),
        pendingPrivacyRequests: pendingRequests,
        complianceScore: this.auditDataProcessing().complianceScore,
      },
      consentMetrics: this.generateConsentMetrics(),
      privacyRequests: this.generatePrivacyRequestMetrics(),
      dataMapping: Array.from(this.dataMapping.values()),
      recommendations: this.generateComplianceRecommendations(),
    }
  }

  // Private helper methods

  private initializeComplianceRules(): void {
    const rules: ComplianceRule[] = [
      {
        id: 'gdpr-consent',
        name: 'GDPR Consent Requirement',
        description: 'Valid consent required for processing personal data',
        regulation: 'GDPR',
        applicableRegions: ['EU', 'EEA'],
        dataTypes: ['personal_data', 'sensitive_data'],
        requirements: ['explicit_consent', 'freely_given', 'specific', 'informed'],
        isActive: true,
      },
      {
        id: 'pdpb-notice',
        name: 'PDPB Privacy Notice',
        description: 'Privacy notice required before data collection',
        regulation: 'PDPB',
        applicableRegions: ['IN'],
        dataTypes: ['personal_data'],
        requirements: ['privacy_notice', 'purpose_limitation', 'data_minimization'],
        isActive: true,
      },
      {
        id: 'coppa-parental-consent',
        name: 'COPPA Parental Consent',
        description: 'Parental consent required for children under 13',
        regulation: 'COPPA',
        applicableRegions: ['US'],
        dataTypes: ['child_data'],
        requirements: ['parental_consent', 'age_verification'],
        isActive: true,
      },
      {
        id: 'ferpa-educational-records',
        name: 'FERPA Educational Records Protection',
        description: 'Protection of student educational records',
        regulation: 'FERPA',
        applicableRegions: ['US'],
        dataTypes: ['educational_records'],
        requirements: ['consent_for_disclosure', 'directory_info_notice'],
        isActive: true,
      },
    ]

    rules.forEach((rule) => this.complianceRules.set(rule.id, rule))
  }

  private initializeDataMapping(): void {
    const mappings: DataMapping[] = [
      {
        dataElement: 'student_name',
        purpose: 'education_service',
        lawfulBasis: 'contract',
        retentionPeriod: 84, // 7 years
        dataLocation: 'IN',
        securityMeasures: ['encryption', 'access_control'],
        sharingPartners: [],
        isPersonalData: true,
        isSensitiveData: false,
      },
      {
        dataElement: 'performance_data',
        purpose: 'progress_tracking',
        lawfulBasis: 'legitimate_interests',
        retentionPeriod: 36, // 3 years
        dataLocation: 'IN',
        securityMeasures: ['encryption', 'pseudonymization'],
        sharingPartners: ['parents'],
        isPersonalData: true,
        isSensitiveData: false,
      },
      {
        dataElement: 'communication_logs',
        purpose: 'customer_support',
        lawfulBasis: 'legitimate_interests',
        retentionPeriod: 24, // 2 years
        dataLocation: 'IN',
        securityMeasures: ['encryption', 'access_logging'],
        sharingPartners: [],
        isPersonalData: true,
        isSensitiveData: false,
      },
    ]

    mappings.forEach((mapping) => this.dataMapping.set(mapping.dataElement, mapping))
  }

  private initializeRetentionPolicy(): void {
    this.retentionPolicy = {
      studentData: 84, // 7 years (Indian education regulation)
      conversationLogs: 24, // 2 years
      analyticsData: 36, // 3 years
      auditLogs: 84, // 7 years (compliance requirement)
    }
  }

  private getApplicableRules(region: string, dataType: string): ComplianceRule[] {
    return Array.from(this.complianceRules.values()).filter(
      (rule) =>
        rule.isActive &&
        (rule.applicableRegions.includes(region) || rule.applicableRegions.includes('*')) &&
        (rule.dataTypes.includes(dataType) || rule.dataTypes.includes('*'))
    )
  }

  private validateAgainstRule(
    rule: ComplianceRule,
    userId: string,
    userType: UserType,
    dataType: string,
    purpose: string
  ): { isCompliant: boolean; violations: string[]; requiredActions: string[] } {
    const violations: string[] = []
    const requiredActions: string[] = []

    // Check consent requirements
    if (rule.requirements.includes('explicit_consent') || rule.requirements.includes('consent')) {
      if (!this.hasValidConsent(userId, purpose, dataType)) {
        violations.push(`Missing valid consent for ${purpose} - ${rule.name}`)
        requiredActions.push('Obtain valid consent from user')
      }
    }

    // Check parental consent for minors
    if (rule.requirements.includes('parental_consent')) {
      const userConsents = this.consentRecords.get(userId) || []
      const relevantConsent = userConsents.find(
        (c) => c.purpose === purpose && c.dataTypes.includes(dataType)
      )

      if (relevantConsent?.isMinor && !relevantConsent.parentalConsent) {
        violations.push(`Missing parental consent for minor - ${rule.name}`)
        requiredActions.push('Obtain parental consent')
      }
    }

    // Check privacy notice requirement
    if (rule.requirements.includes('privacy_notice')) {
      // In real implementation, check if privacy notice was shown
      // For now, assume it's handled elsewhere
    }

    return {
      isCompliant: violations.length === 0,
      violations,
      requiredActions,
    }
  }

  private calculateConsentExpiry(purpose: string, isMinor: boolean): Date {
    // Default consent validity periods
    const defaultPeriod = isMinor ? 12 : 24 // months
    const purposePeriods: Record<string, number> = {
      marketing: 12,
      analytics: 36,
      education_service: 84, // 7 years
    }

    const months = purposePeriods[purpose] || defaultPeriod
    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + months)

    return expiryDate
  }

  private async collectUserData(userId: string): Promise<any> {
    // In real implementation, collect from various data sources
    return {
      personalData: {
        name: 'Student Name',
        email: 'student@example.com',
        phone: '+91XXXXXXXXXX',
      },
      purposes: ['education_service', 'progress_tracking'],
      retentionPeriods: this.retentionPolicy,
      sharingPartners: ['parents'],
    }
  }

  private getUserRights(): string[] {
    return [
      'Right to access your personal data',
      'Right to rectify inaccurate data',
      'Right to erase data under certain conditions',
      'Right to restrict processing',
      'Right to data portability',
      'Right to object to processing',
      'Right to withdraw consent',
    ]
  }

  private getDataControllerContact(): any {
    return {
      organization: 'Cerebrum Biology Academy',
      email: 'privacy@cerebrumbiologyacademy.com',
      phone: '+91 88264 44334',
      address: 'India',
    }
  }

  private buildPrivacyNoticeText(
    dataTypes: string[],
    purposes: string[],
    disclosures: string[]
  ): string {
    return `
Privacy Notice

We collect the following types of data: ${dataTypes.join(', ')}
For the following purposes: ${purposes.join(', ')}

Required disclosures:
${disclosures.map((d) => `• ${d}`).join('\n')}

Contact us for any privacy-related questions at privacy@cerebrumbiologyacademy.com
    `.trim()
  }

  private checkRetentionCompliance(): string[] {
    const violations: string[] = []

    // Check if data is being retained beyond policy periods
    // In real implementation, check actual data stores

    return violations
  }

  private generateConsentMetrics(): any {
    const totalConsents = Array.from(this.consentRecords.values()).reduce(
      (sum, consents) => sum + consents.length,
      0
    )

    const activeConsents = Array.from(this.consentRecords.values()).reduce(
      (sum, consents) => sum + consents.filter((c) => c.consentGiven && !c.withdrawalDate).length,
      0
    )

    return {
      total: totalConsents,
      active: activeConsents,
      withdrawn: totalConsents - activeConsents,
      rate: Math.round((activeConsents / totalConsents) * 100),
    }
  }

  private generatePrivacyRequestMetrics(): any {
    const requests = Array.from(this.privacyRequests.values())

    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === 'pending').length,
      completed: requests.filter((r) => r.status === 'completed').length,
      rejected: requests.filter((r) => r.status === 'rejected').length,
    }
  }

  private generateComplianceRecommendations(): string[] {
    return [
      'Conduct quarterly privacy impact assessments',
      'Update consent mechanisms regularly',
      'Train staff on data protection requirements',
      'Review and update privacy policies',
      'Implement data minimization practices',
      'Regular compliance audits',
    ]
  }

  private generateConsentId(): string {
    return `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private logComplianceEvent(action: string, userId: string, details: any): void {
    console.log(`[COMPLIANCE] ${action} - User: ${userId}`, details)
    // In real implementation, use proper audit logging
  }
}
