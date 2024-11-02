import Chat from './components/Chat'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <Toaster position="top-right" />
      <Chat />
    </main>
  )
}