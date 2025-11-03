import { ExternalLink } from 'lucide-react'

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-slate-700 mb-2">{title}</h3>
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      <table className="w-full text-sm">
        <tbody>{children}</tbody>
      </table>
    </div>
  </div>
)

const Row = ({ label, value }) => (
  <tr className="odd:bg-slate-50">
    <td className="px-3 py-2 w-1/3 text-slate-600 font-medium">{label}</td>
    <td className="px-3 py-2">{String(value)}</td>
  </tr>
)

export default function ResultCard({ result }) {
  if (!result) return null

  const metrics = result.metrics || {}

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Evaluation Result</h2>
          <p className="text-sm text-slate-500">Status: {result.status}</p>
        </div>
        {result.id && (
          <a
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
            href={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/evaluations/${result.id}/report`}
            target="_blank"
            rel="noreferrer"
          >
            View HTML report <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Section title="MCP Compliance">
          <Row label="Spec Alignment" value={metrics?.mcp_compliance?.spec_alignment ?? '—'} />
          <Row label="Tools Schema Valid" value={metrics?.mcp_compliance?.tools_schema_valid ?? '—'} />
        </Section>

        <Section title="Safety">
          <Row label="Toxicity" value={metrics?.safety?.toxicity ?? '—'} />
          <Row label="Compliance" value={metrics?.safety?.compliance ?? '—'} />
          <Row label="Harmfulness" value={metrics?.safety?.harmfulness ?? '—'} />
        </Section>

        <Section title="Chatbot Metrics">
          <Row label="Relevance" value={metrics?.chatbot?.relevance ?? '—'} />
          <Row label="Helpfulness" value={metrics?.chatbot?.helpfulness ?? '—'} />
          <Row label="Factuality" value={metrics?.chatbot?.factuality ?? '—'} />
          <Row label="Latency (ms)" value={metrics?.chatbot?.latency ?? '—'} />
        </Section>
      </div>
    </div>
  )
}
