// Enterprise Security and Role-Based Access Control for NEET Coaching Platform
// Focus: Multi-layered security with Indian compliance requirements

export interface SecurityRole {
  id: string
  name: string
  description: string
  permissions: Permission[]
  hierarchy: number // 1 = lowest, 10 = highest
  isSystemRole: boolean
  maxSessionDuration: number // in minutes
  allowedIpRanges?: string[]
  requiresMfa: boolean
  dataAccessLevel: 'none' | 'own' | 'team' | 'department' | 'all'
}

export interface Permission {
  resource: string
  actions: ('create' | 'read' | 'update' | 'delete' | 'execute')[]
  conditions?: PermissionCondition[]
  dataFilters?: DataFilter[]
}

export interface PermissionCondition {
  field: string
  operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'greater_than' | 'less_than'
  value: any
  context?: 'user' | 'time' | 'location' | 'device'
}

export interface DataFilter {
  field: string
  constraint: 'own_data' | 'team_data' | 'department_data' | 'public_data'
  conditions?: any[]
}

export interface SecurityAuditLog {
  id: string
  userId: string
  action: string
  resource: string
  result: 'success' | 'failure' | 'blocked'
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  ipAddress: string
  userAgent: string
  sessionId: string
  timestamp: number
  additionalData?: Record<string, any>
  complianceFlags?: string[]
}

// Indian Education Sector Compliance Requirements
export interface ComplianceFramework {
  dataLocalisation: {
    studentDataRetention: number // 7 years as per RTE Act
    parentConsentRequired: boolean
    minorDataProtection: boolean // Special protection for under-18
    crossBorderDataTransfer: 'prohibited' | 'restricted' | 'allowed'
  }
  financialCompliance: {
    femaCompliance: boolean // Foreign Exchange Management Act
    gstCompliance: boolean
    paymentDataRetention: number // 10 years
    auditTrailRequired: boolean
  }
  educationalCompliance: {
    rteCompliance: boolean // Right to Education Act
    ugcGuidelines: boolean // University Grants Commission
    studentPrivacyProtection: boolean
    examDataSecurity: boolean
  }
}

