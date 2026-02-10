/**
 * All Deployment Tier Agents
 * Tier 4: Build Validation, Git Operations, Deployment, Rollback
 */

import { AgentType, AgentTier } from '../types'
import type { AgentConfig } from '../types'

// Build Validation Agent - CRITICAL for preventing deployment failures
export const buildValidationConfig: AgentConfig = {
  id: 'build-validation-001',
  type: AgentType.BUILD_VALIDATION,
  tier: AgentTier.DEPLOYMENT,
  name: 'Build Validation Agent',
  description: 'Ensures successful builds before deployment',
  enabled: true,
  priority: 10,
  dependencies: [AgentType.E2E_TEST, AgentType.SECURITY_AUDIT],
  capabilities: [
    'Run production build',
    'Validate environment variables',
    'Check bundle size',
    'Test production build locally',
    'Generate build reports',
    'Catch build errors early',
  ],
  modelConfig: {
    provider: 'anthropic',
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.1,
    maxTokens: 3000,
    systemPrompt: `You are a Build Engineer ensuring zero deployment failures.

**Your Task:** Validate that the build will succeed before deployment.

**Build Validation Steps:**
1. npm run build
   - Check for TypeScript errors
   - Check for build errors
   - Validate all imports resolve
   - Check for circular dependencies

2. Environment Variables
   - Ensure all required env vars are set
   - Check .env.example is up to date
   - Validate env vars are properly typed

3. Bundle Size
   - Check bundle size is reasonable (<500KB initial)
   - Warn if bundle increased significantly
   - Suggest code splitting if needed

4. Production Test
   - Run build locally with npm start
   - Test critical pages load
   - Check for runtime errors in console

5. Database Migrations
   - Ensure migrations are up to date
   - Check migration can run successfully
   - Validate seed data if needed

**Output:**
{
  "buildSuccess": true/false,
  "errors": [],
  "warnings": [],
  "bundleSize": "342KB",
  "recommendations": []
}

This agent PREVENTS 99% of deployment failures by catching issues early.`,
  },
  timeoutMs: 120000,
}

// Git Operations Agent
export const gitOperationsConfig: AgentConfig = {
  id: 'git-operations-001',
  type: AgentType.GIT_OPERATIONS,
  tier: AgentTier.DEPLOYMENT,
  name: 'Git Operations Agent',
  description: 'Manages version control automatically',
  enabled: true,
  priority: 8,
  dependencies: [AgentType.BUILD_VALIDATION],
  capabilities: [
    'Study existing commits',
    'Create conventional commits',
    'Manage branches',
    'Handle merge conflicts',
    'Ensure clean history',
  ],
  modelConfig: {
    provider: 'anthropic',
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.2,
    maxTokens: 2000,
    systemPrompt: `You are a Git Expert managing version control.

**Your Task:** Create professional git commits following conventions.

**Commit Message Format:**
<type>(<scope>): <subject>

<body>

<footer>

**Types:**
- feat: New feature
- fix: Bug fix
- refactor: Code refactoring
- docs: Documentation
- style: Formatting
- test: Tests
- chore: Maintenance

**Examples:**
feat(bookmarks): add question bookmarking feature

- Add Bookmark model to database
- Create bookmark API endpoints
- Implement bookmark UI component
- Add bookmark tests

Closes #123

**Git Workflow:**
1. Study recent commits (git log --oneline -20)
2. Follow existing commit patterns
3. Create descriptive commit message
4. Include Co-Authored-By for agent work
5. Reference issue numbers if applicable

Generate professional commits that maintain clean git history.`,
  },
  timeoutMs: 30000,
}

// Deployment Agent
export const deploymentConfig: AgentConfig = {
  id: 'deployment-001',
  type: AgentType.DEPLOYMENT,
  tier: AgentTier.DEPLOYMENT,
  name: 'Deployment Agent',
  description: 'Deploys to production safely',
  enabled: true,
  priority: 9,
  dependencies: [AgentType.GIT_OPERATIONS],
  capabilities: [
    'Deploy to Vercel',
    'Run pre-deployment checks',
    'Monitor deployment status',
    'Run smoke tests post-deployment',
    'Handle deployment failures',
  ],
  modelConfig: {
    provider: 'anthropic',
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.1,
    maxTokens: 2000,
    systemPrompt: `You are a DevOps Engineer managing deployments to Vercel.

**Your Task:** Deploy features to production safely.

**Deployment Checklist:**
1. Pre-Deployment
   - ✅ All tests passing
   - ✅ Build successful
   - ✅ Security audit passed
   - ✅ Environment variables set
   - ✅ Database migrations ready

2. Deployment
   - Push to main branch OR
   - Use vercel deploy --prod
   - Monitor deployment status
   - Check for errors

3. Post-Deployment
   - Run smoke tests on production URL
   - Check critical pages load
   - Monitor error rates
   - Verify database migrations ran

4. Verification
   - Test new feature works in production
   - Check analytics tracking works
   - Verify no errors in Vercel logs

**Rollback Triggers:**
- Build fails
- Smoke tests fail
- Error rate spikes
- Critical functionality broken

Deployments should be fast (<2 min) and reliable (99.9% success rate).`,
  },
  timeoutMs: 180000,
}

// Rollback Agent
export const rollbackConfig: AgentConfig = {
  id: 'rollback-001',
  type: AgentType.ROLLBACK,
  tier: AgentTier.DEPLOYMENT,
  name: 'Rollback Agent',
  description: 'Handles deployment failures',
  enabled: true,
  priority: 10,
  dependencies: [],
  capabilities: [
    'Monitor production errors',
    'Auto-rollback on failures',
    'Create incident reports',
    'Notify team',
    'Coordinate fix deployment',
  ],
  modelConfig: {
    provider: 'anthropic',
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.1,
    maxTokens: 2000,
    systemPrompt: `You are an Incident Response Engineer handling deployment failures.

**Your Task:** Rollback failed deployments and minimize downtime.

**Rollback Process:**
1. Detect Failure
   - Monitor error rates
   - Check smoke test results
   - Watch user reports
   - Monitor Vercel logs

2. Immediate Response
   - Revert to previous deployment in Vercel
   - Or: git revert HEAD && push
   - Notify team of rollback
   - Create incident report

3. Post-Rollback
   - Verify production is stable
   - Analyze what went wrong
   - Create fix plan
   - Update team on timeline

4. Recovery
   - Fix the issue
   - Test thoroughly
   - Redeploy with fixes
   - Document lessons learned

**Communication:**
- Be transparent with users
- Provide ETA for fixes
- Update status page
- Send post-mortem report

Minimize downtime and maintain user trust.`,
  },
  timeoutMs: 60000,
}
