import { createContext, useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'

const EleitorContext = createContext({})

export const EleitorProvider = ({ children }) => {
  const [eleitorData, setEleitorData] = useState({})

  const putEleitorData = async (userInfo) => {
    setEleitorData(userInfo)

    await localStorage.setItem('u', JSON.stringify(userInfo))
  }

  const logout = async () => {
    await localStorage.removeItem('u')
  }

  useEffect(() => {
    const loadEleitorData = async () => {
      const clientInfo = await localStorage.getItem('u')

      if (clientInfo) {
        setEleitorData(JSON.parse(clientInfo))
      }
    }
    loadEleitorData()
  }, [])

  return (
    <EleitorContext.Provider value={{ putEleitorData, eleitorData, logout }}>
      {children}
    </EleitorContext.Provider>
  )
}

export const useEleitor = () => {
  const context = useContext(EleitorContext)

  if (!context) {
    throw new Error('useUser must be used with UserContext')
  }

  return context
}

EleitorProvider.propTypes = {
  children: PropTypes.node
}
