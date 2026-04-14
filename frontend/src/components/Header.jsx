export default function Header({ data, onOpenEvaluator }) {
  const { name, contact } = data
  return (
    <header>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">{name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-slate-500 dark:text-slate-400">
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-blue-600 transition-colors"
            >
              {contact.email}
            </a>
            <span className="text-slate-300">·</span>
            <span>{contact.phone}</span>
            <span className="text-slate-300">·</span>
            <span>{contact.location}</span>
            <span className="text-slate-300">·</span>
            <a
              href={`https://${contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              {contact.github}
            </a>
          </div>
        </div>
        <button
          onClick={onOpenEvaluator}
          className="shrink-0 mt-1 flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Evaluate for a Role →
        </button>
      </div>
      <div className="mt-8 border-t-2 border-blue-600" />
    </header>
  )
}
