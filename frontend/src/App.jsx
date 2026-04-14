import { useState } from 'react'
import Header from './components/Header'
import Summary from './components/Summary'
import Skills from './components/Skills'
import CurrentProjects from './components/CurrentProjects'
import Experience from './components/Experience'
import Education from './components/Education'
import DetailPanel from './components/DetailPanel'
import ChatPanel from './components/ChatPanel'
import ChatFab from './components/ChatFab'
import EvaluatorModal from './components/EvaluatorModal'
import { resumeData } from './data/resume'

export default function App() {
  const [panelItem, setPanelItem] = useState(null)
  const [chatState, setChatState] = useState(null) // { context, initialPrompt }
  const [evaluatorOpen, setEvaluatorOpen] = useState(false)

  const openDetail = (item) => {
    setChatState(null)
    setPanelItem(item)
  }

  const closeDetail = () => setPanelItem(null)

  const openChat = (context = null, initialPrompt = null) => {
    setPanelItem(null)
    setChatState({ context, initialPrompt })
  }

  const closeChat = () => setChatState(null)

  // Called from DetailPanel's "Ask about this" button
  const handleAskAboutThis = (item) => {
    openChat(item.title, item.chatPrompt)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Header data={resumeData} onOpenEvaluator={() => setEvaluatorOpen(true)} />
        <div className="mt-14 space-y-14">
          <Summary data={resumeData.summary} onExpand={openDetail} />
          <Skills data={resumeData.skills} onExpand={openDetail} />
          <CurrentProjects data={resumeData.currentProjects} onExpand={openDetail} />
          <Experience data={resumeData.experience} onExpand={openDetail} />
          <Education data={resumeData.education} onExpand={openDetail} />
        </div>
        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} Duane Pinkerton
        </footer>
      </div>

      <DetailPanel
        item={panelItem}
        onClose={closeDetail}
        onAskAboutThis={handleAskAboutThis}
      />

      <ChatPanel
        isOpen={!!chatState}
        context={chatState?.context}
        initialPrompt={chatState?.initialPrompt}
        onClose={closeChat}
      />

      <ChatFab onOpen={() => openChat()} />

      <EvaluatorModal
        isOpen={evaluatorOpen}
        onClose={() => setEvaluatorOpen(false)}
        onOpenChat={openChat}
      />
    </div>
  )
}
