/**
 * Dependency Auditor Tool
 *
 * Checks for outdated and vulnerable dependencies.
 */
interface AuditParams {
  checkSecurity?: boolean
  checkOutdated?: boolean
}
export declare function auditDependencies(params: AuditParams): Promise<{
  content: {
    type: string
    text: string
  }[]
}>
export {}
//# sourceMappingURL=dependency-auditor.d.ts.map
