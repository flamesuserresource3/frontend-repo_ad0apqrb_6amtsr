import { useState } from 'react'
import Header from './components/Header'
import EvalForm from './components/EvalForm'
import ResultCard from './components/ResultCard'
import HistoryList from './components/HistoryList'

function App() {
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  const handleResult = (res) => {
    setResult(res)
    setHistory((h) => [
      {
        id: res.id,
        agent_card_url: res.agent_card_url, // may be undefined from API; keep slot
      },
      ...h,
    ].slice(0, 5))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Header />
      <main className="max-w-5xl mx-auto px-6 pb-20 grid gap-6">
        <EvalForm onResult={handleResult} />
        <ResultCard result={result} />
        <HistoryList items={history} />
      </main>
    </div>
  )
}

export default App
