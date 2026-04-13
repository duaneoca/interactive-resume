import SectionHeader from './SectionHeader'

const ExpandIcon = () => (
  <svg
    className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

export default function Experience({ data, onExpand }) {
  return (
    <section>
      <SectionHeader title="Experience" />
      <div className="space-y-12">
        {data.map((job) => (
          <div key={job.id}>
            {/* Job header */}
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-lg font-bold text-slate-900">{job.company}</h3>
              <span className="text-sm text-slate-400 shrink-0 ml-4">{job.period}</span>
            </div>
            <p className="text-sm text-slate-500 italic mb-6">{job.roles}</p>

            {/* Sectioned experience (Responsys/Oracle) */}
            {job.sections ? (
              <div className="space-y-7">
                {job.sections.map((section) => (
                  <div key={section.id}>
                    <div
                      onClick={() =>
                        onExpand({
                          type: 'Experience',
                          title: `${job.company} — ${section.title}`,
                          subtitle: section.period,
                          content: section.bullets,
                          chatPrompt: `Tell me more about your work during the "${section.title}" period at ${job.company}.`,
                        })
                      }
                      className="group flex items-baseline gap-3 cursor-pointer mb-3 w-fit"
                    >
                      <h4 className="text-sm font-semibold text-slate-700">{section.title}</h4>
                      <span className="text-xs text-slate-400">{section.period}</span>
                      <ExpandIcon />
                    </div>
                    <ul className="space-y-2.5">
                      {section.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          onClick={() =>
                            onExpand({
                              type: 'Experience Detail',
                              title: `${section.title} (${section.period})`,
                              subtitle: job.company,
                              content: bullet,
                              chatPrompt: `Tell me more about: "${bullet.substring(0, 80)}..."`,
                            })
                          }
                          className="group flex gap-3.5 cursor-pointer rounded-xl px-4 py-2.5 -mx-4 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all duration-200"
                        >
                          <span className="text-blue-300 mt-1 shrink-0 text-xs">▸</span>
                          <span className="text-slate-600 text-[15px] leading-relaxed flex-1 group-hover:text-slate-800 transition-colors">
                            {bullet}
                          </span>
                          <ExpandIcon />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              /* Single-section experience (Extensity) */
              <ul className="space-y-2.5">
                {job.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    onClick={() =>
                      onExpand({
                        type: 'Experience Detail',
                        title: job.company,
                        subtitle: job.period,
                        content: bullet,
                        chatPrompt: `Tell me more about: "${bullet.substring(0, 80)}..."`,
                      })
                    }
                    className="group flex gap-3.5 cursor-pointer rounded-xl px-4 py-2.5 -mx-4 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all duration-200"
                  >
                    <span className="text-blue-300 mt-1 shrink-0 text-xs">▸</span>
                    <span className="text-slate-600 text-[15px] leading-relaxed flex-1 group-hover:text-slate-800 transition-colors">
                      {bullet}
                    </span>
                    <ExpandIcon />
                  </li>
                ))}
              </ul>
            )}

            {/* Notable customers */}
            {job.notableCustomers && (
              <div className="mt-5 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  Notable Customers
                </span>
                <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                  {job.notableCustomers.join(' · ')}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