// NEET Coaching Platform Roles
export const NEETCoachingRoles: SecurityRole[] = [
  {
    id: 'super_admin',
    name: 'Super Administrator',
    description: 'Full system access with all privileges',
    hierarchy: 10,
    isSystemRole: true,
    maxSessionDuration: 480, // 8 hours
    requiresMfa: true,
    dataAccessLevel: 'all',
    permissions: [
      {
        resource: '*',
        actions: ['create', 'read', 'update', 'delete', 'execute']
      }
    ]
  },
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Administrative access to core functions',
    hierarchy: 9,
    isSystemRole: false,
    maxSessionDuration: 480,
    requiresMfa: true,
    dataAccessLevel: 'all',
    permissions: [
      {
        resource: 'users',
        actions: ['create', 'read', 'update', 'delete'],
        conditions: [
          { field: 'role', operator: 'not_equals', value: 'super_admin', context: 'user' }
        ]
      },
      {
        resource: 'courses',
        actions: ['create', 'read', 'update', 'delete']
      },
      {
        resource: 'enrollments',
        actions: ['create', 'read', 'update', 'delete']
      },
      {
        resource: 'payments',
        actions: ['read', 'update']
      },
      {
        resource: 'analytics',
        actions: ['read']
      },
      {
        resource: 'marketing',
        actions: ['create', 'read', 'update', 'delete']
      },
      {
        resource: 'reports',
        actions: ['read', 'execute']
      }
    ]
  },
  {
    id: 'academic_head',
    name: 'Academic Head',
    description: 'Academic operations and faculty management',
    hierarchy: 8,
    isSystemRole: false,
    maxSessionDuration: 360,
    requiresMfa: true,
    dataAccessLevel: 'department',
    permissions: [
      {
        resource: 'faculty',
        actions: ['create', 'read', 'update', 'delete']
      },
      {
        resource: 'courses',
        actions: ['create', 'read', 'update']
      },
      {
        resource: 'schedules',
        actions: ['create', 'read', 'update', 'delete']
      },
      {
        resource: 'students',
        actions: ['read', 'update'],
        dataFilters: [
          { field: 'academic_department', constraint: 'department_data' }
        ]
      },
      {
        resource: 'attendance',
        actions: ['read', 'update']
      },
      {
        resource: 'assessments',
        actions: ['create', 'read', 'update', 'delete']
      }
    ]
  },
  {
    id: 'operations_manager',
    name: 'Operations Manager',
    description: 'Day-to-day operations and student support',
    hierarchy: 7,
    isSystemRole: false,
    maxSessionDuration: 360,
    requiresMfa: false,
    dataAccessLevel: 'department',
    permissions: [
      {
        resource: 'enrollments',
        actions: ['create', 'read', 'update']
      },
      {
        resource: 'demo_bookings',
        actions: ['create', 'read', 'update', 'delete']
      },
      {
        resource: 'payments',
        actions: ['read', 'update'],
        conditions: [
          { field: 'status', operator: 'not_equals', value: 'completed', context: 'user' }
        ]
      },
      {
        resource: 'students',
        actions: ['read', 'update']
      },
      {
        resource: 'support_tickets',
        actions: ['create', 'read', 'update', 'delete']
      },
      {
        resource: 'communications',
        actions: ['create', 'read', 'execute']
      }
    ]
  },
  {
    id: 'sales_manager',
    name: 'Sales Manager',
    description: 'Sales operations and lead management',
    hierarchy: 6,
    isSystemRole: false,
    maxSessionDuration: 360,
    requiresMfa: false,
    dataAccessLevel: 'department',
    permissions: [
      {
        resource: 'leads',
        actions: ['create', 'read', 'update', 'delete']
      },
      {
        resource: 'demo_bookings',
        actions: ['create', 'read', 'update']
      },
      {
        resource: 'marketing_campaigns',
        actions: ['read', 'execute']
      },
      {
        resource: 'sales_reports',
        actions: ['read']
      },
      {
        resource: 'students',
        actions: ['read'],
        dataFilters: [
          { field: 'enrollment_status', constraint: 'public_data' }
        ]
      }
    ]
  },
  {
    id: 'faculty',
    name: 'Faculty Member',
    description: 'Teaching staff with class and student management',
    hierarchy: 5,
    isSystemRole: false,
    maxSessionDuration: 240,
    requiresMfa: false,
    dataAccessLevel: 'team',
    permissions: [
      {
        resource: 'classes',
        actions: ['create', 'read', 'update'],
        dataFilters: [
          { field: 'faculty_id', constraint: 'own_data' }
        ]
      },
      {
        resource: 'students',
        actions: ['read', 'update'],
        dataFilters: [
          { field: 'enrolled_courses', constraint: 'team_data' }
        ]
      },
      {
        resource: 'attendance',
        actions: ['create', 'read', 'update'],
        dataFilters: [
          { field: 'class_faculty', constraint: 'own_data' }
        ]
      },
      {
        resource: 'assignments',
        actions: ['create', 'read', 'update', 'delete'],
        dataFilters: [
          { field: 'created_by', constraint: 'own_data' }
        ]
      },
      {
        resource: 'doubts',
        actions: ['read', 'update']
      }
    ]
  },
  {
    id: 'counselor',
    name: 'Student Counselor',
    description: 'Student guidance and academic counseling',
    hierarchy: 4,
    isSystemRole: false,
    maxSessionDuration: 240,
    requiresMfa: false,
    dataAccessLevel: 'team',
    permissions: [
      {
        resource: 'students',
        actions: ['read', 'update'],
        dataFilters: [
          { field: 'assigned_counselor', constraint: 'own_data' }
        ]
      },
      {
        resource: 'counseling_sessions',
        actions: ['create', 'read', 'update', 'delete']
      },
      {
        resource: 'student_progress',
        actions: ['read']
      },
      {
        resource: 'communications',
        actions: ['create', 'read']
      }
    ]
  },
  {
    id: 'consultant',
    name: 'Admission Consultant',
    description: 'Admission referral tracking and lead management for referred students',
    hierarchy: 3,
    isSystemRole: false,
    maxSessionDuration: 180,
    requiresMfa: false,
    dataAccessLevel: 'own',
    permissions: [
      {
        resource: 'leads',
        actions: ['create', 'read', 'update'],
        dataFilters: [
          { field: 'referred_by', constraint: 'own_data' }
        ]
      },
      {
        resource: 'referrals',
        actions: ['read'],
        dataFilters: [
          { field: 'consultant_id', constraint: 'own_data' }
        ]
      },
      {
        resource: 'commissions',
        actions: ['read'],
        dataFilters: [
          { field: 'consultant_id', constraint: 'own_data' }
        ]
      },
      {
        resource: 'referral_links',
        actions: ['create', 'read'],
        dataFilters: [
          { field: 'consultant_id', constraint: 'own_data' }
        ]
      },
      {
        resource: 'communications',
        actions: ['read'],
        dataFilters: [
          { field: 'lead_referred_by', constraint: 'own_data' }
        ]
      },
      {
        resource: 'demo_bookings',
        actions: ['read'],
        dataFilters: [
          { field: 'referred_by', constraint: 'own_data' }
        ]
      },
      {
        resource: 'payments',
        actions: ['read'],
        dataFilters: [
          { field: 'enrollment_referred_by', constraint: 'own_data' }
        ],
        conditions: [
          { field: 'data_scope', operator: 'in', value: ['status', 'amount', 'date'], context: 'user' }
        ]
      }
    ]
  },
  {
    id: 'student',
    name: 'Student',
    description: 'Enrolled student with access to courses and materials',
    hierarchy: 2,
    isSystemRole: false,
    maxSessionDuration: 120,
    requiresMfa: false,
    dataAccessLevel: 'own',
    permissions: [
      {
        resource: 'courses',
        actions: ['read'],
        dataFilters: [
          { field: 'enrollment_status', constraint: 'own_data' }
        ]
      },
      {
        resource: 'classes',
        actions: ['read'],
        dataFilters: [
          { field: 'enrolled_students', constraint: 'own_data' }
        ]
      },
      {
        resource: 'assignments',
        actions: ['read', 'update'],
        dataFilters: [
          { field: 'student_id', constraint: 'own_data' }
        ]
      },
      {
        resource: 'doubts',
        actions: ['create', 'read'],
        dataFilters: [
          { field: 'student_id', constraint: 'own_data' }
        ]
      },
      {
        resource: 'progress',
        actions: ['read'],
        dataFilters: [
          { field: 'student_id', constraint: 'own_data' }
        ]
      }
    ]
  },
  {
    id: 'parent',
    name: 'Parent/Guardian',
    description: 'Parent access to child\'s academic progress',
    hierarchy: 1,
    isSystemRole: false,
    maxSessionDuration: 60,
    requiresMfa: false,
    dataAccessLevel: 'own',
    permissions: [
      {
        resource: 'student_progress',
        actions: ['read'],
        dataFilters: [
          { field: 'parent_id', constraint: 'own_data' }
        ]
      },
      {
        resource: 'attendance',
        actions: ['read'],
        dataFilters: [
          { field: 'parent_id', constraint: 'own_data' }
        ]
      },
      {
        resource: 'payments',
        actions: ['read'],
        dataFilters: [
          { field: 'parent_id', constraint: 'own_data' }
        ]
      },
      {
        resource: 'communications',
        actions: ['read'],
        dataFilters: [
          { field: 'recipient_type', constraint: 'own_data' }
        ]
      }
    ]
  }
]

