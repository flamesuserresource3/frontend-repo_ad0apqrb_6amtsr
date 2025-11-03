export default function HistoryList({ items }) {
  if (!items?.length) return null
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">Recent Evaluations</h2>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between text-sm">
            <div className="truncate text-slate-600">
              <span className="font-medium text-slate-800">{it.id}</span>
              <span className="mx-2 text-slate-400">·</span>
              <span className="truncate max-w-[380px] inline-block align-bottom">{it.agent_card_url || '—'}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`${backend}/evaluations/${it.id}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >JSON</a>
              <a
                href={`${backend}/evaluations/${it.id}/report`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >HTML</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
