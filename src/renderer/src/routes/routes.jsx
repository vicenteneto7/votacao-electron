import { Router, Route } from 'electron-router-dom'

import { MainScreen } from '../screens/main/mainRoute'
import { CandidateList } from '../screens/candidates'
import { Login } from '../screens/main/Login'
import { Register } from '../screens/main/Register'
import PrivateRoute from './private-routes'
import { VotesList } from '../screens/votes'

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
      votes={<Route path="/" element={<VotesList />} />}
      candidates={<Route path="/" element={<CandidateList />} />}
    />
  )
}
