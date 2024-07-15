import { Router, Route } from 'electron-router-dom'

import { MainScreen } from '../screens/main/mainRoute'
import { Login } from '../screens/main/Login'
import { Register } from '../screens/main/Register'
import PrivateRoute from './private-routes'
import { VotesList } from '../screens/votesList'
import { CountVotes } from '../screens/main/votos'
import { CandidateList } from '../screens/candidatesList'
import { paths } from '../constants/paths'
import { Admin } from '../screens/Admin'
import { VotesListById } from '../screens/main/EleitorVotes'

export function MyRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
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
