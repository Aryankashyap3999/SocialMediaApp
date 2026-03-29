import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './hooks/context/AuthContext'
import { SocketProvider } from './hooks/context/SocketContext'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketProvider>
          <App />
          <Toaster position="top-right" richColors />
        </SocketProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
