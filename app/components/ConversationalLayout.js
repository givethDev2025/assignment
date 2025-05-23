'use client'
import { useState } from 'react'
import Inbox from './Inbox'
import Chat from './Chat'
import AICopilot from './AICopilot'

export default function ConversationLayout() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'them',
      text: 'Hey, can we talk about the meeting?',
      time: '1 min ago',
    },
    {
      id: 2,
      from: 'me',
      text: 'Sure, I’m here!',
      time: 'Just now',
    },
  ])

  const handleSendFromCopilot = (text) => {
    const newMsg = {
      id: messages.length + 1,
      from: 'me',
      text,
      time: 'Just now',
    }
    setMessages([...messages, newMsg])
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:block w-[20%]">
        <Inbox />
      </div>
      <div className="flex-1">
        <Chat messages={messages} />
      </div>
      <div className="w-full md:w-[25%] border-l border-gray-200">
        <AICopilot onSendToChat={handleSendFromCopilot} />
      </div>
    </div>
  )
}
