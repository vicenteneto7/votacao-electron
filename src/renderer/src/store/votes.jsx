import { useContext, createContext, useState } from 'react'

import PropTypes from 'prop-types'



const WindowStoreContext = createContext({})

export function useWindowStore() {
  return useContext(WindowStoreContext)
}

export function WindowStoreProvider({
  children,
}) {
  const [state, setState] = useState({
    about: { isOpen: false, setVotesWindowState },
  })

  function setVotesWindowState(value) {
    setState((state) => ({
      ...state,
      about: {
        ...state.about,
        isOpen: value,
      },
    }))
  }

  console.log(setVotesWindowState)


  return (
    <WindowStoreContext.Provider value={state}>
      {children}
    </WindowStoreContext.Provider>
  )
}


WindowStoreProvider.propTypes = {
  children: PropTypes.node
}


