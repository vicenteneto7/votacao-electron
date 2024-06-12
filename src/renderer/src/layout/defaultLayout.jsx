import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <>
      <p>Esse é o header</p>
      <Outlet />
    </>
  )
}
