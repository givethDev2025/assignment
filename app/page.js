'use client'

import { useState } from 'react'
import Inbox from './components/Inbox'
import Chat from './components/Chat'
import AICopilot from './components/AICopilot'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'them',
      text: 'Hey, can we talk about the meeting?',
      time: '1 min ago',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      from: 'me',
      text: 'Sure, I`m here!',
      time: 'just now',
    },
  ])

  const [aiDraft, setAIDraft] = useState('') 

  const handleSendToChat = (text) => {
    setAIDraft(text) 
  }

  return (
    <main className="flex flex-col md:flex-row min-h-screen md:h-screen overflow-hidden bg-[#f9f9f9] text-black">
      <Inbox />
      <Chat
        messages={messages}
        setMessages={setMessages} 
        aiDraft={aiDraft}
        setAIDraft={setAIDraft}
      />
      <AICopilot onSendToChat={handleSendToChat} />
    </main>
  )
}
