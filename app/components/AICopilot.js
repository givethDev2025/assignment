'use client'

import { Info, Bot, ArrowUpRight, Send, Square } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function AICopilot({ onSendToChat }) {
  const [input, setInput] = useState('')
  const [fullResponse, setFullResponse] = useState('')
  const [displayedResponse, setDisplayedResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [typing, setTyping] = useState(false)
  const intervalRef = useRef(null)
  const [history, setHistory] = useState([])

  const generateAIResponse = async () => {
    if (!input.trim()) return

    setLoading(true)
    setDisplayedResponse('')
    setFullResponse('')

    const res = await fetch('/api/copilot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        history: history,
      }),
    })

    const data = await res.json()

    const clean = data.text
      .replace(/\*\*/g, '')
      .replace(/(\r\n|\r|\n){2,}/g, '\n\n')
      .trim()

    setFullResponse(clean)
    setTyping(true)
    setLoading(false)

    // Save to history and localStorage
    const newEntry = { question: input, answer: clean }

    setHistory(prev => {
      const updated = [...prev, newEntry]
      localStorage.setItem('copilotHistory', JSON.stringify(updated))
      return updated
    })
  }


  useEffect(() => {
    if (!fullResponse || !typing) return

    let index = 0
    intervalRef.current = setInterval(() => {
      setDisplayedResponse((prev) => prev + fullResponse.charAt(index))
      index++
      if (index >= fullResponse.length) {
        clearInterval(intervalRef.current)
        setTyping(false)
      }
    }, 20)

    return () => clearInterval(intervalRef.current)
  }, [fullResponse, typing])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('copilotHistory')
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    }
  }, [])

  const handleSend = () => {
    if (fullResponse) {
      onSendToChat && onSendToChat(fullResponse)
      setInput('')
      setFullResponse('')
    }
  }

  return (
    <aside className="w-full md:w-[25%] flex flex-col bg-[#f9f9f9] border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 px-4 py-2">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-blue-900 border-b-2 border-blue-900 pb-1">AI Copilot</h2>
          <span className="text-sm text-gray-700 cursor-pointer">Details</span>
        </div>
        <Info size={20} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 text-sm flex flex-col gap-3">

        {/* If idle */}
        {!displayedResponse && !loading && (
          <div className="flex flex-col items-center text-center mt-10 text-gray-600">
            <Bot size={40} className="mb-3" />
            <h3 className="text-lg font-semibold">Hi, I`m Fin AI Copilot</h3>
            <p className="mt-1">Ask me anything about this conversation</p>
          </div>
        )}

        {/* Loading Spinner Bubble */}
        {loading && (
          <div className="self-start max-w-[80%] flex items-center gap-2 text-gray-600 bg-gray-200 p-3 rounded-2xl rounded-bl-none shadow">
            <div className="animate-spin h-4 w-4 border-t-2 border-b-2 border-blue-500 rounded-full" />
            <span className="text-sm">Thinking...</span>
          </div>
        )}

        {/* History as Message Bubbles */}
        {history.map((entry, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="self-end max-w-[80%] bg-blue-500 text-white p-3 rounded-2xl rounded-br-none shadow">
              Q: {entry.question}
            </div>
            <div className="self-start max-w-[80%] bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-bl-none shadow whitespace-pre-wrap">
              A: {entry.answer}
              <button
                  onClick={handleSend}
                  className="flex items-center gap-1 text-blue-600 text-xs hover:underline"
                >
                  <Send size={14} /> Send to Chat
                </button>
            </div>
          </div>
        ))}
      </div>



      <button
        onClick={() => {
          localStorage.removeItem('copilotHistory')
          setHistory([])
        }}
        className="text-xs text-red-500 hover:underline mt-2"
      >
        Clear Copilot History
      </button>

      <div className="border-t border-gray-300 p-4 flex gap-2 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a Question"
          className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
        />
        <button
          onClick={generateAIResponse}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>
    </aside>
  )
}
