import { useState, useEffect, useRef } from 'react'

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const CATEGORIES = [
  {
    key: 'strong',
    label: 'Strong Match',
    icon: '✓',
    colors: {
      header: 'text-green-700 dark:text-green-400',
      icon: 'text-green-600 dark:text-green-400',
      card: 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800',
      area: 'text-green-900 dark:text-green-200',
      rationale: 'text-green-800 dark:text-green-300',
    },
  },
  {
    key: 'transferable',
    label: 'Transferable',
    icon: '⟷',
    colors: {
      header: 'text-amber-700 dark:text-amber-400',
      icon: 'text-amber-600 dark:text-amber-400',
      card: 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800',
      area: 'text-amber-900 dark:text-amber-200',
      rationale: 'text-amber-800 dark:text-amber-300',
    },
  },
  {
    key: 'gaps',
    label: 'Gap',
    icon: '△',
    colors: {
      header: 'text-slate-600 dark:text-slate-400',
      icon: 'text-slate-500 dark:text-slate-400',
      card: 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
      area: 'text-slate-800 dark:text-slate-200',
      rationale: 'text-slate-600 dark:text-slate-400',
    },
  },
]

export default function EvaluatorModal({ isOpen, onClose, onOpenChat }) {
  const [phase, setPhase] = useState('input') // 'input' | 'loading' | 'results'
  const [jobDescription, setJobDescription] = useState('')
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const textareaRef = useRef(null)

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhase('input')
      setResults(null)
      setError(null)
      setTimeout(() => textareaRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleEvaluate = async () => {
    if (!jobDescription.trim()) return
    setPhase('loading')
    setError(null)

    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_description: jobDescription }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail ?? `Server error ${res.status}`)
      }

      const data = await res.json()
      setResults(data)
      setPhase('results')
    } catch (e) {
      setError(e.message)
      setPhase('input')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleEvaluate()
    }
  }

  const handleAskFollowUp = () => {
    onClose()
    onOpenChat(
      'Role Fit Evaluation',
      'I just reviewed the role fit evaluation. Can you tell me more about how Duane\'s background relates to this type of role?'
    )
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100 dark:border-slate-700 shrink-0">
            {phase === 'results' && (
              <button
                onClick={() => setPhase('input')}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Back"
              >
                <BackIcon />
              </button>
            )}
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Role Fit Evaluator
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                {phase === 'input' || phase === 'loading'
                  ? 'Paste a job description to see how well Duane matches the role'
                  : 'Here\'s how Duane\'s background maps to this role'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">

            {/* ── Phase: Input ── */}
            {(phase === 'input' || phase === 'loading') && (
              <div className="p-6 flex flex-col gap-4">
                <textarea
                  ref={textareaRef}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={phase === 'loading'}
                  placeholder="Paste the full job description here…"
                  className="w-full h-72 resize-none rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-60"
                />
                {error && (
                  <p className="text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Tip: ⌘ Enter to evaluate
                  </p>
                  <button
                    onClick={handleEvaluate}
                    disabled={!jobDescription.trim() || phase === 'loading'}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    {phase === 'loading' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Evaluating…
                      </>
                    ) : (
                      'Evaluate →'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ── Phase: Results ── */}
            {phase === 'results' && results && (
              <div className="p-6 flex flex-col gap-6">

                {/* Summary */}
                <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-5 py-4">
                  <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
                    {results.summary}
                  </p>
                </div>

                {/* Three columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {CATEGORIES.map((cat) => {
                    const items = results[cat.key] ?? []
                    return (
                      <div key={cat.key} className="flex flex-col gap-2">
                        {/* Column header */}
                        <div className={`flex items-center gap-1.5 mb-1 ${cat.colors.header}`}>
                          <span className="text-base font-semibold">{cat.icon}</span>
                          <span className="text-xs font-semibold uppercase tracking-wider">
                            {cat.label}
                          </span>
                          <span className="ml-auto text-xs opacity-60">
                            {items.length}
                          </span>
                        </div>

                        {/* Items */}
                        {items.length === 0 ? (
                          <p className="text-xs text-slate-400 dark:text-slate-500 italic px-1">
                            None identified
                          </p>
                        ) : (
                          items.map((item, i) => (
                            <div key={i} className={`rounded-lg px-3 py-2.5 ${cat.colors.card}`}>
                              <p className={`text-xs font-semibold mb-1 ${cat.colors.area}`}>
                                {item.area}
                              </p>
                              <p className={`text-xs leading-relaxed ${cat.colors.rationale}`}>
                                {item.rationale}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Follow-up */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Want to dig deeper on any of these?
                  </p>
                  <button
                    onClick={handleAskFollowUp}
                    className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3-3-3z" />
                    </svg>
                    Ask about this role →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
