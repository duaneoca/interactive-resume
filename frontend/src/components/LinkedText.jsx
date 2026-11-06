import { resumeData } from '../data/resume'

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const pattern = new RegExp(
  `(${Object.keys(resumeData.links).map(escape).join('|')})`,
  'g'
)

// Renders text with every phrase in resumeData.links turned into a link.
// Clicks on a link don't bubble, so they don't also open the detail panel
// of the clickable item the text sits in.
export default function LinkedText({ text }) {
  return text.split(pattern).map((part, i) => {
    const href = resumeData.links[part]
    if (!href) return part
    return (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="text-blue-600 dark:text-blue-400 underline decoration-blue-300 dark:decoration-blue-700 underline-offset-2 hover:decoration-blue-600 dark:hover:decoration-blue-400"
      >
        {part}
      </a>
    )
  })
}
