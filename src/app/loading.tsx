export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex flex-col items-center gap-4">
        {/* Logo placeholder */}
        <div className="w-16 h-16 bg-blue-600 rounded-full animate-pulse" />

        {/* Loading spinner */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
        </div>

        {/* Loading text */}
        <p className="text-gray-600 text-sm font-medium">Loading...</p>
      </div>
    </div>
  )
}
