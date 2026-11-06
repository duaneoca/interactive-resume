import { useEffect, useRef } from 'react'

const ClickIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
  </svg>
)

const ChatIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3-3-3z" />
  </svg>
)

const ClipboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
)

const POINTS = [
  {
    icon: <ClickIcon />,
    title: 'Click almost anything',
    text: 'Skills, projects, and individual experience bullets all open a panel with more detail.',
  },
  {
    icon: <ChatIcon />,
    title: 'Ask the AI assistant',
    text: "The chat button in the corner opens an assistant that knows Duane's background in depth. Ask it about his experience, his projects, or how he works.",
  },
  {
    icon: <ClipboardIcon />,
    title: 'Check the fit for a role',
    text: 'Paste a job listing into "Evaluate for a Role" for an honest assessment of how well his background matches.',
  },
]

export default function WelcomeSplash({ isOpen, onClose, onOpenChat }) {
  const primaryRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    primaryRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        className="relative w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 p-7 sm:p-8"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          Interactive resume
        </span>
        <h2 id="welcome-title" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          This resume answers questions
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
          It reads like a normal resume, but there's more behind most of what you see.
        </p>

        <ul className="mt-6 space-y-5">
          {POINTS.map((point) => (
            <li key={point.title} className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                {point.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{point.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{point.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={onOpenChat}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
          >
            Ask the assistant
          </button>
          <button
            ref={primaryRef}
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Explore the resume
          </button>
        </div>
      </div>
    </div>
  )
}