// Security Implementation Class
export class RBACSecurityEngine {
  private auditLogs: SecurityAuditLog[] = []
  private activeSessions: Map<string, any> = new Map()
  private rateLimiters: Map<string, any> = new Map()

  // Core RBAC Methods
  async validateAccess(
    userId: string,
    resource: string,
    action: string,
    context?: any
  ): Promise<{ allowed: boolean; reason?: string }> {
    try {
      // Get user role and permissions
      const userRole = await this.getUserRole(userId)
      if (!userRole) {
        return { allowed: false, reason: 'User role not found' }
      }

      // Check session validity
      const sessionValid = await this.validateSession(userId)
      if (!sessionValid) {
        return { allowed: false, reason: 'Invalid or expired session' }
      }

      // Check rate limiting
      const rateLimitPassed = await this.checkRateLimit(userId, action)
      if (!rateLimitPassed) {
        return { allowed: false, reason: 'Rate limit exceeded' }
      }

      // Check IP restrictions
      const ipAllowed = await this.validateIpAccess(userId, context?.ipAddress)
      if (!ipAllowed) {
        return { allowed: false, reason: 'IP address not allowed' }
      }

      // Check MFA if required
      const mfaValid = await this.validateMFA(userId, userRole)
      if (!mfaValid) {
        return { allowed: false, reason: 'MFA verification required' }
      }

      // Check resource permissions
      const hasPermission = await this.checkResourcePermission(
        userRole,
        resource,
        action,
        context
      )
      
      if (!hasPermission) {
        return { allowed: false, reason: 'Insufficient permissions' }
      }

      // Log successful access
      await this.logSecurityEvent(userId, resource, action, 'success', 'low')

      return { allowed: true }

    } catch (error) {
      // Log security error
      await this.logSecurityEvent(userId, resource, action, 'failure', 'high')
      return { allowed: false, reason: 'Security validation error' }
    }
  }

