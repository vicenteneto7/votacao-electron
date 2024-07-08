import { useLocation } from 'react-router-dom'


import { Container, ContainerItems } from './styles'
import { ListCandidates } from './ListCandidates'
import { paths } from '../../constants/paths'
import { SideMenuAdmin } from '../../components/SideMenuAdmin'

export function Admin() {
  const { pathname } = useLocation()

  return (
    <Container>
      <SideMenuAdmin path={pathname} />
      <ContainerItems>{pathname === paths.Candidates && <ListCandidates />}</ContainerItems>
    </Container>
  )
}
