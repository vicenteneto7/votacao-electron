import PropTypes from 'prop-types';
import { ContainerButton } from './styles';

export function Button({ children, className, ...restOfProps }) {
  const combinedClassNames = [className].join(' ');

  return (
    <ContainerButton className={combinedClassNames} {...restOfProps}>
      {children}
    </ContainerButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};
