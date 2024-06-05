import { Button } from '../../../components/Button'
import { useEffect } from 'react'
import { useWindowStore } from '../../../store/votes'
import { useWindowStore2 } from '../../../store/candidates'
import { useEleitor } from '../../../hooks/EleitorContext'
import { useNavigate } from 'react-router-dom'

export function MainScreen() {
  const store = useWindowStore().about
  const store2 = useWindowStore2().about

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

    window.api.whenCandidatesWindowClose(({ message }) => {
      console.log(message)

      store2.setCandidatesWindowState(false)
    })
  })

  function openVotesWindow() {
    window.api.createVotesWindow()

    store.setVotesWindowState(true)
  }

  function openCandidatesWindow() {
    window.api.createCandidatesWindow()

    store2.setCandidatesWindowState(true)
  }

  console.log(window.api)

  function handleClick() {
    navigate('/votos')
  }

  return (
    <main className="">
      <h1>Olá, {eleitorData.nome}</h1>
      Selecione ou crie um documento
      <Button className={store.isOpen ? 'disabled' : ''} onClick={openVotesWindow}>
        Abra a lista de votos
      </Button>
      <Button className={store.isOpen ? 'disabled' : ''} onClick={openCandidatesWindow}>
        Ir para a votação
      </Button>
      <button onClick={handleClick}>Ir para a apuração de votos</button>
      <button onClick={LogoutEleitor}>Logout</button>
    </main>
  )
}
