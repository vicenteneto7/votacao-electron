import { Router, Route } from 'electron-router-dom'

import { MainScreen } from '../screens/main/mainRoute'
import { VotesScreen } from '../screens/votes'
import { CandidateList } from '../screens/candidates'
import { Login } from '../screens/main/Login'
import { Register } from '../screens/main/Register'
import PrivateRoute from './private-routes'

export function MyRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<PrivateRoute component={MainScreen} />} />
        </>
      }
      votes={<Route path="/" element={<VotesScreen />} />}
      candidates={<Route path="/" element={<CandidateList />} />}
    />
  )
}
