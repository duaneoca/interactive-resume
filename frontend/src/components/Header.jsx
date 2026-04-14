export default function Header({ data }) {
  const { name, contact } = data
  return (
    <header>
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
      <div className="mt-8 border-t-2 border-blue-600" />
    </header>
  )
}
