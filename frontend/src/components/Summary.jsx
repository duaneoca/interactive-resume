import SectionHeader from './SectionHeader'

export default function Summary({ data, onExpand }) {
  const handleClick = () => {
    onExpand({
      type: 'Summary',
      title: 'Professional Summary',
      content: data,
      chatPrompt: 'Tell me more about your overall career trajectory and what drives you professionally.',
    })
  }

  return (
    <section>
      <SectionHeader title="Summary" />
      <div
        onClick={handleClick}
        className="group cursor-pointer rounded-xl p-5 -mx-5 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">{data}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>expand</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </span>
      </div>
    </section>
  )
}
