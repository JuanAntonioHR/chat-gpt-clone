import type { Message } from '@/types/chat'
import { User, Bot } from 'lucide-react'

interface Props {
  message: Message
}

export default function Message({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex items-start space-x-2 max-w-[80%] ${
          isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
        }`}
      >
        <div
          className={`min-w-8 min-h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-blue-500' : 'bg-green-500'
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
        <div
          className={`rounded-lg p-4 ${
            isUser
              ? 'bg-blue-500 text-white rounded-tr-none'
              : 'bg-white text-black shadow-md rounded-tl-none'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}
