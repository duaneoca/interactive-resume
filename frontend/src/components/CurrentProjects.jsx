import SectionHeader from './SectionHeader'

export default function CurrentProjects({ data, onExpand }) {
  return (
    <section>
      <SectionHeader title="Current Projects & Learning" />
      <p className="text-sm text-slate-500 mb-5 -mt-2">
        Actively building hands-on experience in AI and modern infrastructure:
      </p>
      <ul className="space-y-2">
        {data.map((project) => (
          <li
            key={project.id}
            onClick={() =>
              onExpand({
                type: 'Project',
                title: project.text.split(' — ')[0],
                content: project.text,
                chatPrompt: project.chatPrompt,
              })
            }
            className="group flex gap-4 cursor-pointer rounded-xl px-5 py-3.5 -mx-5 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all duration-200"
          >
            <span className="text-blue-400 mt-1 shrink-0">▸</span>
            <span className="text-slate-600 text-[15px] leading-relaxed flex-1 group-hover:text-slate-800 transition-colors">
              {project.text}
            </span>
            <svg
              className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </li>
        ))}
      </ul>
    </section>
  )
}
