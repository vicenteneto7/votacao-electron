import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEleitor } from '../../hooks/EleitorContext'
import { useWindowStore } from '../../store/votes'
import { Button } from '../../components/Button'
import { ButtonAction } from '../../components/ButtonAction'
import { AdminRouteContainer } from './styles'

export function AdminMainScreen() {
  const store = useWindowStore().about

  const { eleitorData } = useEleitor()

  const { logout } = useEleitor()

  const navigate = useNavigate()

  const LogoutEleitor = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    window.api.whenVotesWindowClose(({ message }) => {
      console.log(message)

      store.setVotesWindowState(false)
    })
  })

  function openVotesWindow() {
    window.api.createVotesWindow()

    store.setVotesWindowState(true)
  }

  console.log(window.api)

  function handleClickVotation() {
    navigate('/votacao')
  }
  function handleClickListVotes() {
    navigate('/votos')
  }

  function handleClickAdminCandidates() {
    navigate('/votos')
  }

  return (
    <AdminRouteContainer>
      <h1>Olá, Administrador {eleitorData.nome}</h1>
      <Button className={store.isOpen ? 'disabled' : ''} onClick={openVotesWindow}>
        Ir para a apuração
      </Button>
      <ButtonAction onClick={handleClickVotation}>Ir para a votação</ButtonAction>
      <ButtonAction onClick={handleClickListVotes}>Ir para a lista de votos</ButtonAction>
      <ButtonAction style={{ backgroundColor: 'blue' }} onClick={handleClickAdminCandidates}>
        Lista de Candidatos
      </ButtonAction>
      <ButtonAction style={{ backgroundColor: 'blue' }} onClick={handleClickAdminCandidates}>
        Lista de Eleitores
      </ButtonAction>
      <ButtonAction style={{ backgroundColor: 'red' }} onClick={LogoutEleitor}>
        Logout
      </ButtonAction>
    </AdminRouteContainer>
  )
}
