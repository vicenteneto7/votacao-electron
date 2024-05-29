import { Button } from '../../components/Button'
import { useEffect } from 'react'
import { useWindowStore } from '../../store/votes'
import { useWindowStore2 } from '../../store/candidates'

export function MainScreen() {
  const store = useWindowStore().about
  const store2 = useWindowStore2().about

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

  return (
    <main className="">
      Selecione ou crie um documento
      <Button className={store.isOpen ? 'disabled' : ''} onClick={openVotesWindow}>
        Abra a janela dos votos
      </Button>
      <Button className={store.isOpen ? 'disabled' : ''} onClick={openCandidatesWindow}>
        Abra a janela dos candidatos
      </Button>
    </main>
  )
}
