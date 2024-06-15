import { QueryClientProvider } from 'react-query'
import { MyRoutes } from './routes/routes'
import { queryClient } from './lib/react-query'
import { EleitorProvider } from './hooks/EleitorContext'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/globalStyles'

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <EleitorProvider>
            <MyRoutes />
          </EleitorProvider>
          <GlobalStyle />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
