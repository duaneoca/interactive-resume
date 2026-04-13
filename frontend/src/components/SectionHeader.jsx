export default function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-600 shrink-0">
        {title}
      </h2>
      <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
    </div>
  )
}
