import { Link } from 'react-router-dom'
import styled from 'styled-components'


export const Container = styled.main`
    background-color: #3c3c3c;

    height: 100%;

    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.15);
  width: 30rem;
  top: 0;
  left: 0;
  hr {
    margin: 4rem 1.5rem;
  }

`
export const ItemContainer = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  border-radius: 2px;
  background: ${({ isActive }) => (isActive ? '#565656' : 'none')};
  margin: 1rem;
  padding-left: 2rem;
  transition: ease-in-out 0.3s;

  .icon {
    height: 1.5rem;
    width: 1.5rem;
    color: white;
  }
`
export const ListLink = styled(Link)`
color: #fff;
  font-size: 1.5rem;
  font-weight: 400;
  text-decoration: none;
  margin-left: 0.5rem;
`
