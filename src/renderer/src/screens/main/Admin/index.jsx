import { useLocation } from 'react-router-dom'

import { Container, ContainerItems } from './styles'
import { ListCandidates } from './ListCandidates'
import { paths } from '../../../constants/paths'
import { SideMenuAdmin } from '../../../components/SideMenuAdmin'
import { NewCandidato } from './NewCandidates'
import { EditCandidate } from './EditCandidate'

export function Admin() {
  const { pathname } = useLocation()

  return (
    <Container>
      <SideMenuAdmin path={pathname} />
      <ContainerItems>
        {pathname === paths.Candidates && <ListCandidates />}
        {pathname === paths.NewCandidate && <NewCandidato />}
        {pathname === paths.EditCandidate && <EditCandidate />}
        {pathname === paths.deleteCandidato}
      </ContainerItems>
    </Container>
  )
}
