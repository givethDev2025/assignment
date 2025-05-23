'use client'
import { ChevronDown, LayoutGrid, Settings, X } from 'lucide-react'
import Image from 'next/image'
import clsx from 'clsx'

export default function Inbox({ show, onClose }) {
  const cards = [
    {
      id: 1,
      name: 'John Doe',
      text: 'Can we reschedule our meeting?',
      time: '5:00am',
      selected: true,
      image: 'https://images.unsplash.com/photo-1603415526960-f8f76b36b58b?auto=format&fit=crop&w=36&h=36&q=80',
    },
    {
      id: 2,
      name: 'Alice Smith',
      text: 'I sent the files',
      time: '4:45am',
      selected: false,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=36&h=36&q=80',
    },
    {
      id: 3,
      name: 'Michael Roe',
      text: 'Okay thanks!',
      time: '4:00am',
      selected: false,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=36&h=36&q=80',
    },
    {
      id: 4,
      name: 'Lisa Ray',
      text: 'Let me know.',
      time: '3:30am',
      selected: false,
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=36&h=36&q=80',
    },
  ]

  return (
    <aside
      className={clsx(
        'bg-white z-50 transition-transform duration-300 ease-in-out flex-col justify-between border-r border-gray-200 p-4 md:static md:translate-x-0 md:flex w-[80%] max-w-xs min-w-[200px] md:w-[20%]',
        {
          'fixed top-0 left-0 h-full flex': show,
          'hidden md:flex': !show,
        }
      )}
    >
      {/* Mobile close button */}
      <div className="md:hidden flex justify-end mb-2">
        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Top Section */}
      <div>
        <h2 className="text-xl font-bold mb-6">Your Inbox</h2>

        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="font-medium">8 Open</span>
            <ChevronDown size={16} />
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="font-medium">Waiting Request</span>
            <ChevronDown size={16} />
          </div>
        </div>

        <div className="space-y-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                card.selected ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.name}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <div className="truncate">
                  <p className="font-semibold truncate">{card.name}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {card.text}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{card.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom icons */}
      <div className="shadow-lg p-2 flex items-center gap-4 rounded-md mt-4">
        <LayoutGrid size={20} strokeWidth={2.5} />
        <Settings size={20} strokeWidth={1.5} />
      </div>
    </aside>
  )
}
