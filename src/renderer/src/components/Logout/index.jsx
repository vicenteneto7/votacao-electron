import { useNavigate } from 'react-router-dom'
import { useEleitor } from '../../hooks/EleitorContext'
import { Button } from '../Button'

export function LogoutButton() {
  const navigate = useNavigate()

  const LogoutEleitor = () => {
    await localStorage.removeItem('u')
    navigate('/login')
  }
  return <Button onClick={LogoutEleitor}>Logout</Button>
}
