import { useContext, createContext, useState } from 'react'

import PropTypes from 'prop-types'



const WindowStoreContext = createContext({})

export function useWindowStore2() {
  return useContext(WindowStoreContext)
}

export function WindowStoreProvider2({
  children,
}) {
  const [state, setState] = useState({
    about: { isOpen: false, setCandidatesWindowState },
  })

  function setCandidatesWindowState(value) {
    setState((state) => ({
      ...state,
      about: {
        ...state.about,
        isOpen: value,
      },
    }))
  }

  console.log(setCandidatesWindowState)


  return (
    <WindowStoreContext.Provider value={state}>
      {children}
    </WindowStoreContext.Provider>
  )
}


WindowStoreProvider2.propTypes = {
  children: PropTypes.node
}


