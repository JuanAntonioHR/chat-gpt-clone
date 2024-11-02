'use client'
import React, { useState } from 'react'
import { Message } from '@/types/chat'
import ChatInput from './ChatInput'
import MessageComponent from './Message'
import { toast } from 'react-hot-toast'

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    try {
      setLoading(true)
      const userMessage: Message = { role: 'user', content }
      
      // Actualizar mensajes inmediatamente para mejor UX
      setMessages(prev => [...prev, userMessage])

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al enviar el mensaje')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] mx-auto max-w-4xl bg-white rounded-lg shadow-xl">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
        <h1 className="text-xl font-bold text-white">Chat AI</h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p>👋 ¡Hola! Envía un mensaje para comenzar la conversación.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageComponent key={index} message={message} />
          ))
        )}
        {loading && (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-bounce h-2 w-2 bg-blue-500 rounded-full"></div>
            <div className="animate-bounce h-2 w-2 bg-blue-500 rounded-full delay-100"></div>
            <div className="animate-bounce h-2 w-2 bg-blue-500 rounded-full delay-200"></div>
          </div>
        )}
      </div>

      {/* Input Container */}
      <div className="p-4 border-t bg-white rounded-b-lg">
        <ChatInput onSend={handleSendMessage} loading={loading} />
      </div>
    </div>
  )
}