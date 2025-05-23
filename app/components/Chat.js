'use client'

import {
  MoreVertical,
  Moon,
  Square,
  Clock,
  ChevronDown,
  SendHorizonal,
  Menu,
} from 'lucide-react'
import Image from 'next/image'
import Inbox from './Inbox'
import { useState, useRef, useEffect } from 'react'

function cleanText(text) {
  return text
    .replace(/\n+/g, '\n')
    .replace(/\s{2,}/g, ' ')
    .replace(/\\n/g, '\n')
    .replace(/[^a-zA-Z0-9,.?!'"()\[\]\s\n]/g, '') 
    .trim()
}

export default function Chat({ messages: initialMessages = [], aiDraft = '' }) {
  const [showInbox, setShowInbox] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

  const selectedUser = {
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?auto=format&fit=crop&w=100&h=100&q=80',
  }

  useEffect(() => {
    if (aiDraft) {
      setInput(aiDraft)
    }
  }, [aiDraft])

  const handleSend = () => {
    if (!input.trim()) return

    const cleaned = cleanText(input)

    const newMessage = {
      id: Date.now(),
      from: 'me',
      text: cleaned,
      time: 'just now',
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')

    // Simulate response from John
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          from: 'them',
          text: 'Got it! Let me check.',
          time: 'a moment ago',
          image: selectedUser.image,
        },
      ])
    }, 1000)
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <section className="flex flex-col flex-1 border-r border-gray-200">
      {showInbox && <Inbox show={showInbox} onClose={() => setShowInbox(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="md:hidden cursor-pointer mr-2" onClick={() => setShowInbox(true)}>
            <Menu size={20} />
          </div>
          <Image
            src={selectedUser.image}
            alt="User"
            width={36}
            height={36}
            className="rounded-full"
          />
          <h3 className="font-semibold text-sm sm:text-base">{selectedUser.name}</h3>
        </div>
        <div className="flex items-center gap-4">
          <MoreVertical size={18} />
          <Moon size={18} />
          <Square size={18} />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 bg-white">
        {messages.map(msg =>
          msg.from === 'them' ? (
            <div key={msg.id} className="flex items-start gap-3">
              <Image
                src={msg.image || selectedUser.image}
                alt="avatar"
                width={28}
                height={28}
                className="rounded-full"
              />
              <div>
                <div className="bg-gray-100 p-3 rounded-xl max-w-[90vw] md:max-w-md w-fit whitespace-pre-wrap text-sm">
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{msg.time}</span>
                </div>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex justify-end">
              <div>
                <div className="bg-blue-100 p-3 rounded-xl max-w-[90vw] md:max-w-md w-fit whitespace-pre-wrap text-sm">
                  <p>{msg.text}</p>
                </div>
                <div className="flex justify-end items-center gap-1 mt-1 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{msg.time}</span>
                </div>
              </div>
            </div>
          )
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Footer Input */}
      <div className="border-t border-gray-300 p-4">
        <div className="flex items-center gap-1 text-sm font-medium cursor-pointer mb-2">
          <span>Chat</span>
          <ChevronDown size={16} />
        </div>

        <div className="flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            rows={2}
            className="flex-1 resize-none h-24 rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