  // Session Management
  async createSecureSession(
    userId: string,
    deviceInfo: any,
    ipAddress: string
  ): Promise<{ sessionId: string; expiresAt: number }> {
    const userRole = await this.getUserRole(userId)
    if (!userRole) throw new Error('User role not found')

    const sessionId = this.generateSecureSessionId()
    const expiresAt = Date.now() + (userRole.maxSessionDuration * 60 * 1000)

    const session = {
      userId,
      sessionId,
      ipAddress,
      deviceInfo,
      createdAt: Date.now(),
      expiresAt,
      lastActivity: Date.now(),
      role: userRole.id,
      mfaVerified: !userRole.requiresMfa // Will be updated after MFA
    }

    this.activeSessions.set(sessionId, session)

    // Set up automatic session cleanup
    setTimeout(() => {
      this.activeSessions.delete(sessionId)
    }, userRole.maxSessionDuration * 60 * 1000)

    await this.logSecurityEvent(userId, 'session', 'create', 'success', 'low')

    return { sessionId, expiresAt }
  }

  // Indian Compliance Features
  async enforceDataLocalisation(
    operation: string,
    dataType: 'student' | 'payment' | 'academic',
    data: any
  ): Promise<{ compliant: boolean; actions: string[] }> {
    const compliance = this.getComplianceRequirements()
    const actions: string[] = []

    // Check data residency requirements
    if (compliance.dataLocalisation.crossBorderDataTransfer === 'prohibited') {
      // Ensure data stays within Indian borders
      actions.push('Verify data center location')
      actions.push('Block international data transfers')
    }

    // Minor data protection (under 18)
    if (dataType === 'student' && data.age < 18) {
      if (!data.parentConsent) {
        return { 
          compliant: false, 
          actions: ['Obtain parent consent before processing'] 
        }
      }
      actions.push('Apply enhanced minor data protection')
    }

    // Financial data compliance
    if (dataType === 'payment') {
      actions.push('Ensure 10-year data retention')
      actions.push('Maintain detailed audit trail')
      actions.push('Comply with FEMA regulations')
    }

    // Academic data protection
    if (dataType === 'academic') {
      actions.push('Ensure 7-year data retention')
      actions.push('Protect exam data integrity')
      actions.push('Comply with RTE Act requirements')
    }

    return { compliant: true, actions }
  }

