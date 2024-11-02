export interface Message {
    role: 'user' | 'assistant'
    content: string
}
  
export interface ChatPayload {
    messages: Message[]
}