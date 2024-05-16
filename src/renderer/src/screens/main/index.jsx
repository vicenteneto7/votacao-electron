import { Button } from "../../components/Button"
import { useEffect } from "react"
import { useWindowStore } from "../../store"

export function MainScreen() {

  const store = useWindowStore().about

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

  return (
    <main className="">
      Selecione ou crie um documento
      <Button
        className={store.isOpen ? 'disabled' : ''}
        onClick={openVotesWindow}>
        Veja todos os documentos
      </Button>
    </main>
  )
}