  // Advanced Security Features
  async detectAnomalousActivity(userId: string): Promise<{
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
    anomalies: string[]
    recommendations: string[]
  }> {
    const recentLogs = this.auditLogs
      .filter(log => log.userId === userId)
      .filter(log => Date.now() - log.timestamp < 24 * 60 * 60 * 1000) // Last 24 hours

    const anomalies: string[] = []
    const recommendations: string[] = []
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'

    // Check for unusual access patterns
    const uniqueIPs = new Set(recentLogs.map(log => log.ipAddress))
    if (uniqueIPs.size > 3) {
      anomalies.push('Multiple IP addresses detected')
      riskLevel = 'medium'
      recommendations.push('Verify user location and devices')
    }

    // Check for failed access attempts
    const failedAttempts = recentLogs.filter(log => log.result === 'failure')
    if (failedAttempts.length > 5) {
      anomalies.push('High number of failed access attempts')
      riskLevel = 'high'
      recommendations.push('Enable account lockout protection')
    }

    // Check for unusual time patterns
    const nightAccess = recentLogs.filter(log => {
      const hour = new Date(log.timestamp).getHours()
      return hour < 6 || hour > 23
    })
    if (nightAccess.length > 10) {
      anomalies.push('Unusual access times detected')
      riskLevel = 'medium'
      recommendations.push('Verify legitimate user activity')
    }

    // Check for privilege escalation attempts
    const privilegeAttempts = recentLogs.filter(log => 
      log.action.includes('admin') || log.action.includes('privilege')
    )
    if (privilegeAttempts.length > 0) {
      anomalies.push('Potential privilege escalation attempts')
      riskLevel = 'critical'
      recommendations.push('Immediate security review required')
    }

    return { riskLevel, anomalies, recommendations }
  }

  // Helper Methods
  private async getUserRole(userId: string): Promise<SecurityRole | null> {
    // In production, fetch from database
    // For now, return a default role
    return NEETCoachingRoles.find(role => role.id === 'student') || null
  }

  private async validateSession(userId: string): Promise<boolean> {
    // Check if user has an active, non-expired session
    for (const [sessionId, session] of this.activeSessions) {
      if (session.userId === userId && session.expiresAt > Date.now()) {
        // Update last activity
        session.lastActivity = Date.now()
        return true
      }
    }
    return false
  }

  private async checkRateLimit(userId: string, action: string): Promise<boolean> {
    const key = `${userId}:${action}`
    const now = Date.now()
    const window = 60 * 1000 // 1 minute window
    const limit = 100 // 100 requests per minute

    if (!this.rateLimiters.has(key)) {
      this.rateLimiters.set(key, [])
    }

    const requests = this.rateLimiters.get(key)
    
    // Remove old requests outside the window
    const validRequests = requests.filter((timestamp: number) => now - timestamp < window)
    
    if (validRequests.length >= limit) {
      return false
    }

    validRequests.push(now)
    this.rateLimiters.set(key, validRequests)
    
    return true
  }

  private async validateIpAccess(userId: string, ipAddress?: string): Promise<boolean> {
    if (!ipAddress) return true
    
    const userRole = await this.getUserRole(userId)
    if (!userRole?.allowedIpRanges) return true

    // Check if IP is in allowed ranges
    return userRole.allowedIpRanges.some(range => 
      this.isIpInRange(ipAddress, range)
    )
  }

  private async validateMFA(userId: string, role: SecurityRole): Promise<boolean> {
    if (!role.requiresMfa) return true
    
    // Check if MFA is verified for current session
    for (const [sessionId, session] of this.activeSessions) {
      if (session.userId === userId) {
        return session.mfaVerified || false
      }
    }
    
    return false
  }

