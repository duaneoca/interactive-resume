import SectionHeader from './SectionHeader'

export default function Education({ data, onExpand }) {
  return (
    <section>
      <SectionHeader title="Education" />
      <div className="space-y-2">
        {data.map((edu) => (
          <div
            key={edu.id}
            onClick={() =>
              onExpand({
                type: 'Education',
                title: edu.degree,
                subtitle: edu.school,
                content: `${edu.degree} from ${edu.school}.`,
                chatPrompt: `Tell me about your education at ${edu.school} and how it shaped your career.`,
              })
            }
            className="group flex items-baseline gap-4 cursor-pointer rounded-xl px-5 py-3.5 -mx-5 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200"
          >
            <span className="font-semibold text-slate-900 dark:text-white">{edu.degree}</span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-slate-600 dark:text-slate-300">{edu.school}</span>
            <svg
              className="w-3.5 h-3.5 text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
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
