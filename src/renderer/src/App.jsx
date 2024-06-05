import { QueryClientProvider } from 'react-query'
import { Routes } from './routes/routes'
import { queryClient } from './lib/react-query'
import { EleitorProvider } from './hooks/EleitorContext'

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <EleitorProvider>
          <Routes />
        </EleitorProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
