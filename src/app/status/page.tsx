export default function StatusPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Platform Status: ACTIVE</h1>
          <p className="text-gray-600 mb-6">Cerebrum Biology Academy - AI Education Platform</p>

          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="font-medium">Development Server</span>
              <span className="text-green-600">✅ Running on Port 3001</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="font-medium">Agent Army</span>
              <span className="text-green-600">✅ 12/12 Deployed</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
              <span className="font-medium">Database</span>
              <span className="text-yellow-600">⚠️ Configuration Needed</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="font-medium">Testing Dashboard</span>
              <span className="text-green-600">✅ Available</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Available Features:</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <a href="/" className="p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                🏠 Homepage
              </a>
              <a
                href="/courses"
                className="p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
              >
                📚 Courses
              </a>
              <a
                href="/faculty"
                className="p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
              >
                👨‍🏫 Faculty
              </a>
              <a
                href="/success-stories"
                className="p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
              >
                🏆 Success Stories
              </a>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Some advanced AI features may require database configuration
              and proper API keys for full functionality in development mode.
            </p>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            Last Updated: September 29, 2025 | Status: Development Mode
          </div>
        </div>
      </div>
    </div>
  )
}
