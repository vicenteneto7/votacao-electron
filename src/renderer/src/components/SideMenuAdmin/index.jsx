import { useEleitor } from '../../hooks/EleitorContext'
import { ListLinks } from './menu-list'
import { Container, ItemContainer, ListLink } from './styles'

import LogoutIcon from '@mui/icons-material/Logout'

export function SideMenuAdmin({path}) {
  const { logout } = useEleitor()

  return (
    <Container>
      <hr />
      {ListLinks.map((item) => (
        <ItemContainer key={item.id} isActive={path === item.link}>
          <item.icon className="icon"></item.icon>
          <ListLink to={item.link}>{item.label}</ListLink>
        </ItemContainer>
      ))}
      <hr />
      <ItemContainer style={{ position: 'fixed', bottom: 30 }}>
        <LogoutIcon style={{ color: 'white',cursor: 'pointer'}}/>
        <ListLink to="/login" onClick={() => logout()}>
          Sair
        </ListLink>
      </ItemContainer>
    </Container>
  )
}
