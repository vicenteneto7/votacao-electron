import { Router, Route } from 'electron-router-dom'

import { MainScreen } from '../screens/main/mainRoute'
import { Login } from '../screens/main/Login'
import { Register } from '../screens/main/Register'
import PrivateRoute from './private-routes'
import { paths } from '../constants/paths'
import { Admin } from '../screens/main/Admin'
import { VotesListById } from '../screens/main/EleitorVotes'
import { VotesList } from '../screens/main/votesList'
import { CountVotes } from '../screens/votos'
import { CandidateList } from '../screens/main/candidatesList'

export function MyRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<PrivateRoute component={MainScreen} />} />
          <Route path="/votos" element={<PrivateRoute component={VotesList} />} />
          <Route path="/votosbyid" element={<PrivateRoute component={VotesListById} />} />
          <Route path="/votacao" element={<PrivateRoute component={CandidateList} />} />

          <Route path={paths.Candidates} element={<PrivateRoute component={Admin} isAdmin />} />
          <Route path={paths.NewCandidate} element={<PrivateRoute component={Admin} isAdmin />} />
          <Route path={paths.EditCandidate} element={<PrivateRoute component={Admin} isAdmin />} />
        </>
      }
      votes={
        <>
          <Route path="/" element={<PrivateRoute component={CountVotes} />} />
        </>
      }
    />
  )
}
