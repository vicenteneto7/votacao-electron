import { Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'

function PrivateRoute({ component: Component, isAdmin }) {
  const eleitor = JSON.parse(localStorage.getItem('u'))

  console.log(eleitor)

  if (!eleitor) {
    return <Navigate to="/login" />
  }

  if (!eleitor.admin && isAdmin) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Component />
    </>
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  isAdmin: PropTypes.bool
}

export default PrivateRoute
