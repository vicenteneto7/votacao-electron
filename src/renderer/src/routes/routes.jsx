import { Router, Route } from 'electron-router-dom'

import { MainScreen } from '../screens/main'
import { VotesScreen } from '../screens/votes'
import { CandidatesScreen } from '../screens/candidates'

export function Routes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<MainScreen />} />
        </>
      }
      votes={
        <Route path="/" element={<VotesScreen />} />
      }
      candidates={
        <Route path="/" element={<CandidatesScreen />} />
      }
    />
  )
}