import PropTypes from 'prop-types'

import { ContainerButton } from './styles'

export function ButtonAction({ children, ...props }) {
  return <ContainerButton {...props}>{children}</ContainerButton>
}

ButtonAction.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string
}