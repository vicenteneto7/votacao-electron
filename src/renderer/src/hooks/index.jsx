import PropTypes from 'prop-types'

const AppProvider = ({ children }) => ({ children })

AppProvider.propTypes = {
  children: PropTypes.node
}

export default AppProvider
