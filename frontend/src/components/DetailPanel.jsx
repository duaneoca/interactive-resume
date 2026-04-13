const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChatIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3-3-3z" />
  </svg>
)

export default function DetailPanel({ item, onClose, onAskAboutThis }) {
  const isOpen = !!item

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700">
          {item ? (
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              {item.type}
            </span>
          ) : (
            <span />
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Close panel"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {item && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                {item.title}
              </h2>
              {item.subtitle && (
                <p className="text-sm text-slate-400 dark:text-slate-500 mb-5 italic">{item.subtitle}</p>
              )}

              <div className="mt-5 text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed space-y-4">
                {Array.isArray(item.content) ? (
                  <ul className="space-y-3">
                    {item.content.map((line, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-blue-400 shrink-0 mt-1 text-xs">▸</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.content}</p>
                )}
              </div>

              <div className="mt-8 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  Have questions? The AI assistant can go deeper on any part of Duane's background.
                </p>
                <button
                  onClick={() => onAskAboutThis(item)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <ChatIcon />
                  <span>Ask about this</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
