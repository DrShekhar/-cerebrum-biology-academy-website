/**
 * ChatbotSkeleton - Loading placeholder for AI Chatbot component
 * Displays a skeleton UI while the chatbot is being loaded dynamically
 */
export function ChatbotSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
      {/* Header skeleton */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>

      {/* Chat messages skeleton */}
      <div className="space-y-3 mb-4 h-[300px] overflow-hidden">
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
          <div className="bg-gray-100 rounded-lg p-3 flex-1">
            <div className="h-3 bg-gray-200 rounded w-full mb-2" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <div className="bg-blue-100 rounded-lg p-3 max-w-[70%]">
            <div className="h-3 bg-blue-200 rounded w-full mb-2" />
            <div className="h-3 bg-blue-200 rounded w-2/3" />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
          <div className="bg-gray-100 rounded-lg p-3 flex-1">
            <div className="h-3 bg-gray-200 rounded w-full mb-2" />
            <div className="h-3 bg-gray-200 rounded w-4/5 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>

      {/* Input skeleton */}
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  )
}
