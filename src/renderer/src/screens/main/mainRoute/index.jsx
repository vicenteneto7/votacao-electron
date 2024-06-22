import { Button } from '../../../components/Button'
import { useEffect } from 'react'
import { useWindowStore } from '../../../store/votes'
import { useEleitor } from '../../../hooks/EleitorContext'
import { useNavigate } from 'react-router-dom'
import { MainRouteContainer } from './styles'
import { ButtonAction } from '../../../components/ButtonAction'

export function MainScreen() {
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

  return (
    <MainRouteContainer className="">
      <h1>Olá, {eleitorData.nome}</h1>
      <Button className={store.isOpen ? 'disabled' : ''} onClick={openVotesWindow}>
        Ir para a apuração
      </Button>
      <ButtonAction onClick={handleClickVotation}>Ir para a votação</ButtonAction>
      <ButtonAction onClick={handleClickListVotes}>Ir para a lista de votos</ButtonAction>
      <ButtonAction style={{ backgroundColor: 'red'}} onClick={LogoutEleitor}>Logout</ButtonAction>
    </MainRouteContainer>
  )
}
