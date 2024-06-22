import { ContainerButton } from './styles'

export function Button({ children, className, ...restOfProps }) {
  const combinedClassNames = [className].join(' ')

  return (
    <ContainerButton className={combinedClassNames} {...restOfProps}>
      {children}
    </ContainerButton>
  )
}
