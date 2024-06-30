import { Router, Route } from 'electron-router-dom'

import { MainScreen } from '../screens/main/mainRoute'
import { Login } from '../screens/main/Login'
import { Register } from '../screens/main/Register'
import PrivateRoute from './private-routes'
import { VotesList } from '../screens/votesList'
import { CountVotes } from '../screens/main/votos'
import { VotesCarousel } from '../screens/main/votesCarrossel'
import { CandidateList } from '../screens/candidatesList'
import { AdminMainScreen } from '../screens/Admin'

export function MyRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<PrivateRoute component={MainScreen} />} />
          <Route path="/votos" element={<PrivateRoute component={VotesList} />} />
          <Route path="/votacao" element={<PrivateRoute component={CandidateList} />} />

          <Route path="/admin" element={<PrivateRoute component={AdminMainScreen} isAdmin />} />

        </>
      }
      votes={
        <>
         <Route path="/" element={<PrivateRoute component={CountVotes} />} />
         <Route path="/votosCarrossel" element={<PrivateRoute component={VotesCarousel} />} />
      </>
      }
    />
  )
}
