/**
 * Dependency Auditor Tool
 *
 * Checks for outdated and vulnerable dependencies.
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

interface AuditParams {
  checkSecurity?: boolean
  checkOutdated?: boolean
}

export async function auditDependencies(params: AuditParams) {
  const { checkSecurity = true, checkOutdated = true } = params

  const projectRoot = process.env.CEREBRUM_PROJECT_ROOT || process.cwd()

  let output = '## Dependency Audit Report\n\n'

  // Security audit
  if (checkSecurity) {
    output += '### 🔒 Security Vulnerabilities\n\n'

    try {
      const { stdout, stderr } = await execAsync('npm audit --json', {
        cwd: projectRoot,
        maxBuffer: 1024 * 1024 * 10,
      })

      const auditResult = JSON.parse(stdout)

      if (auditResult.metadata?.vulnerabilities) {
        const vulns = auditResult.metadata.vulnerabilities
        const total = vulns.critical + vulns.high + vulns.moderate + vulns.low

        if (total === 0) {
          output += '✅ No vulnerabilities found!\n\n'
        } else {
          output += `Found **${total}** vulnerabilities:\n\n`
          output += `| Severity | Count |\n|----------|-------|\n`
          if (vulns.critical > 0) output += `| 🔴 Critical | ${vulns.critical} |\n`
          if (vulns.high > 0) output += `| 🟠 High | ${vulns.high} |\n`
          if (vulns.moderate > 0) output += `| 🟡 Moderate | ${vulns.moderate} |\n`
          if (vulns.low > 0) output += `| 🟢 Low | ${vulns.low} |\n`
          output += '\n'

          // List critical and high vulnerabilities
          if (auditResult.vulnerabilities) {
            const criticalVulns = Object.entries(auditResult.vulnerabilities).filter(
              ([, v]: [string, any]) => v.severity === 'critical' || v.severity === 'high'
            )

            if (criticalVulns.length > 0) {
              output += '**Critical/High Issues:**\n'
              for (const [pkg, data] of criticalVulns.slice(0, 5) as [string, any][]) {
                output += `- \`${pkg}\`: ${data.severity} - ${data.via?.[0]?.title || 'Unknown issue'}\n`
              }
              output += '\n'
            }
          }

          output += '**Fix command:** `npm audit fix`\n\n'
        }
      }
    } catch (error) {
      // npm audit returns non-zero exit code when vulnerabilities found
      if (error instanceof Error && 'stdout' in error) {
        try {
          const auditResult = JSON.parse((error as any).stdout)
          if (auditResult.metadata?.vulnerabilities) {
            const vulns = auditResult.metadata.vulnerabilities
            output += `Found vulnerabilities: ${vulns.critical} critical, ${vulns.high} high, ${vulns.moderate} moderate, ${vulns.low} low\n\n`
          }
        } catch {
          output += '⚠️ Could not parse audit results\n\n'
        }
      } else {
        output += '⚠️ Security audit failed\n\n'
      }
    }
  }

  // Outdated packages
  if (checkOutdated) {
    output += '### 📦 Outdated Packages\n\n'

    try {
      const { stdout } = await execAsync('npm outdated --json', {
        cwd: projectRoot,
        maxBuffer: 1024 * 1024 * 10,
      })

      if (stdout.trim()) {
        const outdated = JSON.parse(stdout)
        const packages = Object.entries(outdated)

        if (packages.length === 0) {
          output += '✅ All packages are up to date!\n\n'
        } else {
          output += `Found **${packages.length}** outdated packages:\n\n`
          output += '| Package | Current | Wanted | Latest |\n|---------|---------|--------|--------|\n'

          // Sort by importance (major updates first)
          const sorted = packages.sort(([, a]: [string, any], [, b]: [string, any]) => {
            const aMajor = a.current?.split('.')[0] !== a.latest?.split('.')[0]
            const bMajor = b.current?.split('.')[0] !== b.latest?.split('.')[0]
            if (aMajor && !bMajor) return -1
            if (!aMajor && bMajor) return 1
            return 0
          })

          for (const [pkg, data] of sorted.slice(0, 15) as [string, any][]) {
            const isMajor = data.current?.split('.')[0] !== data.latest?.split('.')[0]
            const icon = isMajor ? '🔴' : '🟡'
            output += `| ${icon} \`${pkg}\` | ${data.current} | ${data.wanted} | ${data.latest} |\n`
          }

          if (packages.length > 15) {
            output += `\n*...and ${packages.length - 15} more*\n`
          }

          output += '\n**Update command:** `npm update` (safe) or `npm install <pkg>@latest` (major)\n'
        }
      } else {
        output += '✅ All packages are up to date!\n\n'
      }
    } catch (error) {
      // npm outdated returns non-zero when outdated packages exist
      if (error instanceof Error && 'stdout' in error) {
        try {
          const outdated = JSON.parse((error as any).stdout || '{}')
          const count = Object.keys(outdated).length
          output += `Found **${count}** outdated packages. Run \`npm outdated\` for details.\n\n`
        } catch {
          output += '✅ All packages appear to be up to date!\n\n'
        }
      }
    }
  }

  // Summary
  output += '---\n\n'
  output += '### Recommendations\n\n'
  output += '1. Run `npm audit fix` to auto-fix vulnerabilities\n'
  output += '2. Review major version updates carefully before upgrading\n'
  output += '3. Test thoroughly after any dependency updates\n'
  output += '4. Consider adding Dependabot or Renovate for automated updates\n'

  return {
    content: [{ type: 'text', text: output }],
  }
}
