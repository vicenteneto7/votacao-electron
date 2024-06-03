import { QueryClientProvider } from 'react-query'
import { Routes } from './routes/routes'
import { queryClient } from './lib/react-query'

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </>
  )
}

export default App
