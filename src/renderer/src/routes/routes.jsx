import { Router, Route } from 'electron-router-dom'

import { MainScreen } from '../screens/main/mainRoute'
import { CandidateList } from '../screens/candidates'
import { Login } from '../screens/main/Login'
import { Register } from '../screens/main/Register'
import PrivateRoute from './private-routes'
import { VotesList } from '../screens/votes'
import { CountVotes } from '../screens/main/votos'
import { DefaultLayout } from '../layout/defaultLayout'

export function MyRoutes() {
  return (
    <Router
      main={
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<PrivateRoute component={MainScreen} />} />
          <Route path="/votos" element={<PrivateRoute component={CountVotes} />} />
        </Route>
      }
      votes={<Route path="/" element={<PrivateRoute component={VotesList} />} />}
      candidates={<Route path="/" element={<PrivateRoute component={CandidateList} />} />}
    />
  )
}
