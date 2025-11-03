import { useState } from 'react'
import { FileText, Link as LinkIcon } from 'lucide-react'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function EvalForm({ onResult }) {
  const [agentCardUrl, setAgentCardUrl] = useState('')
  const [chatUrl, setChatUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!agentCardUrl) {
      setError('Agent card URL is required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${backendUrl}/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_card_url: agentCardUrl, chat_url: chatUrl || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Evaluation failed')
      onResult?.(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Agent Card URL</label>
          <div className="relative">
            <input
              type="url"
              required
              value={agentCardUrl}
              onChange={(e) => setAgentCardUrl(e.target.value)}
              placeholder="https://.../agent.json"
              className="w-full rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
            />
            <FileText className="h-5 w-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Chat Logs URL (optional)</label>
          <div className="relative">
            <input
              type="url"
              value={chatUrl}
              onChange={(e) => setChatUrl(e.target.value)}
              placeholder="https://.../chat.json"
              className="w-full rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
            />
            <LinkIcon className="h-5 w-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
            {error}
          </div>
        )}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Evaluating…' : 'Run Evaluation'}
          </button>
          <a
            className="text-sm text-slate-500 hover:text-slate-700"
            href="#example"
            onClick={(e) => {
              e.preventDefault()
              setAgentCardUrl('https://raw.githubusercontent.com/github/markup/master/README.md')
              setChatUrl('')
            }}
          >
            Use example URL
          </a>
        </div>
      </div>
    </form>
  )
}
