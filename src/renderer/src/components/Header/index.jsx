import { useNavigate, useLocation } from 'react-router-dom'

import User from '../../assets/user.svg'
import {
  Container,
  ContainerLeft,
  PageLink,
  ContainerText,
  ContainerRight,
  PageLinkExit
} from './styles'
import { useEleitor } from '../../hooks/EleitorContext'

export function Header() {
  const { logout, eleitorData } = useEleitor()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Container>
      <ContainerLeft>
        <PageLink onClick={() => navigate('/main')} isActive={pathname === '/main'}>
          Home
        </PageLink>
        <PageLink onClick={() => navigate('/votosbyid')} isActive={pathname.includes('/votosbyid')}>
          Meus votos
        </PageLink>
      </ContainerLeft>
      <ContainerRight>
        <PageLink>
          <img src={User} alt="logo da pessoa" />
        </PageLink>
        <div className="line" />
        <ContainerText>
          <p>
            Olá, <strong>{eleitorData.nome}</strong>
          </p>
          <PageLinkExit onClick={handleLogout}>Sair</PageLinkExit>
        </ContainerText>
      </ContainerRight>
    </Container>
  )
}
