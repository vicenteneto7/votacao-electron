
export function Button({ children, className, ...restOfProps }) {
  const combinedClassNames = [className].join(' ')

  return (
    <button className={combinedClassNames} {...restOfProps}>
      {children}
    </button>
  )
}
