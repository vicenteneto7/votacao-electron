import { QueryClientProvider } from 'react-query'
import { MyRoutes } from './routes/routes'
import { queryClient } from './lib/react-query'
import { EleitorProvider } from './hooks/EleitorContext'

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <EleitorProvider>
          <MyRoutes />
        </EleitorProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
