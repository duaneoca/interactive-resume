import { useState } from 'react'

export default function ChatFab() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-30">
      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-slate-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
          AI assistant coming soon
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
        </div>
      )}
      <button
        onClick={() => setShowTooltip((v) => !v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        aria-label="Open AI assistant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3-3-3z"
          />
        </svg>
      </button>
    </div>
  )
}
