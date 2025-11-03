import { Rocket } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full py-8">
      <div className="max-w-5xl mx-auto px-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
          <Rocket className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Agent Evaluator
          </h1>
          <p className="text-slate-600 text-sm">Run MCP, Safety, and Chatbot quality checks on any agent card</p>
        </div>
      </div>
    </header>
  )
}
