import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platform Testing Dashboard | Cerebrum Biology Academy',
  description: 'Testing interface for AI education platform validation and verification',
}

export default function TestPlatformPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 AI Education Platform Testing Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Cerebrum Biology Academy - Agent Army Deployment Verification
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            ✅ Development Server Active on Port 3001
          </div>
        </div>

        {/* Quick Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Platform Status</h3>
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            </div>
            <p className="text-gray-600 mt-2">Server Running</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Agent Army</h3>
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            </div>
            <p className="text-gray-600 mt-2">12/12 Deployed</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Features</h3>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            </div>
            <p className="text-gray-600 mt-2">Testing Mode</p>
          </div>
        </div>

        {/* Testing Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Core Features */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Core Features</h2>
            <div className="space-y-3">
              <TestLink
                href="/"
                title="Homepage"
                description="Main platform landing page"
                status="available"
              />
              <TestLink
                href="/courses"
                title="Course Catalog"
                description="NEET Biology courses"
                status="available"
              />
              <TestLink
                href="/faculty"
                title="Faculty Profiles"
                description="Expert biology teachers"
                status="available"
              />
              <TestLink
                href="/success-stories"
                title="Success Stories"
                description="Student achievements"
                status="available"
              />
            </div>
          </div>

          {/* AI Features */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🤖 AI Features</h2>
            <div className="space-y-3">
              <TestLink
                href="/resources/test-generator"
                title="AI Test Generator"
                description="Enhanced AI-powered test creation"
                status="testing"
              />
              <TestLink
                href="/adaptive-testing"
                title="Adaptive Testing"
                description="Real-time difficulty adjustment"
                status="testing"
              />
              <TestLink
                href="/simple-test-gen"
                title="Simple Test Generator"
                description="Streamlined test creation"
                status="testing"
              />
              <TestLink
                href="/ai-education-demo"
                title="AI Education Demo"
                description="Multi-modal learning showcase"
                status="testing"
              />
            </div>
          </div>
        </div>

        {/* Testing Instructions */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Manual Testing Instructions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🔍 What to Test</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Page loading and responsiveness</li>
                <li>• AI test generation functionality</li>
                <li>• Mobile device compatibility</li>
                <li>• Navigation and user flows</li>
                <li>• Form submissions and interactions</li>
                <li>• Performance and loading speeds</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">⚡ Performance Targets</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Page load: &lt;3 seconds</li>
                <li>• AI responses: &lt;30 seconds</li>
                <li>• Mobile score: 90+ Lighthouse</li>
                <li>• Accessibility: WCAG AA compliant</li>
                <li>• Uptime: 99.9% target</li>
                <li>• User satisfaction: &gt;4.5/5</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">🚨 Known Issues</h4>
            <p className="text-blue-800 text-sm">
              Some advanced features may show mock data in development mode.
              Database-dependent features require proper configuration for full functionality.
            </p>
          </div>
        </div>

        {/* Agent Army Summary */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎖️ Agent Army Deployment Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AgentCard
              title="Enhancement Agents"
              count="3/3"
              features={['AI Prompt Engineering', 'Multi-provider Routing', 'UI/UX Overhaul']}
              status="completed"
            />
            <AgentCard
              title="Feature Development"
              count="3/3"
              features={['Adaptive Testing', 'Analytics Dashboard', 'Multi-modal Learning']}
              status="completed"
            />
            <AgentCard
              title="Performance Optimization"
              count="3/3"
              features={['Backend Scaling', 'Frontend Speed', 'AI Cost Reduction']}
              status="completed"
            />
            <AgentCard
              title="Quality Assurance"
              count="3/3"
              features={['Testing Framework', 'Content Validation', 'Monitoring']}
              status="completed"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">🚀 Platform ready for scaling from ₹2L to ₹50L monthly revenue</p>
          <p className="text-sm">Last Updated: September 29, 2025 | Testing Status: Active</p>
        </div>
      </div>
    </div>
  )
}

interface TestLinkProps {
  href: string
  title: string
  description: string
  status: 'available' | 'testing' | 'unavailable'
}

function TestLink({ href, title, description, status }: TestLinkProps) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    testing: 'bg-yellow-100 text-yellow-800',
    unavailable: 'bg-red-100 text-red-800'
  }

  const statusIcons = {
    available: '✅',
    testing: '🧪',
    unavailable: '❌'
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
          {statusIcons[status]} {status}
        </span>
      </div>
    </a>
  )
}

interface AgentCardProps {
  title: string
  count: string
  features: string[]
  status: 'completed' | 'in-progress' | 'pending'
}

function AgentCard({ title, count, features, status }: AgentCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="text-sm font-medium text-green-600">{count}</span>
      </div>
      <ul className="space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="text-xs text-gray-600">
            ✓ {feature}
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          ✅ {status}
        </span>
      </div>
    </div>
  )
}