  private async checkResourcePermission(
    role: SecurityRole,
    resource: string,
    action: string,
    context?: any
  ): Promise<boolean> {
    // Check if role has wildcard permission
    const wildcardPermission = role.permissions.find(p => p.resource === '*')
    if (wildcardPermission && wildcardPermission.actions.includes(action as any)) {
      return true
    }

    // Check specific resource permission
    const permission = role.permissions.find(p => p.resource === resource)
    if (!permission) return false

    // Check if action is allowed
    if (!permission.actions.includes(action as any)) return false

    // Check conditions if any
    if (permission.conditions) {
      for (const condition of permission.conditions) {
        if (!this.evaluateCondition(condition, context)) {
          return false
        }
      }
    }

    // Check data filters
    if (permission.dataFilters) {
      for (const filter of permission.dataFilters) {
        if (!this.evaluateDataFilter(filter, context)) {
          return false
        }
      }
    }

    return true
  }

  private evaluateCondition(condition: PermissionCondition, context: any): boolean {
    const contextValue = context?.[condition.field]
    
    switch (condition.operator) {
      case 'equals':
        return contextValue === condition.value
      case 'not_equals':
        return contextValue !== condition.value
      case 'in':
        return Array.isArray(condition.value) && condition.value.includes(contextValue)
      case 'not_in':
        return Array.isArray(condition.value) && !condition.value.includes(contextValue)
      case 'greater_than':
        return contextValue > condition.value
      case 'less_than':
        return contextValue < condition.value
      default:
        return false
    }
  }

  private evaluateDataFilter(filter: DataFilter, context: any): boolean {
    switch (filter.constraint) {
      case 'own_data':
        return context?.userId === context?.[filter.field]
      case 'team_data':
        return context?.teamMembers?.includes(context?.userId)
      case 'department_data':
        return context?.department === context?.userDepartment
      case 'public_data':
        return true
      default:
        return false
    }
  }

  private async logSecurityEvent(
    userId: string,
    resource: string,
    action: string,
    result: 'success' | 'failure' | 'blocked',
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
  ): Promise<void> {
    const logEntry: SecurityAuditLog = {
      id: this.generateId(),
      userId,
      action,
      resource,
      result,
      riskLevel,
      ipAddress: 'unknown', // Would be populated from request
      userAgent: 'unknown', // Would be populated from request
      sessionId: 'unknown', // Would be populated from session
      timestamp: Date.now(),
      complianceFlags: this.getComplianceFlags(resource, action)
    }

    this.auditLogs.push(logEntry)

    // Alert on high/critical risk events
    if (riskLevel === 'high' || riskLevel === 'critical') {
      await this.sendSecurityAlert(logEntry)
    }
  }

  private getComplianceRequirements(): ComplianceFramework {
    return {
      dataLocalisation: {
        studentDataRetention: 7 * 365 * 24 * 60 * 60 * 1000, // 7 years
        parentConsentRequired: true,
        minorDataProtection: true,
        crossBorderDataTransfer: 'prohibited'
      },
      financialCompliance: {
        femaCompliance: true,
        gstCompliance: true,
        paymentDataRetention: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
        auditTrailRequired: true
      },
      educationalCompliance: {
        rteCompliance: true,
        ugcGuidelines: true,
        studentPrivacyProtection: true,
        examDataSecurity: true
      }
    }
  }

  private getComplianceFlags(resource: string, action: string): string[] {
    const flags: string[] = []
    
    if (resource.includes('student') || resource.includes('academic')) {
      flags.push('RTE_ACT', 'STUDENT_PRIVACY')
    }
    
    if (resource.includes('payment') || resource.includes('financial')) {
      flags.push('FEMA_COMPLIANCE', 'GST_COMPLIANCE')
    }
    
    if (action === 'delete' || action === 'export') {
      flags.push('DATA_RETENTION', 'AUDIT_REQUIRED')
    }
    
    return flags
  }

  private generateSecureSessionId(): string {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private generateId(): string {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private isIpInRange(ip: string, range: string): boolean {
    // Simplified IP range check - would use proper CIDR logic in production
    return range === '*' || ip.startsWith(range.split('/')[0])
  }

  private async sendSecurityAlert(logEntry: SecurityAuditLog): Promise<void> {
    // Send alert to security team
    console.log('SECURITY ALERT:', logEntry)
  }
}

// Export singleton instance
export const rbacEngine = new RBACSecurityEngine()