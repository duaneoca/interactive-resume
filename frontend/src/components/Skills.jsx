import SectionHeader from './SectionHeader'

export default function Skills({ data, onExpand }) {
  return (
    <section>
      <SectionHeader title="Skills" />
      <div className="space-y-2">
        {data.map((skillGroup) => (
          <div
            key={skillGroup.id}
            onClick={() =>
              onExpand({
                type: 'Skill Area',
                title: skillGroup.category,
                content: skillGroup.items,
                chatPrompt: `Tell me more about your ${skillGroup.category} skills and how you've applied them.`,
              })
            }
            className="group flex items-start gap-6 cursor-pointer rounded-xl px-5 py-3.5 -mx-5 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200"
          >
            <div className="w-44 shrink-0 text-sm font-semibold text-slate-700 dark:text-slate-200 pt-0.5">
              {skillGroup.category}
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {skillGroup.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 group-hover:bg-slate-50 dark:group-hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs rounded-full transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
            <svg
              className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        ))}
      </div>
    </section>
  )
}
